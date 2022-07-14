import Item from '../Item/Item'
import { memo } from 'react'

const ItemList = ({ products }) => {
    return(
        <div className="container pt-3">
            <div className="row">
            {products.map(prod => <Item key={prod.id} {...prod} />)}
            </div>
            </div>
    )
}

export default memo (ItemList)