import { useState, Link, useEffect } from "react";
import axios from "axios";
import dayjs from 'dayjs'

const API = 'http://localhost:8000/api/'
export default function AdminProductsPage() {

    const [adminProducts, setAdminProducts] = useState([])
    const [categories, setCategories] = useState()
    const [productID, setProductID] = useState()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [category, setCategory] = useState()
    const [units, setUnits] = useState('')
    const [price, setPrice] = useState()
    const [stock, setStock] = useState()
    const [modalOn, setModalOn] = useState(false)

    const fetchAPI = async () => {
        const fetchedProducts = await axios.get(API + 'products/')
        const fetchedCategories = await axios.get(API + 'categories/')
        console.log("fetchedProducts", fetchedProducts)
        console.log("fetchedCategories", fetchedCategories)
        setAdminProducts(fetchedProducts.data)
        setCategories(fetchedCategories.data)
    }

    useEffect(() => {
        fetchAPI()
    }, [])

    const handleDeleteProduct = async (product) => {
        console.log('handleDeleteProduct product', product)
        try {
            await axios.delete(API+`products/${product.id}/`)
            fetchAPI()
        } catch (error) {
            console.log(error)
        }

    }

    const handleDeactivate = async (product) => {
        console.log('handleDeactivate arg product', product)
        try {
            const updatedProduct = await axios.put(API+`products/${product.id}/`,{...product,status:'inactive'})
            console.log('updatedProduct',updatedProduct)
            fetchAPI()
        } catch (error) {
            console.log(error)
        }
    }

    const handleActivate =async  (product) => {
        console.log('handleActivate arg product', product)
        try {
            const updatedProduct = await axios.put(API+`products/${product.id}/`,{...product,status:'active'})
            console.log('updatedProduct',updatedProduct)
            fetchAPI()
        } catch (error) {
            console.log(error)
        }
    }

    const handleBack = () => {//refreshing states
        setModalOn(false)
        setProductID()
        setName('')
        setDescription('')
        setImage('')
        setCategory()
        setUnits('')
        setPrice()
        setStock()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('handle submit form e.target', e.target)
        const newProduct = {
            name: name,
            description: description,
            category: category,
            image: image,
            price: parseInt(price),
            stock: parseInt(stock),
            units: units
        }
        console.log('newProduct', newProduct)
        if (!productID) {//post/put to product table, post if product.id is null
            try {
                const createdProduct = await axios.post(API + 'products/', newProduct)
                console.log("createdProduct", createdProduct)
                fetchAPI()
                handleBack()
            } catch (error) {
                console.log(error)
                alert(error)
            }
        } else {
            try {
                console.log('productID', productID)
                const updatedProduct = await axios.put(API + `products/${productID}/`, newProduct)
                console.log('updatedProduct', updatedProduct)
                fetchAPI() //refresh product table
                handleBack()
            } catch (error) {
                console.log(error)
                alert(error)
            }
        } 
    }

    const openModal = (product) => {
        setModalOn(true)
        setProductID(product.id)
        setName(product.name)
        setDescription(product.description)
        setImage(product.image)
        setCategory(product.category)
        setUnits(product.units)
        setPrice(product.price)
        setStock(product.stock)
    }


    return (
        <div>
            <h5>Welcome Admin, below are all of your products:</h5>
            <button onClick={() => { openModal({ name: '', category: '', description: '', image: '', price: '', units: '', stock: '' }) }}>Create New Product</button>
            {modalOn &&
                <form onSubmit={handleSubmit}>
                    <ul>
                        <li>
                            <label htmlFor='name'>Name</label>
                            <input type='text' id='name' name='name' value={name} onChange={(e) => { setName(e.target.value) }}></input>
                        </li>
                        <li>
                            <label htmlFor='category'>Category</label>
                            <select id='category' value={category} onChange={(e) => { setCategory(e.target.value) }} >
                                {
                                    categories.map((category, i) => {
                                        return (
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </li>
                        <li>
                            <label htmlFor='description'>Description</label>
                            <textarea id='description' name='description' rows='6' cols='50' value={description} onChange={(e) => { setDescription(e.target.value) }}></textarea>
                        </li>
                        <li>
                            <label htmlFor='image'>Image</label>
                            <input type='text' size="70" id='image' name='image' value={image} onChange={(e) => { setImage(e.target.value) }}></input>
                        </li>
                        <li>
                            <label htmlFor='price'>Price</label>
                            <input type='number' id='name' name='price' min='0' step=".01" value={price} onChange={(e) => { setPrice(e.target.value) }}></input>
                        </li>
                        <li>
                            <label htmlFor='units'>Units</label>
                            <input type='text' id='units' name='units' value={units} onChange={(e) => { setUnits(e.target.value) }}></input>
                        </li>
                        <li>
                            <label htmlFor='stock'>Stock</label>
                            <input type='number' id='stock' name='stock' min='0' value={stock} onChange={(e) => { setStock(e.target.value) }}></input>
                        </li>
                    </ul>
                    <button type='button' onClick={handleBack}>Cancel</button>
                    <button type='submit' >{productID ? 'Update' : 'Create'}</button>
                </form>
            }

            <table style={{ 'width': "100%" }}>
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Category</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th>Units</th>
                        <th>Stock</th>
                        <th>Created Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {adminProducts.map((product) => {
                        return (
                            <tr key={product.id} style={{color:(product.status==='inactive')?"gray":'black'}}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{categories?.[product.category - 1].name}</td>
                                <td><img src={product.image} style={{ 'width': '40px' }} alt=''></img></td>
                                <td>${product.price}</td>
                                <td>{product.units}</td>
                                <td>{product.stock}</td>
                                <td>{dayjs(product.created_time).format('DD-MMM-YYYY')}</td>
                                <td>{product.status}</td>
                                <td>
                                    <button onClick={() => openModal(product)}>Edit</button>
                                    <button onClick={() => handleDeleteProduct(product)}>Delete</button>
                                    {(product.status === 'active') ? <button onClick={() => handleDeactivate(product)}>Deactivate</button> : <button onClick={() => handleActivate(product)}>Activate</button>}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </div>
    )
}
