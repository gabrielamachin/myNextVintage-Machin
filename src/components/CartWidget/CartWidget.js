import './CartWidget.css'
import { useContext } from 'react';
import CartContext from '../../context/CartContext';
import { useNavigate } from 'react-router-dom'

const CartWidget = () => {

    const { totalQuantity } = useContext(CartContext)

    const navigate = useNavigate()

    return(
        <div className="CartWidget" onClick={() => navigate('/cart')}>
            <img src="/images/cart.svg" alt='cart' className='CartImg'/>
            { totalQuantity }
        </div>
    );
}

export default CartWidget