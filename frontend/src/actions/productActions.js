import axios from 'axios'
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL
} from '../constants/productConstants'

export const listProducts = () => async (dispatch, getState) => {
    try{
        dispatch({ type: PRODUCT_LIST_REQUEST })
        console.log("=========")

        
        const accessToken = localStorage.getItem('access')
        console.log(23, accessToken)
        const config = {
            headers:{
                'Content-type': 'application/json',
                'Authorization': `Token ${accessToken}`
            }
        }
        console.log(26, accessToken)

        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/` , config)


        dispatch({
            type:PRODUCT_LIST_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type:PRODUCT_LIST_FAIL,
            payload:error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}
export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        const accessToken = localStorage.getItem('access')
        console.log(23, accessToken)
        const config = {
            headers:{
                'Content-type': 'application/json',
                'Authorization': `Token ${accessToken}`
            }
        }
        console.log(26, accessToken)
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/${id}/`, config)

        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}