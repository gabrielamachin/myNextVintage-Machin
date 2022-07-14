import './Checkout.css'
// import { useState } from "react"
// import CartContext from "../../context/CartContext"
// import { useNotification } from "../../notification/Notification"
// import { addDoc, collection, writeBatch, getDocs, query, where, documentId } from 'firebase/firestore'
// import { db } from '../../services/firebase/index'

const Checkout = () => {
    // const [loading, setLoading] = useState(false)
    // const { cart, totalQuantity, getTotal, clearCart } = useContext(CartContext)
    // const total = getTotal()
    // const setNotification = useNotification()

    // const handleCreateOrder = () => {
    //     setLoading(true)
    
    //     const objOrder = {
    //         buyer: {
    //             name: 'Gabriela M',
    //             email: 'gabrielam@email.com',
    //             phone: '012345',
    //             address: 'casa 123',
    //             comment: 'comentario 1'
    //         },
    //         items: cart,
    //         total: total
    //     }
    
    //     const batch = writeBatch(db)
    
    //     const ids = cart.map(prod => prod.id)
    
    //     const outOfStock = []
    
    //     const collectionRef = collection(db, 'products')
    
    //     getDocs(query(collectionRef, where(documentId(), 'in', ids)))
    //         .then(response => {
    //             response.docs.forEach(doc => {
    //                 const dataDoc = doc.data()
    
    //                 const prod = cart.find(prod => prod.id === doc.id)
    //                 const prodQuantity = prod.quantity
    
    //                 if(dataDoc.stock >= prodQuantity) {
    //                     batch.update(doc.ref, { stock: dataDoc.stock - prodQuantity })
    //                 } else {
    //                     outOfStock.push({ id: doc.id, ...dataDoc})
    //                 }
    //             })
    //         }).then(() => {
    //             if(outOfStock.length === 0) {
    //                 const collectionRef = collection(db, 'orders')
    //                 return addDoc(collectionRef, objOrder)
    //             } else {
    //                 return Promise.reject({ type: 'out_of_stock', products: outOfStock })
    //             }
    //         }).then(({ id }) => {
    //             batch.commit()
    //             clearCart()
    //             setNotification('success',`Su orden se genero correctamente. El id de su orden es: ${id}`)
    //         }).catch(error => {
    //             if(error.type === 'out_of_stock') {
    //                 setNotification('error','Hay productos que no tienen stock')
    
    //             } else {
    //                 console.log(error)
    //             }
    //         }).finally(() => {
    //             setLoading(false)
    //         })
    
    // }
    
    // if(loading) {
    //     return <h1 className='fontTitle'>Se está generando su orden...</h1>
    // }
    
    // if(totalQuantity === 0) {
    //     return <h1 className='fontTitle'>No hay productos en el carrito</h1>
    // }

    return (
        <div className="container mt-5">
          <div className="div text-center my-5">
            <h1 className="display-2 texto__cursiva--color">Contacto</h1>
          </div>
          <form action="" className="row g-3">
            <div className="col-md-6">
              <label for="nombre" className="form-label formTextColor">Nombre:</label>
              <input type="text" className="form-control" id="nombre" placeholder="Ingresa tu nombre" />
            </div>
            <div className="col-md-6">
              <label for="apellido" className="form-label formTextColor">Apellido:</label>
              <input type="text" className="form-control" id="apellido" placeholder="Ingresa tu apellido" />
            </div>
            <div className="col-md-8">
              <label for="email" className="form-label formTextColor">Email:</label>
              <input type="text" className="form-control" id="email" placeholder="alguien@ejemplo.com" />
            </div>
            <div className="col-md-4">
              <label for="telefono" className="form-label formTextColor">Número de teléfono:</label>
              <input type="text" className="form-control" id="telefono" placeholder="+54 11 123456" />
            </div>
            <div className="col-md-12">
              <label for="consulta" className="form-label formTextColor">Tu comentario o consulta:</label>
              <textarea className="form-control" id="consulta" rows="3"></textarea>
            </div>
            <div className="col-md-12">
              <input type="submit" className="btn btn-secondary" value="Enviar" />
            </div>
          </form>
        </div>
    )
}

export default Checkout


