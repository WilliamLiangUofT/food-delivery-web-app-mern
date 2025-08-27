import './navbar.css'
import { assets } from '../../assets/assets';
import { useState } from 'react';

function NavBar() {
    const [menuSelected, setMenuSelected] = useState("");

    return (
        <div className="navigation-bar">
            <div className='logo'>
                <h2>Foodi</h2>
            </div>
            <div className='middle'>
                <ul>
                    <li className={menuSelected === "home" ? "active" : ""} onClick={() => setMenuSelected(m => "home")}>Home</li>
                    <li className={menuSelected === "menu" ? "active" : ""} onClick={() => setMenuSelected(m => "menu")}>Menu</li>
                    <li className={menuSelected === "about" ? "active" : ""} onClick={() => setMenuSelected(m => "about")}>About us</li>
                    <li className={menuSelected === "contact" ? "active" : ""} onClick={() => setMenuSelected(m => "contact")}>Contact</li>
                </ul>
            </div>
            <div className='right-side'>
                <img src={assets.searchbar} id='search-bar'/>
                <img src={assets.cart} id='cart-icon'/>
                <button>Sign In</button>
            </div>
        </div>
    );
}

export default NavBar;