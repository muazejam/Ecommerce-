import React from 'react'
import { Link } from 'react-router-dom'

export default function Profile() {
  return (
  <>
    <div>This is my profile page</div>
    <Link to='/home'>Go to home</Link>
  </>
  )
}
