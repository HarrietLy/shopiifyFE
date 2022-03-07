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
import OrderPage from './pages/OrderPage';
import { useState, createContext } from "react";


export const UserContext = createContext(null)

function App() {
  
  const [currentUser, setCurrentUser] = useState('')

  return (
    <div>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<BuyerHomePage />} />
          <Route path="/user" element={<AccountPage />} />
          <Route path="/user/orders" element={<BuyerOrderPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
          <Route path="/admin/products" element={<AdminProductsPage />} />
          <Route path="/products/:productID" element={<ProductViewPage />} />
          <Route path='/orders/:orderID' element={<OrderPage />} />
        </Routes>
      </UserContext.Provider>
      <Footer />
    </div>

  );
}

export default App;
