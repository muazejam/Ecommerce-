import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { baseUrl } from '../constants'
import axios from 'axios'
import {appContext} from '../App'

export default function Login() {
    const [error, setError] = useState(false)
    const {setToken} = useContext(appContext)
    const navigate = useNavigate()
    async function onSubmit(event){
        event.preventDefault()
        let username = event.target.username.value
        let password = event.target.password.value
        let response = await axios({
            method: 'post',
            url: baseUrl + '/api/login',
            data: {
                username, password
            }
        })
        console.log(response.data)
        if(response.data.success){
            localStorage.setItem('shiromeda', response.data.token)
            setToken(response.data.token)
            navigate('/my-products')
        } else {
            setError(true)
            
        }
    }
  return (
    <form onSubmit={onSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 30,
        borderRadius: 10,
        backgroundColor: 'grey',
        gap: 15,
        alignItems: 'center'
    }}>
        <h3>Login</h3>
        {error && <p>Incorrect username or password</p> }
        <input type='text'  placeholder='Username' name='username'/>
        <input type='password'  placeholder='Password' name='password'/>
        <input type='submit' value={'Login'}/>
    </form>
  )
}