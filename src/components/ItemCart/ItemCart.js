import './ItemCart.css'
import { useContext } from 'react'
import CartContext from '../../context/CartContext'

const ItemCart = ({ id, name, quantity, price }) => {
    const { removeItem } = useContext(CartContext)

    const handleRemove = (id) => {
        removeItem(id)
    }

    return (
        <article>
            <header>
                <h2 className='itemTitle'>
                    {name}
                </h2>
            </header>
            <section>
                <p>
                    Cantidad: {quantity}
                </p>
                <p>
                    Precio unitario: ${price}
                </p>
            </section>           
            <footer>
                 <p>
                     Subtotal: ${price * quantity}
                 </p>
                 <button className='btn btn-secondary' onClick={() => handleRemove(id)}>X</button>
            </footer>
        </article>
    )
}

export default ItemCart