// import logo from './logo.svg';
import React, {useState, useRef, useEffect} from 'react';
// import './style1.css'

import './style.css';

import {createContext} from 'react'
import Button from './Button';
import person1 from './assets/images/p1.jpg'
import person2 from './assets/images/p2.jpg'
import person3 from './assets/images/p3.jpg'
import UserCard from './Components/UserCard';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
// import HomePage from './HomePage';
import Root from './Root';
import Login from './Components/Login'
import Register from './Components/Register'
import MyProducts from './Components/MyProducts'
import AddProduct from './Components/AddProduct'
import HomePage from './Components/HomePage'
import Checkout from './Components/Checkout'


// import { response } from 'express';

export const appContext = createContext()


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'my-products',
        element: <MyProducts />
      },
      {
        path: 'add-product',
        element: <AddProduct />
      },
      {
        path: 'checkout',
        element: <Checkout />
      }
    ]
  }
])

function App() {
  // const _todos = ['Go to groceries', 'Pick john']
  const [name, setName] = useState('')
  const [token, setToken] = useState(null)
  const [cart, setCart] = useState([])

  useEffect(() => {
    let _token = localStorage.getItem('shiromeda')
    if(_token){
      setToken(_token)
    }
  }, [])

 
  
   return (
    <appContext.Provider value={{token, setToken, cart, setCart}}>
      <RouterProvider router={router} />
    </appContext.Provider>

  )
}

// component
// jsx
// {/* <h1>Hello {name}</h1> */}

// lifes


export default App;
