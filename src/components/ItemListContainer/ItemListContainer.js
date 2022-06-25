import { useState, useEffect } from 'react'
import ItemList from '../ItemList/ItemList'
import { useParams } from 'react-router-dom'

import { getDocs, collection, query, where } from 'firebase/firestore'
import { db } from '../../services/firebase'

const ItemListContainer = (props) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [title, setTitle] = useState('Bienvenido')
    const { categoryId } = useParams()


    useEffect(() => {
        setLoading(true)

        const collectionRef = categoryId ? ( 
            query(collection(db, 'products'), where('category', '==', categoryId))
        ) : ( collection(db, 'products') )

        getDocs(collectionRef).then(response => {
            const productsFormatted = response.docs.map(doc => {
                return { id: doc.id, ...doc.data() }
            })
            setProducts(productsFormatted)
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            setLoading(false)
        })
        
    }, [categoryId])

    useEffect(() => {
        setTimeout(() => {
            setTitle('Nuestros productos')
        }, 3000)
    }, [])

    if(loading) {
        return <h1>Cargando...</h1>
    }

    return(
        <div>
            <h1>{title}</h1>
            {products.length > 0 
                ? <ItemList products={products}/>
                : <h1>No hay productos</h1>
            }
        </div>
    )
}

export default ItemListContainer