import './Checkout.css'
import { useState, useContext  } from "react"
import CartContext from "../../context/CartContext"
import { useNotification } from "../../notification/Notification"
import { addDoc, collection, writeBatch, getDocs, query, where, documentId } from 'firebase/firestore'
import { db } from '../../services/firebase/index'

const Checkout = () => {
    const [loading, setLoading] = useState(false)
    const { cart, totalQuantity, getTotal, clearCart } = useContext(CartContext)
    const total = getTotal()
    const setNotification = useNotification()

    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")

    const handleCreateOrder = () => {
        setLoading(true)
    
        const objOrder = {
            buyer: {
                name: name,
                surname: surname,
                email: email,
                phone: phone
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
        <div className="container mt-5">
          <div className="div text-center my-5">
            <h1 className="fontTitle">Checkout</h1>
          </div>
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="nombre" className="form-label formTextColor">Nombre</label>
              <input type="text" className="form-control" id="nombre" placeholder="Ingresa tu nombre" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="col-md-6">
              <label htmlFor="apellido" className="form-label formTextColor">Apellido</label>
              <input type="text" className="form-control" id="apellido" placeholder="Ingresa tu apellido" value={surname} onChange={(e) => setSurname(e.target.value)} required />
            </div>
            <div className="col-md-4">
              <label htmlFor="email" className="form-label formTextColor">Email</label>
              <input type="text" className="form-control" id="email" placeholder="alguien@ejemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="col-md-4">
              <label htmlFor="confirmaEmail" className="form-label formTextColor"> Confirmá tu email</label>
              <input type="text" className="form-control" id="confirmaEmail" placeholder="Confirma tu email" required />
            </div>
            <div className="col-md-4">
              <label htmlFor="telefono" className="form-label formTextColor"> Teléfono</label>
              <input type="text" className="form-control" id="telefono" placeholder="+54 11 123456" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <div className="col-12">
              <button className="btn btn-secondary" type="button" value="Enviar" onClick={handleCreateOrder}>Realizar compra</button>
            </div>
          </div>
        </div>
    )
}

export default Checkout


