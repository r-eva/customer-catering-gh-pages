import {
   ON_USER_LOGIN,
   LOGIN_FAILED,
   LOGIN_SUCCESS
} from '../Action/types'
import Axios from 'axios'
import {urlApi} from '../../HELPERS/database'

export const loginUser = (dataUser) => {
    return (dispatch) => {
        dispatch({type: ON_USER_LOGIN})
        if (dataUser.email !== '' && dataUser.password !== '') {
           Axios.post(urlApi + 'user/login', {
               email: dataUser.email,
               password: dataUser.password
           })
           .then(res => {
               localStorage.setItem('token', res.data.token)
               dispatch({
                   type: LOGIN_SUCCESS,
                   payload: res.data
               })
           })
           .catch(err => {
               console.log(err)
               dispatch({
                    type: LOGIN_FAILED,
                    payload: err.response.data.message
                })
           })
        } else {
            dispatch({
                type: LOGIN_FAILED,
                payload: 'Please input username and password'
            })
        }
    }
}

export const loginByFacebook = (data) => {
    return (dispatch) => {
        Axios.post(urlApi + `user/loginbyfacebook`, data)
        .then((res) => {
            localStorage.setItem('token', res.data.token)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }
}
