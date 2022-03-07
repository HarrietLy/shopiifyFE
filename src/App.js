import { Route, Routes } from 'react-router-dom';
import './App.css';
import Card from "./components/Card"
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
import NavbarAdmin from './components/NavbarAdmin';
import OrderPage from './pages/OrderPage';
import { useState } from "react";

function App() {

  const [currentUser, setCurrentUser]=useState({role:'admin'})
  return (
    <div>

      {(currentUser.role!=='admin')?
      <Navbar />
      :<NavbarAdmin/>}

      <Routes>
        <Route path="/" element={<BuyerHomePage />} />
        <Route path="/user" element={<AccountPage />} />
        <Route path="/user/orders" element={<BuyerOrderPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route path="/admin/orders" element={<AdminOrdersPage />} />
        <Route path="/admin/products" element={<AdminProductsPage/>} />

        <Route path="/product/:productID" element={<ProductViewPage />} />
        {/* <Route path="/product/:productID/edit" element={<ProductEditPage />} /> */}

        <Route path='/orders/:orderID' element={<OrderPage/>} />
      </Routes>
      <Footer />
    </div>

  );
}

export default App;
