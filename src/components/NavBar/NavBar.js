import { Link } from 'react-router-dom'
import CartWidget from '../CartWidget/CartWidget'

const NavBar = () => {
    return (
        <nav>
            <Link to='/'>
                <h3>My Next Vintage</h3>
            </Link>
            <Link to='/category/remeras'>Remeras y camisas</Link>
            <Link to='/category/pantalones'>Pantalones</Link>
            <Link to='/category/abrigos'>Abrigos</Link>
            <Link to='/category/faldas'>Faldas y vestidos</Link>
            <Link to='/category/accesorios'>Accesorios</Link>
            <Link to='/category/liquidacion'>Liquidación</Link>
            <CartWidget/>
        </nav>
    )
}

export default NavBar