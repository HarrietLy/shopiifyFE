import { useEffect, useContext, useState } from 'react'
import { UserContext } from '../App'
import axios from "axios"

export default function AccountPage() {
  const API = process.env.REACT_APP_API
  const { currentUser, setCurrentUser } = useContext(UserContext)
  const [currentUserAddress, setCurrentUserAddress] = useState()
  const [modalOn, setModalOn] = useState(false)
  const [modalEditOn, setModalEditOn] = useState(false)
  const [address, setAddress] = useState()
  const [addressID, setAddressID] = useState()
  const [editIndex, setEditIndex] = useState()

  const fetchedAddressDetails = async () => {
    const fetchedAddress = await axios.get(`${API}/addresses/byuser/${currentUser.id}/`)
    setCurrentUserAddress(fetchedAddress.data)
  }

  useEffect(() => {
    if (currentUser.id) {
      fetchedAddressDetails()
    }
  }, [currentUser])

  const openModal = () => {
    setModalOn(true)
    setModalEditOn(false)
    setAddress()
  }

  const handleBack = () => {
    setModalOn(false)
    setAddress()
  }

  const handleSubmitCreate = async (e) => {
    e.preventDefault()
    const createdAddress = await axios.post(`${API}/addresses/`, { shipping_address: address, user: currentUser.id })
    console.log("createdAddress", createdAddress)
    handleBack()
    setCurrentUser({ ...currentUser, addresses: [...currentUser.addresses, address] })
  }


  const openEditModal = (addressObj) => {
    setModalOn(false)
    setModalEditOn(true)
    setAddress(addressObj.shipping_address)
    setAddressID(addressObj.id)
  }

  const handleEditBack = () => {
    setModalEditOn(false)
    setAddress()
  }

  const handleSubmitEdit = async (e) => {
    e.preventDefault()
    const updatedAddress = await axios.put(`${API}/addresses/${addressID}/`, { shipping_address: address, user: currentUser.id })
    console.log("updatedAddress", updatedAddress)
    const list = [...currentUserAddress]
    list[editIndex].shipping_address = updatedAddress.data.shipping_address
    setCurrentUserAddress(list)
    handleEditBack()
  }

  const handleDelete = async(addressObj,i)=>{
    await axios.delete(`${API}/addresses/${addressObj?.id}/`)
    const list = [...currentUserAddress]
    list.splice(i,1)
    setCurrentUserAddress(list)
  }

  return (
    <div style={{ height: '100vh', maxWidth: "90vw", padding: "15px", margin: "auto" }}>
      <ul>
        <li>Username: {currentUser.username}</li>
        <li>Email: {currentUser.email}</li>
        <li>Addresses:
          <button className='btn-sm btn-warning' onClick={() => { openModal() }}> Add a New Address</button>
          {modalOn &&
            <>
              <form onSubmit={handleSubmitCreate}>
                <label htmlFor='address'>Address:</label>
                <textarea type="text" name='address' cols='40' value={address} onChange={(e) => setAddress(e.target.value)} />
                <input type='submit' className='btn-sm btn-warning' value='Create' />
                <button type='button' onClick={handleBack} className="btn-sm btn-light">Cancel</button>
              </form>
              <br />
            </>
          }

          <ol>{currentUserAddress?.map((addressObj, i) => {
            return (
              <div key={i}>
                <li>{addressObj.shipping_address}</li>
                <button className='btn-sm btn-warning' onClick={() => {
                  openEditModal(addressObj)
                  setEditIndex(i)
                }}> Edit</button>
                <button className='btn-sm btn-warning' onClick={()=>handleDelete(addressObj,i)}> Delete</button>
                {(modalEditOn && i === editIndex) &&
                  <form onSubmit={handleSubmitEdit}>
                    <label htmlFor='address'>Address:</label>
                    <textarea type="text" name='address' cols='40' value={address} onChange={(e) => setAddress(e.target.value)} />
                    <input type='submit' className='btn-sm btn-warning' value='Update' />
                    <button type='button' onClick={handleEditBack} className="btn-sm btn-light">Cancel</button>
                  </form>
                }
                <br /><br />
              </div>
            )
          })}
          </ol>
        </li>
      </ul>
    </div>
  )
}
