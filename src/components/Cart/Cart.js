import { useState, useContext } from "react"
import CartContext from '../../context/CartContext'
import ItemCart from '../ItemCart/ItemCart'
import { addDoc, collection, getDocs, query, where, documentId, writeBatch } from 'firebase/firestore'
import { db } from '../../services/firebase'
import { useNotification } from '../../notification/Notification'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
    const [loading, setLoading] = useState(false)

    const { cart, clearCart, getTotal, getQuantity } = useContext(CartContext)  

    const { setNotification } = useNotification()

    const navigate = useNavigate()

    const createOrder = () => {
        console.log('crear orden')
        setLoading(true)

        const objOrder = {
            buyer: {
                name: 'Gabriela M',
                email: 'gabrielam@email.com',
                phone: '012345',
                address: 'casa 123',
                comment: 'comentario 1'
            },
            items: cart,
            total: getTotal()
        }

        const ids = cart.map(prod => prod.id)

        const batch = writeBatch(db)

        const outOfStock = []

        const collectionRef = collection(db, 'products')

        getDocs(query(collectionRef, where(documentId(), 'in', ids)))
            .then(response => {
                response.docs.forEach(doc => {
                    const dataDoc = doc.data()
                    const prodQuantity = cart.find(prod => prod.id === doc.id)?.quantity

                    if(dataDoc.stock >= prodQuantity) {
                        batch.update(doc.ref, { stock: dataDoc.stock - prodQuantity})
                    } else {
                        outOfStock.push({ id: doc.id, ...dataDoc})
                    }
                })
            }).then(() => {
                if(outOfStock.length === 0) {
                    const collectionRef = collection(db, 'orders')
                    return addDoc(collectionRef, objOrder)
                } else {
                    return Promise.reject({ type: 'out_of_stock', products: outOfStock})
                }
            }).then(({ id }) => {
                batch.commit()
                clearCart()
                setNotification('success',`El id de la orden es: ${id}`)
                navigate('/')
            }).catch(error => {
                console.log(error)
                setNotification('error',`Algunos productos no tienen stock`)
            }).finally(() => {
                setLoading(false)
            })
    }
    
    if(loading) {
        return <h1>Generando orden..</h1>
    }

    if(getQuantity() === 0) {
        return (
            <h1>No hay ítems en el carrito</h1>
        )
    }

    return (     
        <div>
            <h1>Cart</h1>
            { cart.map(p => <ItemCart key={p.id} {...p}/>) }
            <h3>Total: ${getTotal()}</h3>
            <button onClick={() => clearCart()}>Limpiar Carrito</button>
            <button onClick={createOrder}>Generar orden</button>
        </div>
    )
}

export default Cart