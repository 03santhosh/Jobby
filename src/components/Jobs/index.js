import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'

import Header from '../Header'
import ProfileDetails from '../ProfileDetails'
import JobItem from '../JobItem'
import './index.css'

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
  state = {jobsList: []}

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url =
      'https://apis.ccbp.in/jobs?employment_type=FULLTIME,PARTTIME&minimum_package=1000000&search='
    const opitons = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const respone = await fetch(url, opitons)

    if (respone.ok === true) {
      const updatedData = await respone.json()
      // console.log(updatedData)
      const fetchedJobsData = updatedData.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      // console.log(fetchedJobsData)
      this.setState({jobsList: fetchedJobsData})
    }
  }

  renderJobsSuccesView = () => {
    const {jobsList} = this.state

    return (
      <ul className="jobslist-container">
        {jobsList.map(each => (
          <JobItem key={each.id} jobItemList={each} />
        ))}
      </ul>
    )
  }

  renderTypeOfEmployment = () => {
    return (
      <>
        <h1 className="employmenttype-heading">Type of Employment</h1>
        {employmentTypesList.map(each => (
          <li className="employmenttype-list" key={each.employmentTypeId}>
            <input
              type="checkbox"
              className="checkbox-input"
              value={each.label}
              id="label"
            />
            <label className="label" htmlFor="label">
              {each.label}
            </label>
          </li>
        ))}
      </>
    )
  }
  rendersalaryRanges = () => {
    return (
      <>
        <h1 className="employmenttype-heading">Salary Range</h1>
        {salaryRangesList.map(each => (
          <li className="employmenttype-list" key={each.salaryRangeId}>
            <input
              type="radio"
              className="checkbox-input"
              value={each.label}
              id="label"
            />
            <label className="label" htmlFor="label">
              {each.label}
            </label>
          </li>
        ))}
      </>
    )
  }

  renderSearchValue = () => {
    return (
      <div className="search-container">
        <input type="search" placeholder="Search" className="search-input" />
        <button className="search-btn" type="button" data-testid="searchButton">
          <BsSearch className="search-icon" aria-label="search" />
        </button>
      </div>
    )
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-bg-container">
          <div className="sort-by-conatainer">
            <ProfileDetails />
            <hr />
            {this.renderTypeOfEmployment()}
            <hr />
            {this.rendersalaryRanges()}
          </div>
          <div className="job-details-container">
            {this.renderSearchValue()}
            {this.renderJobsSuccesView()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
