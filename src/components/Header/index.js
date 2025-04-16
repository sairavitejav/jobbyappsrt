import Cookies from 'js-cookie'
import {IoMdHome} from 'react-icons/io'
import {IoBagCheckOutline, IoExitOutline} from 'react-icons/io5'
import {Link, withRouter} from 'react-router-dom'
import './index.css'

const Header = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <>
      <nav className="navbar-sm-container">
        <div>
          <Link to="/">
            <img
              className="header-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>
        </div>
        <div>
          <Link to="/">
            <IoMdHome className="header-icons" />
          </Link>
          <Link to="/jobs">
            <IoBagCheckOutline className="header-icons" />
          </Link>
          <button onClick={onLogout} className="logout-btn-sm" type="button">
            <IoExitOutline className="header-icons" />
          </button>
        </div>
      </nav>
      <nav className="navbar-lg-container">
        <li>
          <Link to="/">
            <img
              className="header-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>
        </li>
        <li className="header-link-names-container">
          <Link className="header-names" to="/">
            <p>Home</p>
          </Link>
          <Link className="header-names" to="/jobs">
            <p>Jobs</p>
          </Link>
        </li>
        <li>
          <button onClick={onLogout} className="logout-btn-lg" type="button">
            Logout
          </button>
        </li>
      </nav>
    </>
  )
}
export default withRouter(Header)
