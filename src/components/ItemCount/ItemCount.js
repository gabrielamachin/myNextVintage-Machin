import './ItemCount.css'
import { useState } from 'react'

const ItemCount = ({stock = 0, initial = 1, onAdd})=> {
   const [quantity, setQuantity] = useState(initial)

   const increment = () => {
       if(quantity < stock) {
           setQuantity(quantity+1)
       }
   }

   const decrement = () => {
       if(quantity > 1) {
           setQuantity(quantity - 1)
       }     
   }

   return(
       <div className='row'>          
            <div className='col align-self-center'>
                <button className='btn btn-secondary' onClick={decrement}>-</button>
                <h4>{quantity}</h4>
                <button className='btn btn-secondary' onClick={increment}>+</button>
            </div>
            <div className='pt-2'>
                <button className='btn btn-secondary' onClick={() => onAdd(quantity)}>Agregar al carrito</button>
            </div>
       </div>
   )

}
export default ItemCount