import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,


    AUTH_USER_LOGIN_SUCCESS,
    AUTH_USER_LOGIN_FAIL,

    AUTH_USER_LOADED_SUCCESS,
    AUTH_USER_LOADED_FAIL,

    AUTH_USER_DETAILS_SUCCESS,
    AUTH_USER_DETAILS_FAIL, 

    USER_AUTHENTICATED_SUCCESS,
    USER_AUTHENTICATED_FAIL,
    AUTH_USER_LOGOUT,

    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL
} 
from '../constants/userConstants'


const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user:null,
    authUser: null,
    authUserInfo: null
}


export const authReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch(type) {
        case USER_AUTHENTICATED_SUCCESS:
            return{
                ...state,
                isAuthenticated: true
            }
           // return { loading:true }
        case AUTH_USER_LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access)
            
            return{
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh,
                user: payload.data,
                authUser: payload.data,
                authUserInfo: action.payload 
            }
        case AUTH_USER_DETAILS_SUCCESS:
            localStorage.setItem('access', payload.access)
            return{
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh,
                user: payload.data,
                authUuser: payload.data,
                authUserInfo: action.payload 
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false
            }
        case AUTH_USER_LOADED_SUCCESS:
            return{
                ...state,
                user: payload
            }

        case AUTH_USER_LOADED_FAIL:
            return{
                ...state,
                user: null
            }
        case AUTH_USER_DETAILS_FAIL:
            return{
                 ...state,
                user: null
            }        
        case USER_AUTHENTICATED_FAIL:
            return {
                ...state,
                user: null
            }
        case AUTH_USER_LOGIN_FAIL:
        case SIGNUP_FAIL:
        case AUTH_USER_LOGOUT:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            localStorage.removeItem('authUser')
            localStorage.removeItem('authUserInfo')

            return{
                ...state,
                access:null,
                refresh:null,
                isAuthenticated: false,
                user: null,
                authUser: null,
                authUserInfo: null
            }
        case PASSWORD_RESET_SUCCESS:
        case PASSWORD_RESET_FAIL:
        case PASSWORD_RESET_CONFIRM_SUCCESS:
        case PASSWORD_RESET_CONFIRM_FAIL:
        case ACTIVATION_SUCCESS:
        case ACTIVATION_FAIL:
            return {
                ...state
            }
        default: 
            return state
    }
}




/*
export const authReducer = (state = {}, action) => {
    const { type, payload } = action
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