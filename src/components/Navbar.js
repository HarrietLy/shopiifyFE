import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { UserContext } from '../App.js'
import axios from 'axios'

function Navbar({ cart, setCart, cartQty, setCartQty }) {
    const { currentUser, setCurrentUser } = useContext(UserContext)
    const navigate = useNavigate()
    const API = process.env.REACT_APP_API

    const handleLogout = () => {
        console.log('handle logout')
        setCurrentUser(null)
        navigate('/')
        setCart({})
    }

    const fetchCart = async () => {
        const fetchedCart = await axios.get(`${API}/carts/${currentUser.id}/`)
        console.log('fetchedCartData in nav', fetchedCart.data)
        // setCartQty(fetchedCart.data?.length)
        setCart(fetchedCart.data)
        console.log('cart from nav',fetchedCart.data)
    }

    useEffect(() => {
        if(currentUser?.id){
            fetchCart()
        }
    }, [currentUser])

    return (
        <>
            <div className="container">
                <nav className="navbar navbar-expand-sm narbar-light">
                    <Link className="navbar-brand" to='/'>
                        <img src='/shopiify_icon.png' alt='icon' style={{ width: '50px' }} />
                        Shopiify
                    </Link>
                    <ul className="navbar-nav ms-auto text-left">
                        <li>
                            {(currentUser?.is_superuser)
                                ? <Link className="nav-link" to="/admin/products">My Products</Link>
                                : <Link className="nav-link" to="/cart">
                                    <img src='/cart.png' alt='' style={{ width: "2em" }} />
                                    {(cart?.length===0)?'': cart?.length}
                                </Link>
                            }
                        </li>
                        <li>
                            {(currentUser?.is_superuser)
                                ? <Link className="nav-link" to="/admin/orders">My Orders</Link>
                                : <Link className="nav-link" to="/user/orders">My Orders</Link>
                            }
                        </li>
                        <li>
                            <Link className="nav-link" to="/user">My Account</Link>
                        </li>
                        <li>
                            {(currentUser?.id) ? <button className='btn btn-light' onClick={handleLogout}>Logout</button>
                                : <button className='btn btn-light' onClick={() => { navigate('/login') }}>Login</button>}
                        </li>
                    </ul>

                </nav>

            </div>
        </>
    )
}

export default Navbar