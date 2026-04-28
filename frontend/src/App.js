import { Container } from 'react-bootstrap'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import Header from './components/Header'
import Footer from './components/Footer';
import Mens from './components/Mens';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import AboutUs from './components/AboutUs';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen';
import Womens from './components/Womens';
import Electronics from './components/Electronics';
import Footwear from './components/Footwear';
import Foots from './components/Footwear';
import keepAliveService from './services/keepAliveService';


function App() {
  // Configure axios to use the correct API URL
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
  axios.defaults.baseURL = apiUrl;
  
  useEffect(() => {
    // Start keep-alive service to prevent Render free tier cold start
    keepAliveService.start();

    return () => {
      // Cleanup: stop keep-alive when component unmounts
      keepAliveService.stop();
    };
  }, []);
  return (
    <Router >
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} /> 
            <Route path="/about" element={<AboutUs />} />
            <Route path="/categories/men" element={<Mens />} />
            <Route path="/categories/women" element={<Womens />} />
            <Route path="/categories/electronic" element={<Electronics />} />
            <Route path="/categories/footwear" element={<Footwear />} />
            
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />

            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/order/:id" element={<OrderScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart/:id?" element={<CartScreen />} />

            <Route path="/admin/userlist" element={<UserListScreen />} />
            <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />

            <Route path="/admin/productlist" element={<ProductListScreen />} />
            <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />

            <Route path="/admin/orderlist" element={<OrderListScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
