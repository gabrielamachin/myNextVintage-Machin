import './ItemDetail.css'
import { useState, useContext } from 'react'
import ItemCount from '../ItemCount/ItemCount'
import CartContext from '../../context/CartContext'
import { Link } from 'react-router-dom'
import { useNotification } from '../../notification/Notification'

const ItemDetail = ({ id, name, img, category, description, price, stock }) => {
    const [quantityAdded, setQuantityAdded] = useState(0)

    const { addItem } = useContext(CartContext)

    const setNotification = useNotification()

    const handleOnAdd = (quantity) => {
        setNotification('success',`Se agregó al carrito ${quantity} ${name}`)
        addItem({ id, name, price, quantity})
        setQuantityAdded(quantity)
    }

    return (
        <div className='card cardSize'>
            <img src={img} className='card-img-top detailImg' alt='producto' />
            <div className='card-body'>
                <h5 className='card-title text-center pt-4 pb-2 textColor'>{name}</h5>
                <p className='card-text'>Categoría: {category}</p>
                <p className='card-text'>Descripción: {description}</p>
                <p className='card-text'>Precio: ${price}</p>
                { quantityAdded === 0 
                    ?  <ItemCount stock={stock} onAdd={handleOnAdd} />
                    :  <Link className='btn btn-secondary' to='/cart'>Terminar compra</Link>
                }
            </div>
        </div>
    )
}

export default ItemDetail