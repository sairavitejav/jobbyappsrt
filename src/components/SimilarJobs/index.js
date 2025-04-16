import {IoIosStar} from 'react-icons/io'
import {IoLocationSharp, IoBagCheckOutline} from 'react-icons/io5'
import './index.css'

const SimilarJobs = props => {
  const {eachSimilarJob} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = eachSimilarJob
  return (
    <li className="each-similar-cont">
      <div className="log-cont">
        <img
          className="logos"
          src={companyLogoUrl}
          alt="similar job company logo"
        />
        <div>
          <h1 className="samp">{title}</h1>
          <div className="start-cont">
            <IoIosStar className="star-icon" />
            <p>{rating}</p>
          </div>
        </div>
      </div>
      <div>
        <h1>Description</h1>
        <p>{jobDescription}</p>
      </div>
      <div className="last-cont">
        <div className="job-icon-containers">
          <IoLocationSharp className="job-icons" />
          <p className="jobs-type-names">{location}</p>
        </div>
        <div className="job-icon-containers">
          <IoBagCheckOutline className="job-icons" />
          <p className="jobs-type-names">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}
export default SimilarJobs
