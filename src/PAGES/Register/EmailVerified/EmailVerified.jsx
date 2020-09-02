import React, { Component } from 'react';
import axios from 'axios'
import queryString from 'query-string'
import {urlApi} from '../../../HELPERS/database'
import {connect} from 'react-redux'
import {confirmLogin} from '../../../REDUX/Action/userAction'
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import './EmailVerified.css'


class EmailVerified extends Component {
    
    state = { 
        message: 'Verifying Email, Please Wait...',
        encryptedEmail: ''
    }

    componentDidMount() {
        var params = queryString.parse(this.props.location.search)
        axios.post(urlApi + 'user/confirmemail', {
            email: params.email
        })
        .then((res) => {
            this.setState({loading: false, message: 'Your email has been verified.'})
            localStorage.setItem('token', res.data.token)
            this.props.confirmLogin(res.data)
        })
        .catch((err) => {
            this.setState({loading: false, message: 'Your email failed to be verified.'})
        })
    }

    render() {
        return (
            <div className="container-fluid d-flex flex-column align-items-center justify-content-end background-verified p-5 text-center">
                <h1 className="mb-3">{this.state.message}</h1>
                <div className="row">
                    <div className="col-12 justify-content-center">
                        <Link className="pb-5 pt-3" to='/'>
                            <Button variant="success" className="btn btn-block font-weight-bold" type="submit"><h3>GO CATERING</h3></Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        registerForm: state.registerForm
    }
}

export default connect(mapStateToProps, {confirmLogin})(EmailVerified);