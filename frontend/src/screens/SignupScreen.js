import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
//import { login } from '../actions/userActions'
import { signup } from '../actions/authActions'

function SignupScreen({location, history}) {
    const [accountCreated, setAccountCreated] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [re_password, setRe_password] = useState('')


    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userSignup = useSelector(state => state.userSignup)
    const { error, loading, userInfo } = userSignup

    useEffect(() => {
        if (userInfo){
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password === re_password) {
            dispatch(signup(name, email, password, re_password))
            setAccountCreated(true)
            accountCreated(true)
        }

    }

  
    return (
        <FormContainer>
            <h1>Sign Up</h1>
            <p>Create Your Account</p>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Email*'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='re_password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='re_password'
                        placeholder='Enter Password'
                        value={re_password}
                        onChange={(e) => setRe_password(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Register
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                Already have an account? <Link 
                    to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                    Register
                    </Link>
                </Col>

            </Row>


        </FormContainer>
    )
}

export default SignupScreen
