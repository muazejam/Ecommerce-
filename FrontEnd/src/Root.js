import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Main from './Main'

export default function Root() {
  return (
    <div style={{display: 'flex', height: '100vh', flexDirection: 'column'}}>
      <Header />
      <Outlet />
      {/* <Main /> */}
      {/* <h1>this is a footer</h1> */}
      <p>copyright 2023</p>
    </div>
  )
}
