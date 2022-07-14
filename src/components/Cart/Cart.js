import './Cart.css'
import { useState, useContext } from "react"
import CartContext from "../../context/CartContext"
import ItemCartList from "../ItemCartList/ItemCartList"
import { useNotification } from "../../notification/Notification"
import { addDoc, collection, writeBatch, getDocs, query, where, documentId } from 'firebase/firestore'
import { db } from '../../services/firebase/index'

const Cart = () => {
    const [loading, setLoading] = useState(false)
    const { cart, totalQuantity, getTotal, clearCart } = useContext(CartContext)
    
    const total = getTotal()

    const setNotification = useNotification()

    const handleCreateOrder = () => {
        setLoading(true)

        const objOrder = {
            buyer: {
                // name: 'Gabriela M',
                // email: 'gabrielam@email.com',
                // phone: '012345',
                // address: 'casa 123',
                // comment: 'comentario 1'
            },
            items: cart,
            total: total
        }

        const batch = writeBatch(db)

        const ids = cart.map(prod => prod.id)

        const outOfStock = []

        const collectionRef = collection(db, 'products')

        getDocs(query(collectionRef, where(documentId(), 'in', ids)))
            .then(response => {
                response.docs.forEach(doc => {
                    const dataDoc = doc.data()

                    const prod = cart.find(prod => prod.id === doc.id)
                    const prodQuantity = prod.quantity

                    if(dataDoc.stock >= prodQuantity) {
                        batch.update(doc.ref, { stock: dataDoc.stock - prodQuantity })
                    } else {
                        outOfStock.push({ id: doc.id, ...dataDoc})
                    }
                })
            }).then(() => {
                if(outOfStock.length === 0) {
                    const collectionRef = collection(db, 'orders')
                    return addDoc(collectionRef, objOrder)
                } else {
                    return Promise.reject({ type: 'out_of_stock', products: outOfStock })
                }
            }).then(({ id }) => {
                batch.commit()
                clearCart()
                setNotification('success',`Su orden se genero correctamente. El id de su orden es: ${id}`)
            }).catch(error => {
                if(error.type === 'out_of_stock') {
                    setNotification('error','Hay productos que no tienen stock')

                } else {
                    console.log(error)
                }
            }).finally(() => {
                setLoading(false)
            })

    }

    if(loading) {
        return <h1 className='fontTitle'>Se está generando su orden...</h1>
    }

    if(totalQuantity === 0) {
        return <h1 className='fontTitle'>No hay productos en el carrito</h1>
    }

    return (
        <div className='containerCart'>
            <h1 className='fontTitle'>Productos en el carrito:</h1>
            <ItemCartList productsAdded={cart}/>
            <h3>Total: ${total}</h3>
            <button className='btn btn-secondary m-2' onClick={() => clearCart()}>Limpiar carrito</button>
            <button className='btn btn-secondary m-2' onClick={handleCreateOrder}>Generar orden</button>
        </div>
    )
}

export default Cart