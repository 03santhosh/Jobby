import {MdLocationOn} from 'react-icons/md'
import {FaStar} from 'react-icons/fa'
import {BsBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

import './index.css'

const JobItem = props => {
  const {jobItemList} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobItemList

  return (
    <Link className="links" to={`/jobs/${id}`}>
      <li className="jobs-list">
        <div className="company-profile-container">
          <img
            className="company-logo"
            src={companyLogoUrl}
            alt="job details company logo"
          />
          <div className="title-container">
            <h1 className="job-title">{title}</h1>
            <div className="rating-container">
              <FaStar className="star" />
              <p className="job-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-jobtype-package-container">
          <div className="location-jobtype-container">
            <div className="location-container">
              <MdLocationOn className="icons" />
              <p className="loc-jobtype-text">{location}</p>
            </div>
            <div className="jobtype-container">
              <BsBriefcaseFill className="icons" />
              <p className="loc-jobtype-text">{employmentType}</p>
            </div>
          </div>
          <p className="job-package">{packagePerAnnum}</p>
        </div>
        <hr />
        <h1 className="job-description-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
