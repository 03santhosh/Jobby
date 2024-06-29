import {MdLocationOn} from 'react-icons/md'
import {FaStar} from 'react-icons/fa'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobDetails = props => {
  const {similarJobItem} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobItem

  return (
    <li className="similarjobdetails-list">
      <div>
        <div className="similarjob-profile-container">
          <img
            className="similarjob-logo"
            src={companyLogoUrl}
            alt="similar job company logo"
          />
          <div className="similarjob-title-container">
            <h1 className="similarjob-title">{title}</h1>
            <div className="similarjob-rating-container">
              <FaStar className="similarjob-star" />
              <p className="similarjob-rating">{rating}</p>
            </div>
          </div>
        </div>
        <h1 className="similarjob-description-heading">Description</h1>
        <p className="similarjob-description">{jobDescription}</p>
        <div className="similarjob-location-jobtype-container">
          <div className="similarjob-location-jobtype-container">
            <div className="similarjob-location-container">
              <MdLocationOn className="similarjob-icons" />
              <p className="similarjob-loc-jobtype-text">{location}</p>
            </div>
            <div className="similarjob-jobtype-container">
              <BsBriefcaseFill className="similarjob-icons" />
              <p className="similarjob-loc-jobtype-text">{employmentType}</p>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobDetails
