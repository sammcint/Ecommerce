import axios from 'axios'
import {

    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL, 

    USER_AUTHENTICATED_SUCCESS,
    USER_AUTHENTICATED_FAIL,

    USER_LOGOUT
} 
from '../constants/userConstants'

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

export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')){
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config)
            dispatch({
                type: USER_DETAILS_SUCCESS,
                payload: res.data
            })
        } catch(err){
            dispatch({
                type: USER_DETAILS_FAIL
            })
        }
    } else {
        dispatch({
            type: USER_DETAILS_FAIL
        })       
    }
}


export const login = (email, password) => async dispatch => {
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password })
    
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config)
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(load_user())
    } catch(err){
        dispatch({
            type: USER_LOGIN_FAIL
        })
    }
}
export const getUserDetails = (id) => async (dispatch, getState) => {
    try{
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        const {
            userLogin: { userInfo },
         } = getState()

        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/users/${id}/`,
            config
            )

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload:data
        })



    } catch(error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message, 
        })
    }
}


export const logout = () => dispatch => {
    dispatch({
        type: USER_LOGOUT
    })
}