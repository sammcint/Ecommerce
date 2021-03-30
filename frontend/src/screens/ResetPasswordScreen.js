import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { reset_password } from '../actions/authActions'
import { Redirect } from 'react-router-dom'

//import  views  from 'django.contrib.auth' 

function ResetPassword({  location, history }) {
//function ResetPassword({reset_password}) {
    
    const [requestSent, setRequestSent] = useState(false)
    const [email, setEmail] = useState('')


    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin



    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(reset_password(email))
       // reset_password(email)
        setRequestSent(true)
    }

    useEffect(() => {
        //if (userInfo){
        if (requestSent){
            return <Redirect to='/' />
            //history.push('/reset_password_confirm')
        }
    //}, [history, userInfo, redirect])
    }, [history, requestSent, redirect])

    return (
        <FormContainer>
            <h1>Password Reset</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}

                    >
                    </Form.Control>
                </Form.Group>


                <Button type='submit' variant='primary'>
                    Reset Password
                </Button>
            </Form>
        </FormContainer>
    )
}

export default ResetPassword
