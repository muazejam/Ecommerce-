import React, {useEffect, useState} from 'react'

export default function Alert() {

  const [loading, setLoading] = useState(false)

    function myFunc(){ 
        console.log('mounted')
      
    }
    // const [isLoading, setIsLoading] = useState(true)
    // useEffect(myFunc, [isLoading])

    useEffect(myFunc, [])
    
    return (
    <div style={{
        border: '1px solid #000000',
        padding: 20,
        width: 'fit-content'
      }}>
        <p>Are you sure?</p>
        <button onClick={() => setLoading(true)}>Ok</button>
      </div>
  )
}
