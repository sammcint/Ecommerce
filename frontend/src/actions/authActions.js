import axios from 'axios'
import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,

    AUTH_USER_LOGIN_SUCCESS,
    AUTH_USER_LOGIN_FAIL,

    AUTH_USER_LOADED_SUCCESS,
    AUTH_USER_LOADED_FAIL,

    AUTH_USER_DETAILS_REQUEST,
    AUTH_USER_DETAILS_SUCCESS,
    AUTH_USER_DETAILS_FAIL, 
    AUTH_USER_DETAILS_RESET,

    USER_AUTHENTICATED_SUCCESS,
    USER_AUTHENTICATED_FAIL,

    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,



    AUTH_USER_LOGOUT
} 
from '../constants/userConstants'

export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }; 

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config);
    
            dispatch({
                type: AUTH_USER_LOADED_SUCCESS,
                payload: res.data
            });
            
        } catch (err) {
            dispatch({
                type: AUTH_USER_LOADED_FAIL
            });
        }
    } else {
        dispatch({
            type: AUTH_USER_LOADED_FAIL
        });
    }
};

export const signup = (name, email, password, re_password) => async dispatch => {
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, email, password, re_password })
    
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config)
        /*
        const { data } = await axios.post(
            '/api/users/login/',
            { 'username':email, 'password': password },
            config
            )
        //localStorage.setItem('userInfo', JSON.stringify(data))
        */
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        })

    } catch(error){
        dispatch({
            type: SIGNUP_FAIL,
            payload:error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}

export const verify = (uid, token) => async dispatch =>{
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ uid, token })
    
    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config)

        dispatch({
            type: ACTIVATION_SUCCESS,
        })

    } catch(err){
        dispatch({
            type: ACTIVATION_FAIL
        })
    }    
}

export const authLogin = (email, password) => async dispatch => {
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password })
    
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config)

        dispatch({
            type: AUTH_USER_LOGIN_SUCCESS,
            payload: res.data
        })
        
    localStorage.setItem('authUserInfo', body)
    } catch(error){
        dispatch({
            type: AUTH_USER_LOGIN_FAIL,
            payload:error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}

export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem('access')){
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }

        const body = JSON.stringify({ token: localStorage.getItem('access')})

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config)
            if (res.data.code !== 'token_not_valid') {

            } else {
                dispatch({
                    type: USER_AUTHENTICATED_SUCCESS
                    })                
            }
        } catch(err) {
            dispatch({
            type: USER_AUTHENTICATED_FAIL
            })
        }

    } else {
        dispatch ({
            type: USER_AUTHENTICATED_FAIL
        })
    }
}



//might not need this becaue making same api call as regular user details?
export const getAuthUserDetails = (id) => async (dispatch, getState) => {
    try{
        dispatch({
            type: AUTH_USER_DETAILS_REQUEST
        })
        const accessToken = localStorage.getItem('access')
        console.log(43, accessToken)
        
        const {
            authLogin: { authUserInfo },
         } = getState()
         
        const config = {
            headers:{
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }

        const { data } = await axios.get(
            `/api/users/${id}/`,
            config
            )
        localStorage.setItem(authUserInfo, JSON.stringify(data))
        dispatch({
            type: AUTH_USER_DETAILS_SUCCESS,
            payload:data
        })



    } catch(error) {
        dispatch({
            type: AUTH_USER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message, 
        })
    }
}







export const reset_password = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email })

    try{
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config)

        dispatch({
            type: PASSWORD_RESET_SUCCESS
        })

    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_FAIL
        })

    }
}

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ uid, token, new_password, re_new_password })
    try{
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config)
        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS
        })
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        })
    }
}

/*
the log out is coming from useractions but i lost my user profile once i got rid of this? Doesnt make sense, need to look into 
*/
export const authLogout = () => dispatch => {
    localStorage.removeItem('authUserInfo')
        dispatch({ type: AUTH_USER_LOGOUT })
        dispatch({ type: AUTH_USER_DETAILS_RESET })
   
}


