import {Component} from 'react'
import Cookies from 'js-cookie'
import {MdLocationOn} from 'react-icons/md'
import {FaStar} from 'react-icons/fa'
import {BsBriefcaseFill} from 'react-icons/bs'
import {RiExternalLinkLine} from 'react-icons/ri'

import Header from '../Header'
import SkillsCard from '../SkillsCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobData: [],
    similarJobDetails: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getSpecificProduct()
  }

  getFormattedSimilarJobs = fetchedData => ({
    companyLogoUrl: fetchedData.company_logo_url,
    employmentType: fetchedData.employment_type,
    id: fetchedData.id,
    jobDescription: fetchedData.job_description,
    location: fetchedData.location,
    rating: fetchedData.rating,
    title: fetchedData.title,
  })

  getFormattedData = fetchedData => ({
    companyLogoUrl: fetchedData.company_logo_url,
    companyWebsiteUrl: fetchedData.company_website_url,
    employmentType: fetchedData.employment_type,
    id: fetchedData.id,
    jobDescription: fetchedData.job_description,
    lifeAtCompany: {
      description: fetchedData.life_at_company.description,
      imageUrl: fetchedData.life_at_company.image_url,
    },
    location: fetchedData.location,
    packagePerAnnum: fetchedData.package_per_annum,
    rating: fetchedData.rating,
    title: fetchedData.title,
    skills: fetchedData.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
  })

  getSpecificProduct = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = this.getFormattedData(fetchedData.job_details)
      const updatedSimilarJobsData = fetchedData.similar_jobs.map(each =>
        this.getFormattedSimilarJobs(each),
      )
      this.setState({
        jobData: updatedData,
        similarJobDetails: updatedSimilarJobsData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobDataSuccessView = () => {
    const {jobData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      skills,
      lifeAtCompany,
    } = jobData
    // const {description} = lifeAtCompany
    // console.log(skills)
    // console.log(lifeAtCompany)
    return (
      <div className="job-item-data-container">
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
        <div className="job_description-container">
          <h1 className="jobitem-heading">Description</h1>
          <div className="visit-link-container">
            <a href={companyWebsiteUrl} className="website-link">
              Visit
            </a>
            <RiExternalLinkLine className="visit-link" />
          </div>
        </div>
        <p className="jobitem-description">{jobDescription}</p>
        <h1 className="jobitem-heading">Skills</h1>
        <ul className="skills-list">
          {skills.map(eachSkill => (
            <SkillsCard skillDetails={eachSkill} key={eachSkill.name} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-container">
          {this.renderJobDataSuccessView()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
