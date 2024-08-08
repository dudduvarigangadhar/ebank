import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', pinId: '', err: false, emsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePinId = event => {
    this.setState({pinId: event.target.value})
  }

  onSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onFailure = msg => {
    this.setState({
      err: true,
      emsg: msg,
    })
  }

  onLogin = async event => {
    event.preventDefault()
    const {username, pinId} = this.state
    const userDetails = {user_id: username, pin: pinId}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  render() {
    const {username, pinId, err, emsg} = this.state
    return (
      <div className="bg-container">
        <div className="login-imgContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="login-img"
          />
          <div className="login-form-container">
            <h1>Welcome Back!</h1>
            <form className="form-container" onSubmit={this.onLogin}>
              <label htmlFor="user id" className="label-item">
                User ID
              </label>
              <input
                id="user id"
                type="text"
                className="input-container"
                placeholder="Enter user ID"
                onChange={this.onChangeUsername}
                value={username}
              />

              <label htmlFor="pin id" className="label-item">
                PIN
              </label>
              <input
                id="pin id"
                type="password"
                className="input-container"
                placeholder="Enter PIN"
                onChange={this.onChangePinId}
                value={pinId}
              />
              <button type="submit" className="login-btn">
                Login
              </button>
              {err && <p className="errMsg">{emsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
