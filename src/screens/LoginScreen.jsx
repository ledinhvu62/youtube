import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { login } from '../redux/auth/authSlice'

const LoginScreen = () => {
    const accessToken = useSelector(state => state.auth.accessToken)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (accessToken) {
            navigate('/')
        }
    }, [accessToken, navigate])

    const handleLogin = () => {
        dispatch(login())
    }

    return (
        <div className="h-screen grid place-items-center">
            <div className="p-8 my-0 mx-4 rounded-lg flex flex-col items-center border-2">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/YouTube_Logo_%282013-2017%29.svg/2560px-YouTube_Logo_%282013-2017%29.svg.png"
                    alt="logo"
                    className="w-32 h-32 object-contain"
                />
                <button
                    className="p-2 border-none bg-black text-white rounded-md mb-4 focus:outline-none"
                    onClick={handleLogin}
                >
                    Login with Google
                </button>
                <p>This project is made using Youtube Data API</p>
            </div>
        </div>
    )
}

export default LoginScreen