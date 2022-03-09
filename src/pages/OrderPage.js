import axios from "axios"
import { Link, useParams } from "react-router-dom"
import { useEffect, useContext, useState } from 'react'
import { UserContext } from '../App'
import dayjs from "dayjs"

export default function OrderPage() {

  const API = process.env.REACT_APP_API
  const { currentUser } = useContext(UserContext)
  const {orderID} = useParams()
  const [orderItemDetails, setOrderItemDetails] =useState()
  const [order, setOrder] =useState()
  const [address, setAddress] =useState()
  const [customer, setCustomer] =useState()
  const [basketVal, setBasketVal] =useState()

  const fetchOrderItems=async()=>{
    const fetchedOrderItems = await axios.get(`${API}/orderitems/${orderID}/`)
    console.log('fetchedOrderItems',fetchedOrderItems.data)
    let orderItems = fetchedOrderItems.data
    for (let i=0;i<orderItems?.length;i++){
      const itemDetails = await axios.get(`${API}/products/${orderItems?.[i]?.product}/`)
      orderItems[i].name = itemDetails.data.name
      orderItems[i].image = itemDetails.data.image
      orderItems[i].units = itemDetails.data.units
    }
    console.log("orderItems",orderItems)
    setOrderItemDetails(orderItems)
    setBasketVal(orderItems.reduce((prev, curr) => prev + parseFloat(curr.price) * parseFloat(curr.quantity), 0))

    const fetchedOrder = await axios.get(`${API}/orders/${orderID}/`)
    console.log("fetchedOrder",fetchedOrder.data)
    setOrder(fetchedOrder.data)

    const fetchedAddress = await axios.get(`${API}/addresses/${fetchedOrder?.data?.shipping_address}/`)
    console.log("fetchedAddress",fetchedAddress.data)
    setAddress(fetchedAddress.data?.shipping_address)

    const fetchedUser = await axios.get(`${API}/users/byid/${fetchedOrder?.data?.user}/`)
    console.log("fetchedUser",fetchedUser.data)
    setCustomer(fetchedUser.data)
  }

  useEffect(()=>{
    if (currentUser.id){
      fetchOrderItems()
    }
  },[currentUser])

  const handleShipOut= async()=>{
    const updateOrder = await axios.put(`${API}/orders/${orderID}/`,{...order,order_status:'delivered'})
    setOrder({...order, order_status:'delivered'})
  }

  return (
    <div style={{ maxWidth: "90vw", padding: "15px", margin: "auto" }}>
      <h5>Order Details of OrderID {orderID}</h5>
      <div>
        Customer Name: {customer?.username}
      </div>
      <div>
        Customer Email: {customer?.email}
      </div>
      <div>
        Shipping To Address: {address}
      </div>
      <div >
        Order Status: <span style={{color:(order?.order_status==='pending')?'red':'green'}}>{order?.order_status}</span>
        {(order?.order_status==='pending' && currentUser.is_superuser)&&
        <button className="btn=sm btn-info" onClick = {handleShipOut}>Ship out</button>
        }
      </div>
      <div>
        Order Created Time: {dayjs(order?.order_time).format('YYYY-MMM-DD HH:mm:ss')}
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Order Item</th>
            <th>Image</th>
            <th>Units</th>
            <th>Unit Price</th>
            <th>Quantity</th>
            <th>Total Value</th>
          </tr>
        </thead>
        <tbody>
          {orderItemDetails?.map((item,i)=>{return(
            <tr key={i}>
              <td><Link style={{ textDecoration: 'none' }} to={`/products/${item.product}`}>{item?.name}</Link></td>
              <td><img src={item?.image} alt='' style={{width:'40px'}}/></td>
              <td>{item?.units}</td>
              <td>{item?.price}</td>
              <td>{item?.quantity}</td>
              <td>{(parseInt(item?.quantity)*parseFloat(item?.price)).toFixed(2)}</td>
            </tr>
          )})}
        </tbody>
      </table>
      <table style={{ 'width': "100%" }} >
        <tbody>
          <tr>
            <td>Basket Value</td>
            <td>${basketVal?.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Shipping Free (free shipping for orders from $50 and above)</td>
            <td>${(basketVal >= 50) ? (0).toFixed(2) : 2.99}</td>
          </tr>
          <tr>
            <td><strong>Total Cost Paid</strong></td>
            <td><strong>${basketVal >= 50 ? basketVal?.toFixed(2) : (basketVal + 2.99)?.toFixed(2)}</strong></td>
          </tr>
        </tbody>
      </table>

    </div>
  )
}
