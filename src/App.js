import { Outlet, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import AdminProductsPage from './pages/AdminProductsPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import SignupPage from './pages/SignupPage';
import BuyerHomePage from './pages/BuyerHomePage';
import LoginPage from './pages/LoginPage';
import ProductViewPage from './pages/ProductViewPage';
import BuyerOrderPage from './pages/BuyerOrderPage';
import CartPage from './pages/CartPage';
import AccountPage from './pages/AccountPage';
import Footer from './components/Footer';
import OrderPage from './pages/OrderPage';
import { useState, createContext, useContext } from "react";
import AdminUsersPage from './pages/AdminUsersPage';


export const UserContext = createContext(null)

export const ProtectedRoute = ({ adminOnly }) => {
  const { currentUser } = useContext(UserContext)
  if (adminOnly) {
    return (currentUser?.id && currentUser?.is_superuser) ? <Outlet /> : <Navigate to='/login' />
  } else {
    return (currentUser?.id) ? <Outlet /> : <Navigate to='/login' />
  }

}


function App() {
  const API = process.env.REACT_APP_API
  const [currentUser, setCurrentUser] = useState('')
  const [cart, setCart] = useState()

  return (
    <div>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <Navbar setCart={setCart} cart={cart} />
        <Routes>

          <Route path="/" element={<BuyerHomePage setCart={setCart} cart={cart} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route path="/products/:productID" element={<ProductViewPage cart={cart} setCart={setCart} />} />

          <Route element={<ProtectedRoute adminOnly={false} />}>
            <Route path='/orders/:orderID' element={<OrderPage />} />
            <Route path="/user" element={<AccountPage />} />
            <Route path="/user/orders" element={<BuyerOrderPage />} />
            <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
          </Route>

          <Route element={<ProtectedRoute adminOnly={true} />}>
            <Route path='/orders/:orderID' element={<OrderPage />} />
            <Route path="/user" element={<AccountPage />} />
            <Route path="/user/orders" element={<BuyerOrderPage />} />
            <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
            
            <Route path="/admin/orders" element={<AdminOrdersPage />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/products" element={<AdminProductsPage />} />
          </Route>
        </Routes>
      </UserContext.Provider>
      <Footer />
    </div>

  );
}

export default App;
