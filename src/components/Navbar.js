import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../App.js'

function Navbar() {
    const { currentUser, setCurrentUser } = useContext(UserContext)
    const navigate = useNavigate()
    const handleLogout = () => {
        console.log('handle logout')
        setCurrentUser(null)
    }

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
                                : <Link className="nav-link" to="/cart">Cart</Link>
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
                            :<button className='btn btn-light' onClick= {()=>{navigate('/login')}}>Login</button>}
                        </li>
                    </ul>



                </nav>

            </div>
        </>
    )
}

export default Navbar