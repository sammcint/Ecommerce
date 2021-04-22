import axios from 'axios'

import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,

    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
}

from '../constants/orderConstants'

import { CART_CLEAR_ITEMS } from '../constants/cartConstants'

export const createOrder = (order) => async (dispatch, getState) => {
    try{
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

         console.log(35, order)
         const accessToken = localStorage.getItem('access')
         console.log(23, accessToken)
         const config = {
             headers:{
                 'Content-type': 'application/json',
                 'Authorization': `Token ${accessToken}`
             }
         }
         const { data } = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/orders/add/`,
            order, config
            )

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload:data
        })

        dispatch({
            type: CART_CLEAR_ITEMS,
            payload:data
        })

        localStorage.removeItem('cartItems')

    } catch(error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message, 
        })
    }
}


export const getOrderDetails = (id) => async (dispatch, getState) => {
    try{
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })


         const accessToken = localStorage.getItem('access')
         console.log(23, accessToken)
         const config = {
             headers:{
                 'Content-type': 'application/json',
                 'Authorization': `Token ${accessToken}`
             }
         }
         const { data } = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/orders/${id}/`,
            config,
            )

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload:data
        })



    } catch(error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message, 
        })
    }
}