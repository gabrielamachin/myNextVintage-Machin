import './NavBar.css'
import { Link } from 'react-router-dom'
import CartWidget from '../CartWidget/CartWidget'

const NavBar = () => {
    return (
        <nav className='navbar navbar-expand-lg bg-light'>
            <div className='container-fluid'>
                <Link className='navbar-brand navbarTitle' to='/'>
                    <h3>My Next Vintage</h3>
                </Link>
                <div className='navbar-nav'>
                    <Link className='nav-link navbarText' to='/category/remeras'>Remeras y camisas</Link>
                    <Link className='nav-link navbarText' to='/category/pantalones'>Pantalones</Link>
                    <Link className='nav-link navbarText' to='/category/abrigos'>Abrigos</Link>
                    <Link className='nav-link navbarText' to='/category/faldas'>Faldas y vestidos</Link>
                    <Link className='nav-link navbarText' to='/category/accesorios'>Accesorios</Link>
                    <Link className='nav-link navbarText' to='/category/liquidacion'>Liquidación</Link>
                    <CartWidget/>
                </div>
            </div> 
        </nav>
    )
}

export default NavBar