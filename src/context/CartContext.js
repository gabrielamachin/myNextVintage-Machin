import { useState, createContext, useEffect, useRef } from "react";

const CartContext = createContext()

export const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    console.log(cart)
    const countRenderRef = useRef(0)

    // useEffect(() => {
    //     const cartSaved = localStorage.getItem('cart')
    //     const cartSavedParsed = JSON.parse(cartSaved)
    //     setCart(cartSavedParsed)
    // }, [])

    // useEffect(() => {
    //     if(countRenderRef.current > 0) {
    //         localStorage.setItem('cart', JSON.stringify(cart))
    //     }
    //     countRenderRef.current += 1
    // }, [cart])
    
    const addItem = (productToAdd) => {

        if(!isInCart(productToAdd.id)) {
            setCart([...cart, productToAdd])
        } else {
            const cartUpdated = cart.map(prod => {
                if(prod.id === productToAdd.id) {
                    const newProduct = {
                        ...prod,
                        quantity: productToAdd.quantity
                    }
                    return newProduct
                } else {
                   return prod 
                }
            })
            setCart(cartUpdated)
        }
    }
    
    const getQuantity = () => {
        let accu = 0
        cart.forEach(prod => {
          accu += prod.quantity
        })
    
        return accu
    }

    const isInCart = (id) => {
        return cart.some(prod => prod.id === id)
    }

    const getProduct = (id) => {
        return cart.find(prod => prod.id === id)
    }

    const removeItem = (id) => {
        const newCart = cart.filter(prod => prod.id !== id)
        setCart(newCart)
    }

    const getTotal = () => {
        let total = 0
        cart.forEach(prod => {
            total += prod.quantity * prod.price
        })
        
        return total
    }

    const clearCart = () => {
        setCart([])
    }

    return(
        <CartContext.Provider value={{ cart, addItem, getQuantity, getProduct, removeItem, getTotal, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext