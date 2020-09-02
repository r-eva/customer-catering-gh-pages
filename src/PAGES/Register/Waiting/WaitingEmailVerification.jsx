import React, { Component } from 'react';
import queryString from 'query-string'
import axios from 'axios'
import {urlApi} from '../../../HELPERS/database'
import swal from 'sweetalert'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import './Waiting.css'

class WaitingEmailVerification extends Component {
    
    state = {
        btnResendEmailClick: false
    }

    onBtnResendEmailClick = () => {
        this.setState({btnResendEmailClick: true})
        var params = queryString.parse(this.props.location.search)
        axios.post(urlApi + 'user/resendemailconfirm', {
            email: params.email
        })
        .then((res) => {
            this.setState({btnResendEmailClick: false})
            swal (`${res.data.message}`, `Please check your email!`, 'success')
        })
        .catch((err) => {
            swal (`Send email verification failed.`, `Please check your email or connection!`, 'error')
        })
    }

    render() {
        if (this.props.user.username === '')
            return <Redirect to="/" exact/>
        return (
            <div className="container-fluid d-flex flex-column align-items-center justify-content-end background-waiting p-4 mobile-text">
                <h1>Thank you for your registration!</h1>
                <h3 className="text-center">Please check your email to verify your account before shopping.</h3>
                <h5 className="mb-3 text-center">If you have not received any email from us, please click button bellow to resend email.</h5>
                {
                    this.state.btnResendEmailClick
                    ?
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    :
                    <button type="button" className="btn btn-primary" onClick={this.onBtnResendEmailClick}><h5>Resend Email</h5></button>
                }   
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        registerForm: state.registerForm
    }
}

export default connect(mapStateToProps)(WaitingEmailVerification);