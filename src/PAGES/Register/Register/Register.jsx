import React, {Component} from 'react';
import './Register.css'
import {Card, Form, InputGroup, FormControl, Button} from "react-bootstrap"
import {IconContext} from "react-icons";
import {FaUserAlt, FaLock} from 'react-icons/fa'
import {AiTwotoneMail} from 'react-icons/ai'
import {MdWarning} from 'react-icons/md'
import {connect} from 'react-redux'
import {registerUser} from '../../../REDUX/Action/RegisterFormAction'
import {Redirect} from 'react-router-dom'

class Register extends Component {

    state = {
        inputUsername: '',
        inputEmail: '',
        inputPassword: '',
        inputRepeatPassword: '',
        errorMessage: '',
        registerSuccess: !this.props.registerForm.registerSuccess
    }

    componentDidMount() {
        if(!this.state.registerSuccess){
            window.location.reload()
            this.setState({registerSuccess: !this.props.registerForm.registerSuccess})
        }
    }

    onRegisterBtnHandler = () => {
        var inputUser = {
            username: this.state.inputUsername,
            email: this.state.inputEmail,
            password: this.state.inputPassword,
            confirmPassword: this.state.inputRepeatPassword
        }
        this.props.registerUser(inputUser)
    }

    render() {
        if (this.props.user.username !== '')
        return <Redirect to="/" exact/>

        if(!this.props.registerForm.registerSuccess){
            return (
                <div className="container-fluid background-register d-flex align-items-center justify-content-center pt-5">
                {/* CARD REGISTER */}
                <Card className="mt-5 card-register">
                    <Card.Body>
                        {/* HEADING CARD */}
                        <div className='row justify-content-center mb-3'>
                            <h1 className="my-1 font-weight-bold text-center">Register</h1>
                        </div>
                        {/* HEADING CARD */}
    
                        {/* USERNAME AND EMAIL ROW */}
                        <Form className="mb-2 pr-3 pl-3">
                            <InputGroup className="mr-md-3 mb-2">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1">
                                        <IconContext.Provider
                                            value={{
                                            color: 'black',
                                            size: '23px'
                                        }}>
                                            <FaUserAlt/>
                                        </IconContext.Provider>
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    placeholder="Username"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1" onChange={(e) => this.setState({inputUsername: e.target.value})}/>
                            </InputGroup>
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
                                <FormControl
                                    placeholder="Email"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1" onChange={(e) => this.setState({inputEmail: e.target.value})}/>
                            </InputGroup>
                        </Form>
                        {/* END USERNAME AND EMAIL ROW */}
                        {/* PASSWORD AND REPEAT PASSWORD ROW */}
                        <Form className="mb-2 pr-3 pl-3">
                            <InputGroup className="mr-md-3 mb-2">
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
                                <FormControl
                                    type="password"
                                    placeholder="Password"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1" onChange={(e) => this.setState({inputPassword: e.target.value})}/>
                            </InputGroup>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1">
                                        <IconContext.Provider
                                            value={{
                                            color: 'black',
                                            size: '23px'
                                        }}>
                                            <MdWarning/>
                                        </IconContext.Provider>
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    type="password"
                                    placeholder="Repeat Password"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1" onChange={(e) => this.setState({inputRepeatPassword: e.target.value})}/>
                            </InputGroup>
                        </Form>
                        {/* END PASSWORD AND REPEAT PASSWORD ROW */}
    
                        {/* TEXT CORRECTION */}
                        {
                            !this.props.registerForm.error
                            ?
                            <div className="text-center mt-2 mb-3 text-danger">
                                &nbsp;
                            </div>
                            :
                            <div className="text-center mt-2 mb-3 text-danger">
                                {this.props.registerForm.error} 
                            </div>
                        }
                        
                        {/* TEXT CORRECTION */}
    
                        {/* BUTTON SUBMIT AND LOGIN WITH SOCIAL MEDIA */}
                        <div className="row">
                            <div className="col-12">
                                <div className='text-center'>
                                    {
                                        this.props.registerForm.loading === true
                                        ?
                                        <div className="text-center">
                                            <div className="spinner-border text-danger" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                        :
                                        <>  
                                            <div className="text-center">
                                                <Button variant="danger" className="mb-3" onClick={this.onRegisterBtnHandler}>REGISTER</Button>
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                        
                        {/* END BUTTON SUBMIT AND AND LOGIN WITH SOCIAL MEDIA */}
                    </Card.Body>
                </Card>
                {/* END CARD REGISTER */}
            </div>
            );
        }
        return <Redirect to={`/waitingemailverification?email=${this.props.registerForm.emailSuccess}`} />
    }
}

const mapStateToProps = (state) => {
    return {
        registerForm: state.registerForm,
        user: state.user
    }
}

export default connect(mapStateToProps, {registerUser})(Register);

