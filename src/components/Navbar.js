import {Link} from 'react-router-dom'

function Navbar() {
    return (
        <>
            <div className="container">
                <nav className="navbar navbar-expand-sm narbar-light">
                    <Link className="navbar-brand" to='/'>
                        <img src='/shopiify_icon.png' alt='icon' style={{width:'50px'}}/>
                        Shopiify
                    </Link>
                        <ul className="navbar-nav ms-auto text-left">
                            <li>
                            <Link className="nav-link" to="/cart">Cart</Link>
                            </li>
                            <li>
                            <Link className="nav-link" to="/user/orders">My Orders</Link>
                            </li>
                            <li>
                            <Link className="nav-link" to="/user">My Account</Link>
                            </li>
                        </ul>

              

                </nav>

            </div>
        </>
    )
}

export default Navbar