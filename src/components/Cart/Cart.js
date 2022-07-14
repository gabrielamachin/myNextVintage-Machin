import './Cart.css'
import { useContext } from "react"
import CartContext from "../../context/CartContext"
import ItemCartList from "../ItemCartList/ItemCartList"
import { Link } from 'react-router-dom'

const Cart = () => {
    const { cart, totalQuantity, getTotal, clearCart } = useContext(CartContext)
    
    const total = getTotal()

    if(totalQuantity === 0) {
        return <h1 className='fontTitle'>No hay productos en el carrito</h1>
    }

    return (
        <div className='containerCart'>
            <h1 className='fontTitle'>Productos en el carrito:</h1>
            <ItemCartList productsAdded={cart}/>
            <h3>Total: ${total}</h3>
            <button className='btn btn-secondary m-2' onClick={() => clearCart()}>Limpiar carrito</button>
            <Link className='btn btn-secondary' to='/checkout'>Generar orden</Link>
        </div>
    )
}

export default Cart