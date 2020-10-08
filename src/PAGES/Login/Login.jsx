import React, { Component } from 'react';
import {connect} from 'react-redux'
import './Login.css'
import { loginUser } from '../../REDUX/Action/LoginFormAction'
import { Redirect } from 'react-router-dom'
import {Card, Form, InputGroup, FormControl} from "react-bootstrap"
import {IconContext} from "react-icons";
import {AiTwotoneMail} from 'react-icons/ai'
import {FaLock} from 'react-icons/fa'
// import Maillogo from '../../IMG/Login/maillogo.png'
// import Facebook from './Facebook'

class Login extends Component {

    state = {
        inputEmail: '',
        inputPassword: ''
    }

    onLoginBtnHandler = () => {
        let userInput = {
            email: this.state.inputEmail,
            password: this.state.inputPassword
        }
      this.props.loginUser(userInput)
    }

    renderButtonLogin = () => {
        if (!this.props.loginForm.loading) {
            return <button type="submit" className="btn btn-danger mb-3 mb-3" onClick={this.onLoginBtnHandler}>SIGN IN</button>
        } else {
            return(
                <>
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </>
            ) 
        }
    }

    render() {
        if (this.props.user.status !== '') return <Redirect to="/" exact/>
        return (
            <div className="container-fluid background-image d-flex align-items-center justify-content-center pt-5">
            <Card className="mt-5 card-login">
                <Card.Body>
                    <div className='row justify-content-center mb-3'>
                        <h1 className="my-3 font-weight-bold text-center">Sign In</h1>
                    </div>
                    <Form className="mb-3 pr-5 pl-5">
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">
                                    <IconContext.Provider
                                        value={{
                                        color: 'black',
                                        size: '23px'
                                    }}>
                                        <AiTwotoneMail/>
                                    </IconContext.Provider>
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl placeholder="Email" onChange={(e) => this.setState({inputEmail: e.target.value})}/>
                        </InputGroup>
                        <InputGroup className="mt-3 mb-4">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">
                                    <IconContext.Provider
                                        value={{
                                        color: 'black',
                                        size: '23px'
                                    }}>
                                        <FaLock/>
                                    </IconContext.Provider>
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl placeholder="Password" type="password" onChange={(e) => this.setState({inputPassword: e.target.value})}/>
                        </InputGroup>
                        <div className="text-center">
                            {this.renderButtonLogin()}
                            {/* <h6 style={{fontSize: '13px'}} className='text-center'>Or login in with</h6>
                            <Facebook/>
                            <img className="mb-3" src={Maillogo} alt="iconMail" width="35px"/> */}
                        </div>
                        <div className="text-center mt-2 mb-3 text-danger">
                            {this.props.loginForm.error}
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
        );
    }
}

const mapStateToProps = ({loginForm, user}) => {
    return {
        loginForm,
        user
    }
}

export default connect(mapStateToProps, {loginUser})(Login);