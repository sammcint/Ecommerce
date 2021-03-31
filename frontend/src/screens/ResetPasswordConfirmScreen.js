import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { reset_password_confirm } from '../actions/authActions'
import { Redirect } from 'react-router-dom'

//import  views  from 'django.contrib.auth' 

function ResetPasswordConfirm({ location, history, match, }) {
//function ResetPassword({reset_password}) {
    const [requestSent, setRequestSent] = useState(false)

    const [new_password, setPassword1 ] = useState('')

    const [re_new_password, setPassword2 ] = useState('')
    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    useEffect(() => {
        if (userInfo){
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        const uid = match.params.uid
        const token = match.params.token

        dispatch(reset_password_confirm(uid, token, new_password, re_new_password))
        setRequestSent(true)
    }

    useEffect(() => {
        //if (userInfo){
        if (requestSent){
            return <Redirect to='/' />
        }
    //}, [history, userInfo, redirect])
    }, [history, requestSent, redirect])

    if (requestSent) {
        return <Redirect to='/' />
    }
    return (
        <FormContainer>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
            <Form.Group controlId='new_password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        name='new_password'
                        placeholder='New Password'
                        value={new_password}
                        onChange={(e) =>  setPassword1(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='re_new_password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        name='re_new_password'
                        placeholder='Confirm New Password'
                        value={re_new_password}
                        onChange={(e) => setPassword2(e.target.value)}
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

export default ResetPasswordConfirm