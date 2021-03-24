import {

    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL, 


} 
from '../constants/userConstants'


const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null
}


export default function AuthReducer(state = initialState, action) {
    const { type, payload } = action

    switch(type) {
        
           // return { loading:true }
        case USER_LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access)
            return{
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh
            }
        case USER_DETAILS_SUCCESS:
            return{
                ...state,
                user: payload
            }
        case USER_DETAILS_FAIL:
            return{
                ...state,
                user: null
            }
        case USER_LOGIN_FAIL:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return{
                ...state,
                access:null,
                refresh:null,
                isAuthenticated: false,
                user: null
            }
        default: 
            return state
    }
}


/*

export const authReducer(state = {}, action) => {
    switch(action.type) {
        case USER_LOGIN_SUCCESS:
            //localStorage.setItem('access', payload.access)
           // return { loading:true }
            return{
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh
            }
        case USER_DETAILS_SUCCESS:
            return{
                ...state,
                user: payload
            }
        case USER_DETAILS_FAIL:
            return{
                ...state,
                user: null
            }
        case USER_LOGIN_FAIL:

            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return{
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null

            }
        default:
            return state 
    }
}
*/