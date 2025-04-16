import {Component} from 'react'
import Cookies from 'js-cookie'
import {IoIosStar} from 'react-icons/io'
import {IoLocationSharp, IoBagCheckOutline} from 'react-icons/io5'
import {GoLinkExternal} from 'react-icons/go'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Header from '../Header'
import JobSkills from '../JobSkills'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class JobItem extends Component {
  state = {
    jobItemsDetails: [],
    similarJobList: [],
    skillList: [],
    companyLife: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobItemsData()
  }

  getJobItemsData = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, options)
    if (response.ok === true) {
      const data = await response.json()
      const jobItemsData = {
        id: data.job_details.id,
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        jobDescription: data.job_details.job_description,
        lifeAtCompany: data.job_details.life_at_company,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        skills: data.job_details.skills,
        title: data.job_details.title,
      }
      const skillsData = jobItemsData.skills.map(eachSkill => ({
        name: eachSkill.name,
        imageUrl: eachSkill.image_url,
      }))
      const companyLifeData = {
        description: jobItemsData.lifeAtCompany.description,
        imageUrl: jobItemsData.lifeAtCompany.image_url,
      }
      const similarJobsData = data.similar_jobs.map(eachSimilarJob => ({
        id: eachSimilarJob.id,
        companyLogoUrl: eachSimilarJob.company_logo_url,
        employmentType: eachSimilarJob.employment_type,
        jobDescription: eachSimilarJob.job_description,
        location: eachSimilarJob.location,
        rating: eachSimilarJob.rating,
        title: eachSimilarJob.title,
      }))
      this.setState({
        jobItemsDetails: jobItemsData,
        similarJobList: similarJobsData,
        skillList: skillsData,
        companyLife: companyLifeData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderItemFailure = () => (
    <div className="failure-cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button
        onClick={this.getJobItemsData}
        className="profile-retry"
        type="button"
      >
        Retry
      </button>
    </div>
  )

  renderItemLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderItemSuccess = () => {
    const {jobItemsDetails, similarJobList, skillList, companyLife} = this.state
    const {
      companyLogoUrl,
      rating,
      title,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
    } = jobItemsDetails
    const {description, imageUrl} = companyLife
    return (
      <div className="jobitem-main-contaier">
        <div className="job-item-cont">
          <div className="logo-title-rating-cont">
            <img
              className="company-logo"
              src={companyLogoUrl}
              alt="job details company logo"
            />
            <div>
              <h1 className="job-title">{title}</h1>
              <div className="star-rating-container">
                <IoIosStar className="star-icon" />
                <p className="jobs-type-names">{rating}</p>
              </div>
            </div>
          </div>
          <div className="package-container">
            <div className="location-type-container">
              <div className="job-icon-containers">
                <IoLocationSharp className="job-icons" />
                <p className="jobs-type-names">{location}</p>
              </div>
              <div className="job-icon-containers">
                <IoBagCheckOutline className="job-icons" />
                <p className="jobs-type-names">{employmentType}</p>
              </div>
            </div>
            <div>
              <p className="jobs-type-names">{packagePerAnnum}</p>
            </div>
          </div>
          <hr />
          <div>
            <div className="desc-link">
              <h1 className="desc-head">Description</h1>
              <div className="link-contain">
                <a className="visit-link" href={companyWebsiteUrl}>
                  Visit
                  <GoLinkExternal className="link-icon" />
                </a>
              </div>
            </div>
            <p className="job-desc">{jobDescription}</p>
          </div>
          <div>
            <h1 className="skills-head">Skills</h1>
            <ul className="skills-container">
              {skillList.map(eachSkill => (
                <JobSkills eachSkill={eachSkill} key={eachSkill.name} />
              ))}
            </ul>
          </div>
          <div>
            <h1 className="skills-head">Life at Company</h1>
            <div className="company-desc-cont">
              <p className="com-desc">{description}</p>
              <img
                className="desc-image"
                src={imageUrl}
                alt="life at company"
              />
            </div>
          </div>
        </div>
        <h1 className="similar-head">Similar Jobs</h1>
        <ul className="similar-jobs-cont">
          {similarJobList.map(eachSimilarjob => (
            <SimilarJobs
              eachSimilarJob={eachSimilarjob}
              key={eachSimilarjob.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderJobItemViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return this.renderItemLoading()
      case apiStatusConstants.success:
        return this.renderItemSuccess()
      case apiStatusConstants.failure:
        return this.renderItemFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <ul className="item-conti">
          <Header />
        </ul>
        {this.renderJobItemViews()}
      </>
    )
  }
}
export default JobItem
