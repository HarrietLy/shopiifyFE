//search bar by categories
//display random 3x10 products that and are active, has >0 stock
//each card has a add to cart button
import { useEffect, useState } from "react"
import data from "../fakedata/data"
import AddtoCartBtn from "../components/AddtoCartBtn"



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

    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts]=useState([])
    const [searchCat, setSearchCat] = useState('')
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        setProducts(data.products.filter(product => product.status === 'active' && product.stock > 0))
        setFilteredProducts(data.products.filter(product => product.status === 'active' && product.stock > 0))
        //TODO: get all products from database and setProducts, filter for active product and stock>0
    }, [])


    console.log('products', products)
    console.log('filteredProducts', filteredProducts)

    const handleSearch = (searchCat, searchQuery) => {
        console.log('searchCat', searchCat)
        console.log('searchQuery', searchQuery)
        if (searchCat !== '' && searchCat !== 'All Categories') {
            const productsFiltedByCat = products.filter(product => product.category_id === searchCat)
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
                <option>Fruits</option>
                <option>Vegetables</option>
                <option>Packages</option>
            </select>
            <input
                placeholder="$10 off with 'codingislife' promocode"
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

        </div>
    )
}
