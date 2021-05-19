import axios from 'axios'
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL, 
    USER_DETAILS_RESET,

    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL, 

    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL, 
    USER_LIST_RESET,

    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,

    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL, 

} from '../constants/userConstants'

import { ORDER_LIST_MY_RESET } from '../constants/orderConstants'


export const login = (email, password) => async (dispatch) => {
    try{
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers:{
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        }

        const { data } = await axios.post(
            (`${process.env.REACT_APP_API_URL}/api/users/login/`),
            { 'email':email, 'password': password },
            config
            )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload:data
        })
        
        localStorage.setItem('userInfo', JSON.stringify(data))


    } catch(error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message, 
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_DETAILS_RESET })
    dispatch({ type: ORDER_LIST_MY_RESET })
    dispatch({ type: USER_LIST_RESET })
}

export const register = (name, email, password) => async (dispatch) => {
    try{
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers:{
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/api/users/register/',
            {'name': name, 'email':email, 'password': password },
            config
            )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload:data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload:data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))


    } catch(error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message, 
        })
    }
}



export const getUserDetails = (id) => async (dispatch, getState) => {
    try{
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        const accessToken = localStorage.getItem('access')
        console.log(30, accessToken)
        const config = {
            headers:{
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }
        console.log(35, accessToken)

        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${id}/`,
            config
            )
        localStorage.setItem('userInfo', JSON.stringify(data))
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


//this isn't working, wrong token type. 
export const updateUserProfile = (user) => async (dispatch, getState) => {
    console.log(80, user)
    try{
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })
        //think i need to change this to ge the same as the products action call 
        const {
            userLogin: { userInfo },
         } = getState()
        const accessToken = localStorage.getItem('access')
        console.log(79, accessToken)
        const config = {
            headers:{
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }

        const { data } = await axios.put(
            `${process.env.REACT_APP_API_URL}/api/users/profile/update/`,
            user,
            config
            )

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload:data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload:data
        })        

        localStorage.setItem(userInfo, JSON.stringify(data))

    } catch(error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message, 
        })
    }
}

export const deleteUser = (id) => async (dispatch, getState) => {
    try{
        dispatch({
            type: USER_DELETE_REQUEST
        })

        //Might not need these lines of code 208-210 here, or anywhere else asking for credentials
        const {
            userLogin: { userInfo },
         } = getState()

         const accessToken = localStorage.getItem('access')
         

         const config = {
             headers:{
                 'Content-type': 'application/json',
                 'Authorization': `Bearer ${accessToken}`
             }
         }

        const { data } = await axios.delete(
            `${process.env.REACT_APP_API_URL}/api/users/delete/${id}/`,
            config
            )

        dispatch({
            type: USER_DELETE_SUCCESS,
            payload:data
        })

    } catch(error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message, 
        })
    }
}

export const listUsers = () => async (dispatch, getState) => {
    try{
        dispatch({
            type: USER_LIST_REQUEST
        })

        //Might not need these lines of code 208-210 here, or anywhere else asking for credentials
        const {
            userLogin: { userInfo },
         } = getState()

         const accessToken = localStorage.getItem('access')
         console.log(30, accessToken)
         const config = {
             headers:{
                 'Content-type': 'application/json',
                 'Authorization': `Bearer ${accessToken}`
             }
         }

        const { data } = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/users/`,
            config
            )

        dispatch({
            type: USER_LIST_SUCCESS,
            payload:data
        })

    } catch(error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message, 
        })
    }
}

export const updateUser = (user) => async (dispatch, getState) => {
    try{
        dispatch({
            type: USER_UPDATE_REQUEST
        })

        //Might not need these lines of code 208-210 here, or anywhere else asking for credentials
        const {
            userLogin: { userInfo },
         } = getState()

         const accessToken = localStorage.getItem('access')

         const config = {
             headers:{
                 'Content-type': 'application/json',
                 'Authorization': `Bearer ${accessToken}`
             }
         }

        const { data } = await axios.put(
            `${process.env.REACT_APP_API_URL}/api/users/update/${user._id}/`,
            user,
            config
            )

        dispatch({
            type: USER_UPDATE_SUCCESS,
        })

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message, 
        })
    }
}