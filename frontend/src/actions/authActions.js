import axios from 'axios'
import {

    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL, 


} 
from '../constants/userConstants'

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
