import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Login.css'
import api from '../utils/api'

export default function CreateUser() {


    const [userEmail, setUserEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userImg, setUserImg] = useState()
    const navigate = useNavigate()


    const handleUserEmailChange = (event) => {
        setUserEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleFileChange = (event) => {
        let fileSuffix = event.target.files[0].name.split('.')[1]
        if (fileSuffix === 'jpg' | fileSuffix === 'png' | fileSuffix === 'gif' | fileSuffix === 'jpeg') {
            setUserImg(event.target.files[0])
        }
        else {
            setUserImg()
            alert('invalid file')
        }
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        if (userImg) {
            let params = new FormData()
            params.append('user_email', userEmail)
            params.append('password', password)
            params.append('img', userImg)
            let config = {
                method: 'post',
                headers: { 'Content-Type': 'multipart/form-data' }
            }
            api.post('/user/register', params, config).then((res) => {
                alert(res.data.message)
                if(res.data.message === "registered"){
                    navigate('/login')
                }
            }).catch((err) => {
                alert(err)
            })
        }
        else {
            alert("invalid file type")
        }
    }

    const handleClick = () => {
        navigate('/login')
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
                <label>
                <input type="file" required accept="image/gif,image/jpeg,image/jpg,image/png" onChange={handleFileChange}/>
                </label>
                <input className='clickButton' type="submit" value="Create user" />
                <button className='clickButton' onClick={handleClick}>Go to login</button>
            </form>
        </div>
    )
}
