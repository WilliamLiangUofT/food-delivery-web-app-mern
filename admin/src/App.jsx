import NavBar from "./components/navbar/navbar"
import SideBar from "./components/sidebar/sidebar"
import './App.css'
import { Route, Routes } from "react-router"
import AddItem from "./pages/AddItem/addItem";
import ListItems from "./pages/ListItems/listItems";
import Orders from "./pages/Orders/orders";
import AdminLogin from "./pages/AdminLogin/adminLogin";

function App() {

  return (
    <div className="admin-grid-area">

      <NavBar/>

      <SideBar/>

      <div>
        <Routes>
          <Route path="/" element={<AdminLogin/>} />
          <Route path="/addItem" element={<AddItem/>} />
          <Route path="/listItems" element={<ListItems/>} />
          <Route path="/orders" element={<Orders/>} />
        </Routes>
      </div>
      
    </div>
  )
}

export default App
