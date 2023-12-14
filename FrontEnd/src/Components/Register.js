import React from 'react'
import axios from 'axios'
import { baseUrl } from '../constants'
import { useNavigate, useNavigation } from 'react-router-dom'

export default function Login() {
    const navigate = useNavigate()
    async function onSubmit(event){
        event.preventDefault()
        let username = event.target.username.value
        let password = event.target.password.value
        let firstName = event.target.firstName.value
        let lastName = event.target.lastName.value
        let response = await axios({
            method: 'post',
            url: baseUrl + '/api/register',
            data: {
                username, password, firstName, lastName
            }
        })
        console.log(response.data)
        if(response.data.success){
            alert('Successfully created!')
            navigate('/login')
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
        <h3>Register</h3>
        <input type='text'  placeholder='Username' name='username'/>
        <input type='password'  placeholder='Password' name='password'/>
        <input type='text'  placeholder='FirST Name' name='firstName'/>
        <input type='text'  placeholder='Last Name' name='lastName'/>
        <input type='submit' value={'Register'}/>
    </form>
  )
}