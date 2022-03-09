import axios from "axios"
import { Link } from "react-router-dom"
import { useEffect, useContext, useState } from 'react'
import { UserContext } from '../App'
import dayjs from "dayjs"

export default function AdminUsersPage() {
  const API = process.env.REACT_APP_API
  const { currentUser } = useContext(UserContext)
  const [users, setUsers] =useState()

  const fetchUsers=async()=>{
    //TODO: fetche user
    const fetchedUsers = await axios.get(`${API}/users/`)
    const customers = fetchedUsers.data.filter(x=>!x.is_superuser)
    for (let i=0;i< customers?.length;i++){
      console.log("id",customers[i]?.id)
      let orders = await axios.get(`${API}/orders/byuser/${customers[i]?.id}/`)
      console.log('orders',orders.data)
      customers[i].pending_orders = (orders.data.filter(x=>x.order_status==='pending')).length
      customers[i].delivered_orders = orders.data.length
    }
    console.log('customers',customers)
    setUsers(customers)
  }

  useEffect(()=>{
    if (currentUser.is_superuser){
      fetchUsers()
    }
  },[currentUser])

  return (
    <div style={{maxWidth: "90vw", padding: "15px", margin: "auto" }}>
      
       <table className="table">
        <thead>
          <tr>
            <th>UserID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Date Joined</th>
            <th>#Pending Orders</th>
            <th>#Delivered Orders</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, i)=>{
            return (
              <tr key={i}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{dayjs(user.date_joined).format('YYYY-MMM-DD HH:mm:ss')}</td>
                <td>{user.pending_orders}</td>
                <td>{user.delivered_orders}</td>
              </tr>
            )

          })}
        </tbody>
      </table>

    </div>
  )
}
