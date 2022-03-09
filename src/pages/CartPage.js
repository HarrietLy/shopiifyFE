
import { useEffect, useContext, useState } from 'react'
import { UserContext } from '../App'
import axios from "axios"
import AddtoCartBtn from "../components/AddtoCartBtn"

export default function CartPage({ cart, setCart }) {

  const API = process.env.REACT_APP_API
  const { currentUser } = useContext(UserContext)
  const [cartDetails, setCartDetails] = useState([])
  const [basketVal, setBasketVal] = useState(0)
  const [currentUserAddress, setCurrentUserAddress] = useState()
  const [addressID, setAddressID] = useState()

  const fetchedAddressDetails = async () => {
    const fetchedAddress = await axios.get(`${API}/addresses/byuser/${currentUser.id}/`)
    setCurrentUserAddress(fetchedAddress.data)
  }

  const fetchCart = async () => {
    const fetchedCart = await axios.get(`${API}/carts/${currentUser.id}/`)
    console.log('fetchedCart', fetchedCart.data.length)
    const fetchedCartData = fetchedCart.data
    for (let i = 0; i < fetchedCartData.length; i++) {
      let cartItemProductID = fetchedCartData[i].product
      console.log('cartItemProductID', cartItemProductID)
      let fetchedCartItem = await axios.get(`${API}/products/${cartItemProductID}/`)
      console.log('fetchedCartItem data', fetchedCartItem.data)
      fetchedCartData[i].name = fetchedCartItem.data.name
      fetchedCartData[i].price = fetchedCartItem.data.price
      fetchedCartData[i].units = fetchedCartItem.data.units
      fetchedCartData[i].image = fetchedCartItem.data.image
    }
    console.log('fetchedCartData', fetchedCartData)
    setCartDetails(fetchedCartData)//to left the cart state up to global
    setBasketVal(fetchedCartData.reduce((prev, curr) => prev + parseFloat(curr.price) * parseFloat(curr.quantity), 0))
  }

  useEffect(() => {
    if (currentUser.id) {
      fetchCart()
      fetchedAddressDetails()
    }
  }, [cart, currentUser])

  const handleRemoveCartItem = async (productID) => {
    await axios.delete(`${API}/carts/${currentUser.id}/${productID}/`)
    setCart(cart.filter(cartItem => cartItem.product !== productID))
  }


  const handleOrder = async () => {
    try {
      const createdOrder = await axios.post(`${API}/orders/`, { user: currentUser.id, shipping_address: addressID })
      console.log("createdOrder", createdOrder.data)
      try {
        for (let cartItem in cartDetails) {
          const createdOrderItem = await axios.post(`${API}/orderitems/${createdOrder.data.id}`, {
            product: cartItem.product,
            quantity: cartItem.quantity,
            price: cartItem.price,
            order: createdOrder.data.id
          })
          console.log("createdOrderItem", createdOrderItem)
        }
        alert("order created")
      } catch (error) {
        console.log(error)
        alert('Fail to place order')
      }

    } catch (error) {
      console.log(error)
      alert('Fail to place order')
    }
  }

  return (
    <div style={{ height: '100vh', maxWidth: "90vw", padding: "15px", margin: "auto" }}>

      <h1>Cart</h1>
      <table style={{ 'width': "100%" }}>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Image</th>
            <th>Unit Price</th>
            <th>Units</th>
            <th>Quantity</th>
            <th></th>
            <th></th>
            <th>Total Value</th>
          </tr>
        </thead>
        <tbody>
          {cartDetails?.sort().map((cartItem) => {
            return (
              <tr key={cartItem.product}>
                <td>{cartItem.name}</td>
                <td><img src={cartItem.image} alt='' style={{ width: '40px' }} /></td>
                <td>${cartItem.price}</td>
                <td>{cartItem.units}</td>
                <td>{cartItem.quantity}</td>
                <td><AddtoCartBtn productID={cartItem.product} cart={cart} setCart={setCart} /></td>
                <td><button className='btn-sm btn-secondary' onClick={() => handleRemoveCartItem(cartItem?.product)}>Remove</button></td>
                <td>{`${cartItem.price} x ${cartItem.quantity} = $${(parseFloat(cartItem.price) * parseInt(cartItem.quantity)).toFixed(2)}`}</td>
              </tr>
            )
          })

          }

        </tbody>
      </table>
      <hr />
      <table style={{ 'width': "100%" }}>
        <tbody>
          <tr>
            <td>Basket Value</td>
            <td>${basketVal.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Shipping Free (free shipping for orders from $50 and above)</td>
            <td>${(basketVal >= 50) ? (0).toFixed(2) : 2.99}</td>
          </tr>
          <tr>
            <td><strong>Final Cost To Pay</strong></td>
            <td><strong>${basketVal >= 50 ? basketVal.toFixed(2) : (basketVal + 2.99).toFixed(2)}</strong></td>
          </tr>
        </tbody>
      </table>
      <hr />
      <div>
        <h3>Shipping To Address</h3>
        <label htmlFor='address'>Shipping Address: </label>
        <select name='address' value={addressID} onChange={(e) => { setAddressID(e.target.value) }}>
          {currentUserAddress?.map((addressObj) => {
            return (
              <>
                <option id={addressObj.id}>{addressObj.shipping_address}</option>
              </>
            )
          })}
        </select>
      </div>
      <br /><br />
      <button className='btn-sm btn-primary' style={{ float: 'right' }} onClick={handleOrder}>Pay and Place Order</button>
    </div>
  )
}
