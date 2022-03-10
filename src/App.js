import { Route, Routes } from 'react-router-dom';
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
import { useState, createContext, useEffect } from "react";
import AdminUsersPage from './pages/AdminUsersPage';


export const UserContext = createContext(null)

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
          <Route path="/user" element={<AccountPage />} />
          <Route path="/user/orders" element={<BuyerOrderPage />} />
          <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/products" element={<AdminProductsPage />} />
          <Route path="/products/:productID" element={<ProductViewPage cart={cart} setCart={setCart} />} />
          <Route path='/orders/:orderID' element={<OrderPage />} />
        </Routes>
      </UserContext.Provider>
      <Footer />
    </div>

  );
}

export default App;
