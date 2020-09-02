import {
    FIRST_CHECKOUT_CLIKED
} from '../Action/types'

const INITIAL_STATE = {
    timeOutClick: true,
    dayCheckOut: null,
    tampilDayCheckout: '' 
}

export default (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case FIRST_CHECKOUT_CLIKED :
            return { 
                ...state,
                timeOutClick: action.payload.timeOutClick,
                dayCheckOut: action.payload.dayCheckOut,
                tampilDayCheckOut: action.payload.tampilDayCheckOut
            }
        default :
            return state
    }
}