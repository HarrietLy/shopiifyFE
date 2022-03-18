
import { useEffect, useContext, useState } from 'react'
import { UserContext } from '../App'
import axios from "axios"
import AddtoCartBtn from "../components/AddtoCartBtn"
import { useNavigate, Link } from 'react-router-dom'
import Loading from "../components/Loading"

export default function CartPage({ cart, setCart }) {

  const API = process.env.REACT_APP_API
  const { currentUser } = useContext(UserContext)
  const [cartDetails, setCartDetails] = useState([])
  const [basketVal, setBasketVal] = useState(0)
  const [currentUserAddress, setCurrentUserAddress] = useState()
  const [addressID, setAddressID] = useState()
  const [status, setStatus] = useState()

  const navigate = useNavigate()

  const fetchedAddressDetails = async () => {
    const fetchedAddress = await axios.get(`${API}/addresses/byuser/${currentUser.id}/`)
    setCurrentUserAddress(fetchedAddress.data)
    setAddressID(fetchedAddress?.data[0]?.id)
  }

  const fetchCart = async () => {
    try {
      setStatus('loading')
      const fetchedCart = await axios.get(`${API}/carts/${currentUser.id}/`)
      const fetchedCartData = fetchedCart.data
      for (let i = 0; i < fetchedCartData?.length; i++) {
        let cartItemProductID = fetchedCartData[i].product
        // console.log('cartItemProductID', cartItemProductID)
        let fetchedCartItem = await axios.get(`${API}/products/${cartItemProductID}/`)
        // console.log('fetchedCartItem data', fetchedCartItem.data)
        fetchedCartData[i].name = fetchedCartItem.data.name
        fetchedCartData[i].price = fetchedCartItem.data.price
        fetchedCartData[i].units = fetchedCartItem.data.units
        fetchedCartData[i].image = fetchedCartItem.data.image
      }
      console.log('fetchedCartData', fetchedCartData)
      setCartDetails(fetchedCartData)//to left the cart state up to global
      setBasketVal(fetchedCartData.reduce((prev, curr) => prev + parseFloat(curr.price) * parseFloat(curr.quantity), 0))
      setStatus('success')
    } catch (error) {
      console.log(error)
      setStatus('error')
    }

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
    if(!addressID){
      alert("please add a ship to address")
      return
    }
    try {
      setStatus('loading')
      // console.log("addressID", addressID)
      const createdOrder = await axios.post(`${API}/orders/`, { user: currentUser.id, shipping_address: parseInt(addressID) })
      // console.log("createdOrder", createdOrder.data)
      try {
        // console.log("cartDetails", cartDetails)
        for (let i = 0; i < cartDetails?.length; i++) {
          // console.log("cartItem", cartDetails[i])
          let cartItem = cartDetails[i]
          let newOrderItem = {
            product: parseInt(cartItem.product),
            quantity: parseInt(cartItem.quantity),
            price: parseFloat(cartItem.price),
            order: parseInt(createdOrder.data.id)
          }
          // console.log('newOrderItem', newOrderItem)
          const createdOrderItem = await axios.post(`${API}/orderitems/${createdOrder.data.id}/`, newOrderItem)
          // console.log("createdOrderItem", createdOrderItem)

          //TODO: reduce the stock put to product table
          const fetchedItem = await axios.get(`${API}/products/${cartItem.product}/`)
          const updatedProduct = await axios.put(`${API}/products/${cartItem.product}/`,{
            ...fetchedItem.data, stock:fetchedItem.data.stock-parseInt(cartItem.quantity)
          })

        }
        setStatus('success')
        alert("order created")
        
        await axios.delete(`${API}/carts/${currentUser.id}/`)
        setCart()
        navigate(`/orders/${createdOrder.data.id}`)
      } catch (error) {
        console.log(error)
        setStatus('error')
        alert('Fail to place order')
      }
    } catch (error) {
      console.log(error)
      setStatus('error')
      alert('Fail to place order')
    }
  }

  return (
    <div style={{ maxWidth: "90vw", padding: "15px", margin: "auto" }}>
       
      {(cartDetails?.length === 0 &&(status==='success'))? <h2>Your Cart is Empty</h2>
        :
        <div>
          <h2>Here is your Cart:<span>{(status==='loading')&& <Loading/>}</span></h2>
          <table style={{ 'width': "100%" }} className="table" >
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
              {cartDetails?.sort(function (a, b) {
                const nameA = a.name.toLowerCase()
                const nameB = b.name.toLowerCase()
                if (nameA < nameB) { return -1 }
                if (nameA > nameB) { return 1 }
                return 0
              })
                .map((cartItem) => {
                  return (
                    <tr key={cartItem.product}>
                      <td>
                        <Link style={{ textDecoration: 'none' }} to={`/products/${cartItem.product}`}>{cartItem.name}
                        </Link>
                      </td>
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

          <table style={{ 'width': "100%" }} >
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
              <option disabled>Please Choose an Address</option>
              {currentUserAddress?.map((addressObj,i) => {
                return (
                    <option key={i} id={addressObj?.id} value={addressObj?.id}>{addressObj.shipping_address}</option>
                )
              })}
            </select>
          </div>
          {( currentUserAddress?.length===0 && <p style={{ color: 'red' }}>please add a shipping address in My Account section</p>)}
          <br /><br />
          <button className='btn-sm btn-primary' style={{ float: 'right' }} onClick={handleOrder}>Pay and Place Order</button>
        </div>
      }

      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
    </div>
  )
}
