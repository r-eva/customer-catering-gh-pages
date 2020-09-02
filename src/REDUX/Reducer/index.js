import {combineReducers} from 'redux';
import RegisterFormReducer from './RegisterFormReducer'
import LoginFormReducer from './LoginFormReducer'
import UserReducer from './UserReducer'
import TimeOutPaymentReducer from './timeOutPaymentReducer'
import CartReducer from './cartGlobal'

export default combineReducers({
    registerForm: RegisterFormReducer,
    loginForm: LoginFormReducer,
    user: UserReducer,
    timeoutData: TimeOutPaymentReducer,
    cart: CartReducer
})