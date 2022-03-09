import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";

export default function AddtoCartBtn({ productID, cart, setCart }) {
    const API = process.env.REACT_APP_API
    const { currentUser } = useContext(UserContext)
    const [qtyInCart, setQtyInCart] = useState(0)
    const [stock, setStock] = useState(0)

    const fetchAPI = async (productID, currentUser) => {
        try {
            const fetchedCartItem = await axios.get(`${API}/carts/${currentUser.id}/${productID}/`)
            console.log('fetchedCartItem', fetchedCartItem.data)
            setQtyInCart(fetchedCartItem?.data?.[0]?.quantity)
        } catch (error) {
            console.log(error)
        }
        const fetchedProduct = await axios.get(`${API}/products/${productID}/`)
        setStock(fetchedProduct?.data?.stock)
    }

    useEffect(() => {
        if (currentUser) {
            fetchAPI(productID, currentUser)
        }
    }, [])

    const handleIncDec = async (sign) => {
        let newQty
        if (sign === '+') {
            console.log('handle incre')
            newQty = Math.min(qtyInCart + 1, stock)
        } else {
            console.log('handle dec')
            newQty = Math.max(qtyInCart - 1, 0)
        }

        if (newQty > 0) {
            const updatedCartItem = await axios.put(`${API}/carts/${currentUser.id}/${productID}/`, {
                quantity: newQty,
                user: currentUser.id,
                product: productID
            })
            // console.log('cart',cart)
            setCart(cart?.map(item=> item.product === productID ? {...item,quantity: newQty} : item))
            //setCartQty(prev=>prev-1)
        } else {
            await axios.delete(`${API}/carts/${currentUser.id}/${productID}/`)
            //setCartQty(prev=>prev-1)
            setCart(cart?.filter(item=>item.product!==productID))
        }
        setQtyInCart(newQty)
    }

    const handleAddToCart = async () => {
        console.log('handle add to cart')
        if (currentUser.id) {
            const createdCartItem = await axios.post(`${API}/carts/`,
                {
                    quantity: 1,
                    user: currentUser.id,
                    product: productID
                })
            setQtyInCart(createdCartItem.data.quantity)
            // console.log('cart',cart)
            setCart([...cart,createdCartItem.data])
        } else {
            alert('please log in to add to cart')
        }
    }

    const handleChangeQtyInCart = async (e) => {
        console.log('handleChangeQtyInCart')
        const input = parseInt(e.target.value)
        let newQty
        if (input === 0) {
            await axios.delete(`${API}/carts/${currentUser.id}/${productID}/`)
            setQtyInCart(0)
        } else if (input < 0) {
            alert("Quantity in cart cannot be negative")
        } else {
            if (input > stock) {
                newQty = stock
                alert('we have revised the qty to match the stock available')
            } else { //input>0 and input <stock
                newQty = input
            }
            const updatedCartItem = await axios.put(`${API}/carts/${currentUser.id}/${productID}/`, {
                quantity: newQty,
                user: currentUser.id,
                product: productID
            })
            setQtyInCart(newQty)
            setCart(cart?.map(item=> item.product === productID ? {...item,quantity: newQty} : item))
        }
    }


    return (
        <>
            {
                (!qtyInCart || qtyInCart === 0 || qtyInCart === '0')
                    ? <button className="btn btn-info" onClick={handleAddToCart}>Add to cart</button>
                    : <div>
                        <button className="btn-sm btn-info" onClick={() => handleIncDec('-')}>-</button>
                        <span><input type="text" size='3' value={qtyInCart} onChange={(e) => handleChangeQtyInCart(e)} /></span>
                        <button className="btn-sm btn-info" onClick={() => handleIncDec('+')}>+</button>
                    </div>
            }
        </>
    )

}
