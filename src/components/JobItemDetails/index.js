import {Component} from 'react'
import Cookies from 'js-cookie'
import {MdLocationOn} from 'react-icons/md'
import {FaStar} from 'react-icons/fa'
import {BsBriefcaseFill} from 'react-icons/bs'
import {RiExternalLinkLine} from 'react-icons/ri'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import SkillsCard from '../SkillsCard'
import SimilarJobDetails from '../SimilarJobDetails'

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
    const {jobData, similarJobDetails} = this.state
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
    const {imageUrl, description} = lifeAtCompany

    return (
      <div className="job-item-container">
        <div className="job-item-data-container">
          <div className="company-profile-container">
            <img
              className="job-item-company-logo"
              src={companyLogoUrl}
              alt="job details company logo"
            />
            <div className="title-container">
              <h1 className="job-item-title">{title}</h1>
              <div className="job-item-rating-container">
                <FaStar className="job-item-star" />
                <p className="job-item-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-item-location-jobtype-package-container">
            <div className="job-item-location-jobtype-container">
              <div className="job-item-location-container">
                <MdLocationOn className="job-item-icons" />
                <p className="job-item-loc-jobtype-text">{location}</p>
              </div>
              <div className="job-item-jobtype-container">
                <BsBriefcaseFill className="job-item-icons" />
                <p className="job-item-loc-jobtype-text">{employmentType}</p>
              </div>
            </div>
            <p className="job-item-package">{packagePerAnnum}</p>
          </div>
          <hr />
          <div className="job-item-description-container">
            <h1 className="jobitem-heading">Description</h1>
            <div className="job-item-visit-link-container">
              <a
                href={companyWebsiteUrl}
                target="_blank"
                className="job-item-website-link"
                rel="noreferrer"
              >
                Visit
              </a>
              <RiExternalLinkLine className="job-item-visit-link" />
            </div>
          </div>
          <p className="jobitem-description">{jobDescription}</p>
          <h1 className="jobitem-heading">Skills</h1>
          <ul className="skills-list">
            {skills.map(eachSkill => (
              <SkillsCard skillDetails={eachSkill} key={eachSkill.name} />
            ))}
          </ul>
          <h1 className="lifeatcompany-heading">Life at Company</h1>
          <div className="lifeatcompany-container">
            <p className="lifeatcompany-description">{description}</p>
            <img
              className="lifeatcompany-imageurl"
              src={imageUrl}
              alt="life at company"
            />
          </div>
        </div>
        <h1 className="similarjobs-heading">Similar Jobs</h1>
        <ul className="similarjobdetails-list-container">
          {similarJobDetails.map(each => (
            <SimilarJobDetails key={each.id} similarJobItem={each} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="jobitem-failure-conatiner">
      <img
        className="jobitem-failure-img"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="jobitem-failure-heading">Oops! Something Went Wrong</h1>
      <p className="jobitem-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-btn"
        onClick={this.getSpecificProduct}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="job-item-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDataDetailsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDataSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderJobDataDetailsView()}
      </>
    )
  }
}

export default JobItemDetails
