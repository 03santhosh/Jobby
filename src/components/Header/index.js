import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {FiLogOut} from 'react-icons/fi'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="nav-container">
      <div className="nav-largedevice-container">
        <Link className="links" to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>
        <ul className="navigate-link-container">
          <Link className="links" to="/">
            <li className="navigation-link">Home</li>
          </Link>
          <Link className="links" to="/jobs">
            <li className="navigation-link">Jobs</li>
          </Link>
        </ul>
        <button type="button" className="logout-btn" onClick={onClickLogout}>
          Logout
        </button>
      </div>

      <div className="nav-smalldevice-container">
        <Link className="links" to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>
        <ul className="navigate-link-container">
          <li className="navigation-link">
            <Link className="links" to="/">
              <AiFillHome className="header-icons" />
            </Link>
          </li>
          <li className="navigation-link">
            <Link className="links" to="/jobs">
              <BsFillBriefcaseFill className="header-icons" />
            </Link>
          </li>
          <li className="navigation-link">
            <button
              type="button"
              className="logout-btn"
              onClick={onClickLogout}
            >
              <FiLogOut className="header-icons" aria-label="logOut" />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
