import {BsSearch} from 'react-icons/bs'

import ProfileDetails from '../ProfileDetails'

import './index.css'

const FiltersGroup = props => {
  const OnChangeSearchInput = event => {
    const {changeSearchInput} = props
    changeSearchInput(event)
  }

  const OnEnterSearchInput = event => {
    const {getJobs} = props
    if (event.key === 'Enter') {
      getJobs()
    }
  }

  const renderSearchValue = () => {
    const {getJobs, searchInput} = props
    return (
      <div className="search-container">
        <input
          type="search"
          placeholder="Search"
          className="search-input"
          value={searchInput}
          onChange={OnChangeSearchInput}
          onKeyDown={OnEnterSearchInput}
        />
        <button
          className="search-btn"
          type="button"
          data-testid="searchButton"
          onClick={getJobs}
        >
          <BsSearch className="search-icon" aria-label="search" />
        </button>
      </div>
    )
  }

  const onSelectEmployeeType = event => {
    const {changeEmployeeList} = props
    changeEmployeeList(event.target.value)
  }

  const renderTypeOfEmployment = () => {
    const {employmentTypesList} = props
    return (
      <>
        <h1 className="employmenttype-heading">Type of Employment</h1>
        {employmentTypesList.map(each => (
          <li className="employmenttype-list" key={each.employmentTypeId}>
            <input
              type="checkbox"
              className="checkbox-input"
              value={each.employmentTypeId}
              onChange={onSelectEmployeeType}
              id={each.employmentTypeId}
            />
            <label className="label" htmlFor={each.employmentTypeId}>
              {each.label}
            </label>
          </li>
        ))}
      </>
    )
  }

  const rendersalaryRanges = () => {
    const {salaryRangesList} = props
    return (
      <>
        <h1 className="employmenttype-heading">Salary Range</h1>
        <ul className="salaryranges-List">
          {salaryRangesList.map(each => {
            const {changeSalary} = props
            const onClickSalary = () => {
              changeSalary(each.salaryRangeId)
            }
            return (
              <li
                className="employmenttype-list"
                key={each.salaryRangeId}
                onClick={onClickSalary}
              >
                <input
                  type="radio"
                  className="checkbox-input"
                  name="salary"
                  id={each.salaryRangeId}
                />
                <label className="label" htmlFor={each.salaryRangeId}>
                  {each.label}
                </label>
              </li>
            )
          })}
        </ul>
      </>
    )
  }

  return (
    <div className="filters-group-container">
      {renderSearchValue()}
      <ProfileDetails />
      <hr />
      {renderTypeOfEmployment()}
      <hr />
      {rendersalaryRanges()}
    </div>
  )
}

export default FiltersGroup
