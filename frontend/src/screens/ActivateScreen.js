import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { verify } from '../actions/authActions'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom';
function Activate({ match }) {
    
   // const [verified] = useState('')

    const dispatch = useDispatch()

    const [verified, setVerified] = useState(false)

    const verify_account = (e) => {
        const uid = match.params.uid
        const token = match.params.token

        dispatch(verify(uid, token))
        console.log("verified success")
        setVerified(true)
    }
    if (verified) {
        return <Redirect to='/' />
    }
    return (
        <div className='container'>
            <div 
                className='d-flex flex-column justify-content-center align-items-center'
                style={{ marginTop: '200px' }}
            >
                <h1>Verify Your Account</h1>
                <button
                    onClick={verify_account}
                    style={{ marginTop: '50px' }}
                    type='button'
                    className='btn btn-primary'                
                > 
                    Verify
                </button>
                <Link 
                    to= ''>

                    </Link>
            </div>
        </div>
    )
}

export default Activate
