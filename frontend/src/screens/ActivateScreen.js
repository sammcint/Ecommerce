import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { verify } from '../actions/authActions'

function Activate({ match }) {
    
    const [verified] = useState(false)

    const dispatch = useDispatch()



    const verify_account = (e) => {
        const uid = match.params.uid
        const token = match.params.token

        dispatch(verify(uid, token))
        verified(true)
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
            </div>
        </div>
    )
}

export default Activate
