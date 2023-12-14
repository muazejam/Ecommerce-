import google from './google.png'
import { appContext, homeContext } from './App'
import { useContext } from 'react'
import logo from './shopping-logo.png'
import Button from './Button'

import { Link, useNavigate } from 'react-router-dom'

function Header(){
    const {token, setToken, cart} = useContext(appContext)
    const navigate= useNavigate()

    // const {data} = useContext(appContext)
    
    return (
        <header>
        <Link to='/'>
            <img src={logo} alt="" /></Link>        
        <div>
            <div class="cart">
                <i class="fa fa-cart-plus">{cart.length}</i>
                <div>
                    
                </div>
            </div>
            <Link to='/checkout'>Checkout</Link>
            { token ?  (
                <>
                <button onClick={() => {
                    localStorage.removeItem('shiromeda')
                    setToken(null)
                    navigate('/login')
                }}>Logout</button>
                <Link to='/add-product'>Add Product</Link>
                <Link to='/my-products'>My Products</Link>
                </>
            ) : (
                <>
                    <Link to='/login'>Login</Link>
                    <Link to='/register'>Register</Link>
                </>
            )
            }
            
        </div>
    </header>
    )
}


export default Header