import NavBar from "./components/navbar/navbar"
import Home from "./pages/Home/home"
import Cart from "./pages/Cart/cart"
import PlaceOrder from "./pages/PlaceOrder/placeorder"
import { Routes, Route } from 'react-router'
import Footer from "./components/footer/footer"

function App() {
  return (
    <>
      <div className="main-app">
        <NavBar/>

        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/order" element={<PlaceOrder/>}/>
        </Routes>
        
      </div>
      <Footer/>
    </>
  )
}

export default App
