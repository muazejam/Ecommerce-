import React, { useContext } from 'react'
import { appContext } from '../App'

export default function Checkout() {
    const {cart} = useContext(appContext)
    let sum = cart.reduce((ac, pr) => ac + pr.price, 0)
  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }}>
    <div>Checkout</div>
    <p>Total: {sum}</p>
    <button>Pay</button>
    </div>
  )
}
