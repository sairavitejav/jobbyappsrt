import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import JobDetails from '../JobDetails'
import EmploymentFilters from '../EmploymentFilters'
import SalaryFilters from '../SalaryFilters'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    profileDetails: [],
    jobsList: [],
    searchInput: '',
    profileApiStatus: apiStatusConstants.initial,
    jobsApiStatus: apiStatusConstants.initial,
    employmentTypeList: [],
    salaryRange: '',
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobsList()
  }

  getJobsList = async () => {
    this.setState({jobsApiStatus: apiStatusConstants.loading})
    const {searchInput, employmentTypeList, salaryRange} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const jobsUrl = `https://apis.ccbp.in/jobs?search=${searchInput}&employment_type=${employmentTypeList}&minimum_package=${salaryRange}`
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobsUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatesJobs = data.jobs.map(eachJob => ({
        id: eachJob.id,
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: updatesJobs,
        jobsApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({jobsApiStatus: apiStatusConstants.failure})
    }
  }

  getProfileDetails = async () => {
    this.setState({profileApiStatus: apiStatusConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
        profileApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({profileApiStatus: apiStatusConstants.failure})
    }
  }

  readUserInput = event => {
    this.setState({searchInput: event.target.value})
  }

  getUserInput = () => {
    this.getJobsList()
  }

  renderProfileFailure = () => (
    <div className="failure-cont">
      <button
        onClick={this.getProfileDetails}
        className="profile-retry"
        type="button"
      >
        Retry
      </button>
    </div>
  )

  renderProfileLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileSuccess = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-bg-container">
        <img src={profileImageUrl} alt="profile" />
        <h1>{name}</h1>
        <p>{shortBio}</p>
      </div>
    )
  }

  renderProfileViews = () => {
    const {profileApiStatus} = this.state
    switch (profileApiStatus) {
      case apiStatusConstants.loading:
        return this.renderProfileLoading()
      case apiStatusConstants.success:
        return this.renderProfileSuccess()
      case apiStatusConstants.failure:
        return this.renderProfileFailure()
      default:
        return null
    }
  }

  renderJobFailure = () => (
    <div className="failure-cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button
        onClick={this.getJobsList}
        className="profile-retry"
        type="button"
      >
        Retry
      </button>
    </div>
  )

  renderJobLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobSuccess = () => {
    const {jobsList} = this.state
    return (
      <>
        {jobsList.length !== 0 ? (
          <ul>
            {jobsList.map(eachJob => (
              <JobDetails eachJob={eachJob} key={eachJob.id} />
            ))}
          </ul>
        ) : (
          <div className="no-jobs-view">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
            />
            <h1>No Jobs Found</h1>
            <p>We could not find any jobs. Try other filters.</p>
          </div>
        )}
      </>
    )
  }

  renderJobViews = () => {
    const {jobsApiStatus} = this.state
    switch (jobsApiStatus) {
      case apiStatusConstants.loading:
        return this.renderJobLoading()
      case apiStatusConstants.success:
        return this.renderJobSuccess()
      case apiStatusConstants.failure:
        return this.renderJobFailure()
      default:
        return null
    }
  }

  onClickRadioItem = salaryRangeId => {
    this.setState({salaryRange: salaryRangeId}, this.getJobsList)
  }

  onClickEmployment = employmentTypeId => {
    const {employmentTypeList} = this.state
    const isAlreadyPresent = employmentTypeList.includes(employmentTypeId)
    if (!isAlreadyPresent) {
      this.setState(
        prevState => ({
          employmentTypeList: [
            ...prevState.employmentTypeList,
            employmentTypeId,
          ],
        }),
        this.getJobsList,
      )
    } else {
      const filteredList = employmentTypeList.filter(
        eachId => eachId !== employmentTypeId,
      )
      this.setState({employmentTypeList: filteredList}, this.getJobsList)
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <ul className="job-nav-contai">
          <Header />
        </ul>
        <div className="jobs-main-container">
          <div className="left-side-main-cont">
            {this.renderProfileViews()}
            <hr />
            <h1 className="filter-heads">Type of Employment</h1>
            <ul className="filters-list">
              {employmentTypesList.map(eachEmployment => (
                <EmploymentFilters
                  eachEmployment={eachEmployment}
                  onClickEmployment={this.onClickEmployment}
                  key={eachEmployment.employmentTypeId}
                />
              ))}
            </ul>
            <hr />
            <h1 className="filter-heads">Salary Range</h1>
            <ul className="filters-list">
              {salaryRangesList.map(eachSalary => (
                <SalaryFilters
                  eachSalary={eachSalary}
                  key={eachSalary.salaryRangeId}
                  onClickRadioItem={this.onClickRadioItem}
                />
              ))}
            </ul>
          </div>
          <div>
            <div className="search-input-container">
              <input
                onChange={this.readUserInput}
                value={searchInput}
                className="search-input"
                type="search"
                placeholder="Search"
              />
              <div className="icon-cont">
                <button
                  onClick={this.getUserInput}
                  type="button"
                  data-testid="searchButton"
                  className="search-btn"
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
            </div>
            {this.renderJobViews()}
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
