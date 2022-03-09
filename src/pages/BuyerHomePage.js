import { useEffect, useState } from "react"
import AddtoCartBtn from "../components/AddtoCartBtn"
import axios from "axios";
import { Link } from "react-router-dom";


const Card = ({ product, cart, setCart }) => {
    return (
        <>
            <div className="col-6 col-md-3 col-lg-2">
                <div className="card" >
                    <Link to={`/products/${product.id}`}><img src={product.image} className="card-img-top" alt="..." /></Link>
                    <Link className="text-decoration-none" to={`/products/${product.id}`}>
                        <div className="card-body">
                            <h5 className="card-title">${product.price}</h5>
                            <h5 className="card-title" >{product.name}</h5>
                            <div><small className="card-text text-secondary">{product.units}</small></div>
                            <small className="card-text">{product.description.slice(0, 40) + "..."}</small>

                        </div>
                    </Link>
                    <div style={{margin:'auto'}}>
                        <AddtoCartBtn productID={product.id} setCart={setCart} cart={cart}/>
                    </div>
                </div>
            </div>
        </>
    );
}


export default function BuyerHomePage({cart, setCart,setCartQty}) {

    const API = process.env.REACT_APP_API
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [categories, setCategories] = useState()
    const [searchCat, setSearchCat] = useState('')
    const [searchQuery, setSearchQuery] = useState('')

    const fetchAPI = async () => {
        const fetchedProducts = await axios.get(`${API}/products/`)
        const fetchedCategories = await axios.get(`${API}/categories/`)
        const displayedProducts = fetchedProducts.data.filter(product => product.status === 'active' && product.stock > 0)
        setProducts(displayedProducts)
        setFilteredProducts(displayedProducts)
        console.log('displayedProducts', displayedProducts)
        setCategories(fetchedCategories.data)
    }

    useEffect(() => {
        fetchAPI()
    }, [])

    const handleSearch = (searchCat, searchQuery) => {
        console.log('searchCat', searchCat)
        console.log('searchQuery', searchQuery)
        if (searchCat !== '' && searchCat !== 'All Categories') {
            const productsFiltedByCat = products.filter(product => product.category === parseInt(searchCat))
            console.log('productsFiltedByCat', productsFiltedByCat)
            setFilteredProducts(productsFiltedByCat.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase())))
        } else {
            console.log('no cat filter')
            setFilteredProducts(products.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase())))
        }
    }

    return (
        <div style={{ maxWidth: "90vw", padding: "15px", margin: "auto" }}>
            <h2> Welcome to Shopiify!</h2>

            <div style={{ padding: "15px", margin: "auto", maxWidth: "50vw" }}>
                <select onChange={(e) => setSearchCat(e.target.value)} value={searchCat}>
                    <option>All Categories</option>
                    {categories?.map((category, i) => {
                        return (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        )
                    })
                    }
                </select>
                <input
                    placeholder="Search Product"
                    size='30'
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value) }}
                ></input>
                <button className="btn btn-primary" onClick={() => handleSearch(searchCat, searchQuery)}>Search</button>
            </div>

            <div className='container'>
                <div className='row g-3'>
                    {filteredProducts.map((product, i) =>
                        <Card key={i} product={product} cart={cart} setCart={setCart} />
                    )}
                </div>
            </div>

        </div >
    )
}
