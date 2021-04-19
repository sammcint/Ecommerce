import axios from 'axios'

import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL
}

from '../constants/orderConstants'

import { CART_CLEAR_ITEMS } from '../constants/cartConstants'

export const createOrder = (order) => async (dispatch, getState) => {
    try{
        dispatch({
            type: ORDER_CREATE_REQUEST
        })


         const accessToken = localStorage.getItem('access')
         console.log(23, accessToken)
         const config = {
             headers:{
                 'Content-type': 'application/json',
                 'Authorization': `Token ${accessToken}`
             }
         }
         const { data } = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/order/add/`,
            config, order
            )
         /*
         const {
            userLogin: { userInfo },
         } = getState()
        console.log(26, accessToken)
        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
        const { data } = await axios.post(
            '/api/order/add/',
            order,
            config
            )
            */
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