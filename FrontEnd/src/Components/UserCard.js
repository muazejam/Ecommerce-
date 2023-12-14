import React from 'react'

export default function UserCard({ employee }) {
  return (
    <div style={{
        border: '1px solid black',
        padding: 15,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <img src={employee.image} alt=''/>
        <p>{employee.firstName + ' ' + employee.lastName}</p>
        <h4>{employee.dateJoined}</h4>
        <h5>ETB 40000</h5>
    </div>
  )
}
