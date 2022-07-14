import './Item.css'
import { Link } from 'react-router-dom'

const Item = ({id, name, img, price}) => {

    return (
        <div className='col-lg-4 col-md-6 col-sm-12'>
            <div className="card mb-5 shadow-sm cardWidth">
                <img src={img} className='card-img-top itemImg' alt="..." />
                <div className='card-body text-center'>
                    <h5 className='card-title colorTitle'>{name}</h5>
                    <p className='card-text'>Precio: ${price}</p>
                    <Link className='btn btn-secondary' to={`/detail/${id}`} >Ver detalle</Link>
                </div>
            </div>
        </div>
    )
}

export default Item