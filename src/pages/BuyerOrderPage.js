import axios from "axios"
import { Link } from "react-router-dom"
import { useEffect, useContext, useState } from 'react'
import { UserContext } from '../App'
import dayjs from "dayjs"
import Loading from "../components/Loading"


export default function BuyerOrderPage() {

  const API = process.env.REACT_APP_API
  const { currentUser } = useContext(UserContext)
  const [orders, setOrders] =useState()
  const [currentUserAddress, setCurrentUserAddress] = useState()
  const [status, setStatus] = useState()

  const fetchOrders=async()=>{
    try {
      setStatus('loading')
      const fetchedOrders = await axios.get(`${API}/orders/byuser/${currentUser.id}/`)
      console.log('fetchedOrders',fetchedOrders.data)
      setOrders(fetchedOrders.data)
  
      const fetchedAddress = await axios.get(`${API}/addresses/byuser/${currentUser.id}/`)
      setCurrentUserAddress(fetchedAddress.data)
      console.log("fetchedAddress",fetchedAddress.data) 
      setStatus('success')
    } catch (error) {
      console.log(error)
      setStatus('error')
    }

  }


  useEffect(()=>{
    if (currentUser.id){
      fetchOrders()
    }
  },[currentUser])

  const handleCancel =async(order,i)=>{
    await axios.delete(`${API}/orders/${order.id}/`)
    const list = [...orders]
    list.splice(i,1)
    setOrders(list)
  }

  return (
    <div style={{maxWidth: "90vw", padding: "15px", margin: "auto" }}>
      <h5>Hi {currentUser.username}, below is your order history:</h5>
      {(status==='loading')&& <Loading/>}
      <table className="table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Shipping_address</th>
            <th>Order Created Time</th>
            <th>Order Status</th>
            <th></th>
          </tr>
        </thead>
    
        <tbody>
          {orders?.map((order, i)=>{
            return (
              <tr key={i}>
                <td><Link to={`/orders/${order.id}`}>{order.id}</Link></td>
                <td>
                   {currentUserAddress?.filter((x)=>parseInt(x.id)===parseInt(order.shipping_address))?.[0]?.shipping_address}
                </td>
                <td>{dayjs(order.order_time).format('YYYY-MMM-DD HH:mm:ss')}</td>
                <td style={{color:(order.order_status==='pending')?'red':'green'}}>{order.order_status}</td>
                <td>{(order.order_status==='pending')&&
                <button className='btn-sm btn-warning' onClick={()=>handleCancel(order,i)}>Cancel Order</button>
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
