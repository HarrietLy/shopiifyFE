import data from '../fakedata/data'
import { useState, Link, useEffect } from "react";
export default function AdminProductsPage() {

    const [adminProducts, setAdminProducts] = useState([])
    const [modalOn, setModalOn] = useState(false)

    useEffect(() => {
        setAdminProducts(data.products)
    }, [])

    const handleCreateProduct = ({ product }) => {
        //TODO: send create request to product table
        console.log('handleCreateProduct')
    }

    const handleEditProduct = ({ product }) => {
        //TODO: send put request to product table
        console.log('handleEditProduct')
    }


    const handleDeleteProduct = ({ product }) => {
        //TODO: send delete request to product table
        console.log('handleDeleteProduct')
    }

    const handleActiveSwitch =({product})=>{
        console.log('handleActiveSwitch')
    }
    const ProductForm = ({ product }) => {
        const [name, setName] = useState(product?.name)
        const [description, setDescription] = useState(product?.description)
        const [image, setImage] = useState(product?.image)
        const [category_id, setCategory_id] = useState(product?.category_id)
        const [units, setUnits] = useState(product?.units)
        const [price, setPrice] = useState(product?.price)
        const [stock, setStock] = useState(product?.stock)

        const handleSubmit = (e) => {
            //e.preventDefault() //dont need to prevent default? as we need page to refresh anyway
            console.log('handle submit')
            //TODO: post/put to product table, post if product.id is null
            
            setModalOn(false)
        }

        const handleImageUpload = () => {

        }

        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <ul>
                        <li>
                            <label htmlFor='name'>Name</label>
                            <input type='text' id='name' name='name' value={name} onChange={(e) => { setName(e.target.value) }}></input>
                        </li>
                        <li>
                            <label htmlFor='desc'>Description</label>
                            <input type='text' id='desc' name='desc' value={description} onChange={(e) => { setDescription(e.target.value) }}></input>
                        </li>
                        <li>
                            <label htmlFor='image'>Image</label>
                            <input type='text' id='image' name='image' value={image} onChange={(e) => { setImage(e.target.value) }}></input>
                            <input type='file' onChange={handleImageUpload}></input>
                        </li>
                        <li>
                            <label htmlFor='price'>Price</label>
                            <input type='text' id='name' name='price' value={price} onChange={(e) => { setPrice(e.target.value) }}></input>
                        </li>
                        <li>
                            <label htmlFor='units'>Units</label>
                            <input type='text' id='units' name='units' value={units} onChange={(e) => { setUnits(e.target.value) }}></input>
                        </li>
                        <li>
                            <label htmlFor='stock'>Stock</label>
                            <input type='text' id='stock' name='stock' value={stock} onChange={(e) => { setStock(e.target.value) }}></input>
                        </li>
                    </ul>
                    <input type='submit' value='Create'></input>
                </form>
            </div>
        )
    }
    return (
        <div>
            <h5>Welcome Admin, below are all of your products:</h5>
            <button onClick={() => { setModalOn(true) }}>Create New Product</button>
            {modalOn && <ProductForm />}

            <table style={{ 'width': "100%" }}>
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th>Units</th>
                        <th>Stock</th>
                        <th>Status</th>
                        <th>Sales</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {adminProducts.map((product) => {
                        return (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td><img src={product.image} style={{ 'width': '40px' }} alt=''></img></td>
                                <td>${product.price}</td>
                                <td>{product.units}</td>
                                <td>{product.stock}</td>
                                <td>{product.status}</td>
                                <td>{product.sales}</td>
                                <td>
                                    <button onClick={()=>setModalOn(true)}>Edit</button>
                                    <button onClick={handleDeleteProduct}>Delete</button>
                                    {(product.status === 'active') ? <button onClick={handleActiveSwitch}>Deactivate</button> : <button onClick={handleActiveSwitch}>Activate</button>}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </div>
    )
}
