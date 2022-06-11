import { Link } from 'react-router-dom'

const Item = ({ name, img, id }) => {
    return (
        <li>
            <img src={img} alt={name}/>
            {name}
            <Link to={`/detail/${id}`}>Ver detalle</Link>
        </li>
    )
}

export default Item