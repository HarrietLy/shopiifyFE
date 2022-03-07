import { useEffect, useState } from "react"
import AddtoCartBtn from "../components/AddtoCartBtn"
import axios from "axios";


const Card = ({ product }) => {
    return (
        <>
            <div className="col-6 col-md-3 col-lg-2">
                <div className="card" >
                    <img src={product.image} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">${product.price}</h5>
                        <h5 className="card-title">{product.name}</h5>
                        <div><small className="card-text text-secondary">{product.units}</small></div>
                        <small className="card-text">{product.description.slice(0, 40) + "..."}</small>
                        <div>
                            <AddtoCartBtn product={product} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default function BuyerHomePage() {

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
        console.log('displayedProducts',displayedProducts)
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
            console.log('productsFiltedByCat',productsFiltedByCat)
            setFilteredProducts(productsFiltedByCat.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase())))
        } else {
            console.log('no cat filter')
            setFilteredProducts(products.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase())))
        }
    }

    return (
        <div>
            <h2> Welcome to Shopiify Buyer Homepage</h2>
            <select onChange={(e) => setSearchCat(e.target.value)} value={searchCat}>
                <option>All Categories</option>
                {categories?.map((category,i)=>{
                    return(
                        <option key={category.id} value={category.id}>{category.name}</option>
                )})
                }
            </select>
            <input
                placeholder="Search Product"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value) }}
            ></input>
            <button onClick={() => handleSearch(searchCat, searchQuery)}>Search</button>

            <div className='container'>
                <div className='row g-3'>
                    {filteredProducts.map((product, i) =>
                        <Card key={i} product={product} />
                    )}
                </div>
            </div>

        </div >
    )
}
