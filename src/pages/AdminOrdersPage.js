import axios from "axios"
import { Link } from "react-router-dom"
import { useEffect, useContext, useState } from 'react'
import { UserContext } from '../App'
import dayjs from "dayjs"



import React from 'react'

export default function AdminOrdersPage() {
  const API = process.env.REACT_APP_API
  const { currentUser } = useContext(UserContext)
  const [orders, setOrders] =useState()

  const fetchOrders=async()=>{
    const fetchedOrders = await axios.get(`${API}/orders/`)
    console.log('fetchedOrders',fetchedOrders.data)
    const orderData = fetchedOrders.data

    for (let i=0;i<orderData?.length;i++){
    //TODO: fetch address for each
    let fetchedAddress = await axios.get(`${API}/addresses/${parseInt(orderData?.[i]?.shipping_address)}/`)
    
    orderData[i].shipping_address = fetchedAddress.data.shipping_address
    }
    console.log("orderData",orderData)
    setOrders(orderData)
  }


  useEffect(()=>{
    if (currentUser.is_superuser){
      fetchOrders()
    }
  },[currentUser])

  const handleShipOut =async(order,i)=>{
    const updateOrder = await axios.put(`${API}/orders/${order.id}/`,{...order,order_status:'delivered'})
    const list = [...orders]
    list[i].order_status=updateOrder.data.order_status
    setOrders(list)
  }

  return (
    <div style={{maxWidth: "90vw", padding: "15px", margin: "auto" }}>
      <h5>Hi {currentUser.username}, below is all of your customers' orders:</h5>
      <table className="table">
        <thead>
          <tr>
            <th>OrderID</th>
            <th>Buyer's UserID</th>
            <th>Shipping_address</th>
            <th>Order Created Time</th>
            <th>Order Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order, i)=>{
            return (
              <tr key={i}>
                <td><Link to={`/orders/${order.id}`}>{order.id}</Link></td>
                <td>{order.user}</td>
                <td>
                   {order.shipping_address}
                </td>
                <td>{dayjs(order.order_time).format('YYYY-MMM-DD HH:mm:ss')}</td>
                <td style={{color:(order.order_status==='pending')?'red':'green'}}>{order.order_status}</td>
                <td>{(order.order_status==='pending')&&
                <button className='btn-sm btn-info' onClick={()=>handleShipOut(order,i)}>Ship out</button>
                }
                </td>
              </tr>
            )

          })}
        </tbody>
      </table>
    </div>
  )
}
