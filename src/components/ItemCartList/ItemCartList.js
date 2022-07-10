import ItemCart from '../ItemCart/ItemCart'

const ItemCartList = ({ productsAdded }) => {
    return (
        <div>
            { productsAdded.map(p => <ItemCart key={p.id} {...p}/>) }
        </div>
    )
}

export default ItemCartList