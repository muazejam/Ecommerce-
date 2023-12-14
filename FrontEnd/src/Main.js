import google from './google.png'
import { useContext } from 'react'
import { homeContext } from './App'
import bag from './bag.png'
import airpod from './airpod.png'
import bottle from './bottle.png'
import { appContext } from './App'

function Main({  }){
    const {data, setData} = useContext(appContext)
    let users = [
        {
            firstName: 'ded',
            profile: bag,
            lastName: 'de',
            age: 23
        }
    ]
    let products = [
        {
            price: 300,
            image: bag
        },
        {
            price: 500,
            image: airpod
        },
    ]

    const addToCart = (item) => {
        setData([...data, item])
    }   

    function each(product){
        return (
            <dir class="card">
                <img src={product.image} alt="" />
                <div class="card-bottom">
                    <p>{product.price} Birr</p>
                    <button onClick={addToCart} class="btn">Add To Cart</button>
                </div>
            </dir>
        )
    }

    return (
        <div class="products">
        { products.map(each)}
    </div>
    )
}

export default Main