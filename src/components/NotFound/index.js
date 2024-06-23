import './index.css'

const NotFound = () => (
  <div className="notfound-bg-container">
    <img
      className="notfound-img"
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
    />
    <h1 className="notfound-heading">Page Not Found</h1>
    <p className="notfound-description">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
