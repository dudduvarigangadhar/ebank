import Cookies from 'js-cookie'
import {Redirect, withRouter, Link} from 'react-router-dom'
import './index.css'

const Home = props => {
  const logout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  const user = Cookies.get('jwt_token')
  if (user === undefined) {
    return <Redirect to="/ebank/login" />
  }

  return (
    <div className="HomeContainer">
      <div className="header-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
          className="logo-img"
        />

        <button type="button" className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
      <h1 className="heading">Your Flexibility, Our Excellence</h1>
      <div className="digitalCard-con">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
          className="digitalCard"
        />
      </div>
    </div>
  )
}

export default withRouter(Home)
