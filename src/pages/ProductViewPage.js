import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AddtoCartBtn from '../components/AddtoCartBtn'
import Loading from "../components/Loading"
export default function ProductViewPage({cart, setCart}) {

  const API = process.env.REACT_APP_API

  const [product, setProduct] = useState()
  const [categories, setCategories] = useState()
  const { productID } = useParams()
  const [status, setStatus] = useState()

  const fetchAPI = async (productID) => {
    try {
      setStatus('loading')
      const fetchedProduct = await axios.get(`${API}/products/${productID}/`)
      const fetchedCategories = await axios.get(`${API}/categories/`)
      setProduct(fetchedProduct.data)
      setCategories(fetchedCategories.data)
      setStatus('success')
    } catch (error) {
      console.log(error)
      setStatus('error')
    }
  }

  useEffect(() => {
    fetchAPI(productID)
  }, [productID])

  return (
    <div style={{ maxWidth: "90vw", padding: "15px", margin: "auto" }}>
      {(status==='loading')&& <Loading/>}
      <img src={product?.image} alt='' style={{ width: '50%' }} />
      <div>
      <AddtoCartBtn productID={productID} setCart={setCart} cart={cart}/>
      </div>
      <ul style={{color:(product?.status!=='active' || product?.stock <=0) ? 'gray':'black'}}>
        <li>Name: {product?.name}</li>
        <li>Description: {product?.description}</li>
        <li>Category: {categories?.[product?.category-1].name}</li>
        <li>Price: ${product?.price}</li>
        <li>Units: {product?.units}</li>
        <li>Stock: {(product?.status!=='active' || product?.stock <=0) ?'Not Available' : product?.stock}</li>
      </ul>

    </div>

  )
}
