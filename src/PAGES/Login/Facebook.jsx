import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import Facebooklogo from '../../IMG/Login/facebooklogo.png'
import {connect} from "react-redux"
import {loginByFacebook} from '../../REDUX/Action/LoginFormAction'

class Facebook extends Component {
  state = {
    buttonClicked: false,
    isLoggedIn: false,
    username: "",
    email: "",
    password: ""
  };

  responseFacebook = response => {
    if (response.status !== 'not_authorized') {
        this.setState({
            isLoggedIn: true,
            username: response.name,
            email: response.userID,
            password: "facebooklogin"
          })
    }
  };

  componentClicked = () => {
    this.setState({buttonClicked: true})
  };

  render() {
    if (this.state.buttonClicked) {

      let fbContent;

      if (this.state.isLoggedIn) {
        var userData = {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email
        }
      return <h1>{this.props.loginByFacebook(userData)}</h1>
      
      } else {
        fbContent = (
          <FacebookLogin
            appId="560471304568397"
            autoLoad={true}
            fields="name,email,picture"
            callback={this.responseFacebook}
            icon={Facebooklogo}
          />
        );
      }
        return <div>{fbContent}</div>
    } else {
        return <img className="mb-3" src={Facebooklogo} alt="iconFacebook" width="40px" onClick={this.componentClicked}/>
    }
  }
}

export default connect(null, {loginByFacebook})(Facebook)