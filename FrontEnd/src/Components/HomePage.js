import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { baseUrl } from '../constants'
import { appContext } from '../App'

export default function MyProducts() {
    const [products, setProducts] = useState([])
    const {cart, setCart} = useContext(appContext)
    useEffect(() => {
        axios({
            method: 'get',
            url: baseUrl + '/api/products',

        }).then(response => {
            if(response.data.success){
                setProducts(response.data.products)
            }
        })
    }, [])
  return (
    <div style={{display: 'flex', gap: 20, flex: 1}}>
        {products.length == 0 && <p>You have no products yet!</p>}
       {products.map(product => (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap :10,
            border: '1px solid black',
            borderRadius: 5,
            padding: 10,
            alignSelf: 'start'
        }}>
            <img src={baseUrl + product.image} alt='' style={{
                width: 150,
                height: 150,
                objectFit: 'cover'
            }} />
            <p>{product.name}</p>
            <p>ETB {product.price}</p>
            <button onClick={() => {
                if(cart.filter(p => p.id == product.id).length > 0){
                    setCart(cart.filter(p => p.id != product.id))
                } else setCart([...cart, product])
            }}>{cart.filter(p => p.id == product.id).length > 0 ? 'Remove from cart' : 'Add To Cart'}</button>
        </div>
       ))} 
    </div>
  )
}
