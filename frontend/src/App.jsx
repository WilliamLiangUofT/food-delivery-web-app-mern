import NavBar from "./components/navbar/navbar"
import Home from "./pages/Home/home"
import Cart from "./pages/Cart/cart"
import PlaceOrder from "./pages/PlaceOrder/placeorder"
import { Routes, Route } from 'react-router'
import Footer from "./components/footer/footer"
import LoginPopup from "./components/loginPopup/loginPopup"
import { useState } from "react"
import Verify from "./pages/Verify/verify"
import Order from "./pages/Order/order"

function App() {

  const [showLoginPopup, setShowLoginPopup] = useState(false);

  return (
    <>
      <div className="main-app">
        <NavBar setShowLoginPopup={setShowLoginPopup}/>
        {showLoginPopup ? <LoginPopup setShowLoginPopup={setShowLoginPopup}/> : <></>}
        
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/order" element={<PlaceOrder/>}/>
          <Route path="/orders" element={<Order/>}/>
          <Route path="/verify" element={<Verify/>}/>
        </Routes>
        
      </div>
      <Footer/>
    </>
  )
}

export default App
