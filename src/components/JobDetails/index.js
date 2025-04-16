import {Link} from 'react-router-dom'
import {IoIosStar} from 'react-icons/io'
import {IoLocationSharp, IoBagCheckOutline} from 'react-icons/io5'
import './index.css'

const JobDetails = props => {
  const {eachJob} = props
  const {
    id,
    title,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
  } = eachJob
  return (
    <Link className="job-links" to={`/jobs/${id}`}>
      <li className="each-job-cont">
        <div className="logo-title-rating-cont">
          <img
            className="company-logo"
            src={companyLogoUrl}
            alt="company logo"
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
          <h1 className="desc-head">Description</h1>
          <p className="job-desc">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}
export default JobDetails
