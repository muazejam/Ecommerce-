import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { baseUrl } from '../constants'
import axios from 'axios'
import {appContext} from '../App'


export default function Login() {
    const [error, setError] = useState(false)
    const token = localStorage.getItem('shiromeda')
    const navigate = useNavigate()
    async function onSubmit(event){
        event.preventDefault()
        let name = event.target.name.value
        let price = event.target.price.value
        let image = event.target.image.files[0]
        let formdata = new FormData()
        formdata.append('name', name)
        formdata.append('price', price)
        formdata.append('product_image', image)
        let response = await fetch(baseUrl + '/api/add-product', {
            body: formdata,
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        response = await response.json()
        if(response.success){
            navigate('/my-products')
        } else {
            // setError(true)
            
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
        <h3>Add Product</h3>
        {error && <p>Incorrect username or password</p> }
        <input type='text' placeholder='Name' name='name'/>
        <input type='number'  placeholder='Price' name='price'/>
        <input type='file' name='image'/>
        <input type='submit' value={'Add Product'}/>
    </form>
  )
}