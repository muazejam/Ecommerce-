import React, { useState } from 'react'
import airdpod from './airpod.png'

function UnorderedList(props) {
    const [state, setState] = useState('')

    function keyup(event){
        setState(event.target.value)
    }

  return (
    <>
       <p>{state}</p>
       <input onChange={keyup}/>
       <ol>
       </ol>
    </>
  )
}


export default UnorderedList