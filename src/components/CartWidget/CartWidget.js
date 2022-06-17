import { useContext } from 'react';
import CartContext from '../../context/CartContext';

const CartWidget = () => {

    const { totalQuantity } = useContext(CartContext)

    return(
        <div className="CartWidget">
            <img src="/images/cart.svg" alt='carrito'/>
            { totalQuantity }
        </div>
    );
}

export default CartWidget