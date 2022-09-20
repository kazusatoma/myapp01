import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Authenticated.css'
import api from '../utils/api'
import { base_url } from '../config'

export default function Authenticated() {

  const [userinfo, setUserInfo] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    let config = {
      method: 'get',
      headers: { "Authorization": localStorage.getItem("token") }
    }
    api.get('/my/userinfo', config).then((res) => {
      setUserInfo(res.data)
    }).catch((err)=>{
      alert(err)
    })
    console.log(base_url +'/' + userinfo.avatar)
  }, [])

  const handleClick = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <Fragment>
      {userinfo.avatar ? <div className='wrapper'>
        <h1>Welcome!{userinfo.username}<button onClick={handleClick}>log out</button></h1>
        <img alt='user' src={`${base_url + '/' + userinfo.avatar}`} />
      </div> : <h1>401</h1>}
    </Fragment>
  )
}