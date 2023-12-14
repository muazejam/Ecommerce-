import React from 'react'
import List from './List'
import { useContext } from 'react'
import { appContext } from './App'

export default function TodoList() {
    const { data } = useContext(appContext)
    console.log(data)

    function each(item){
        return <List item={item} />
    }
    return (
        <ul>
            {data.map(each)}
        </ul>
    )
}
