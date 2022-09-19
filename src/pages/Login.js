import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'

export default function Login() {

    const [userEmail, setUserEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()


    const handleUserEmailChange = (event) => {
        setUserEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let params = new FormData()
        params.append('user_email', userEmail)
        params.append('password', password)
        let config = {
            method: 'post',
            headers: { 'Content-Type': 'multipart/form-data' }
        }
        axios.post('http://127.0.0.1:3007/user/login', params, config).then((res) => {
            if(res.data.status === 0){
                localStorage.setItem("token",res.data.token)
                navigate('/authenticated')
            }
            else{
                alert(res.data.message)
            }
        }).catch((err)=>{
            alert(err)
            console.log(err)
        })
    }

    const handleClick = () => {
        navigate('/create_user')
    }

    return (
        <div className='loginWrapper'>
            <form className='divForm' onSubmit={handleSubmit}>
                <label>
                    email :
                    <input type="text" required value={userEmail} onChange={handleUserEmailChange} />
                </label>
                <label>
                    Password :
                    <input type="password" required value={password} onChange={handlePasswordChange} />
                </label>
                <input className='clickButton' type="submit" value="Login" />
                <button className='clickButton' onClick={handleClick}>Go to create user</button>
            </form>
        </div>
    )
}
