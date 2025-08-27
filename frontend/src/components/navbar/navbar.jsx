import './navbar.css'
import { assets } from '../../assets/assets';
import { useState } from 'react';
import { Link } from 'react-router';

function NavBar({setShowLoginPopup}) {
    const [menuSelected, setMenuSelected] = useState("home");

    return (
        <div className="navigation-bar">
            <div className='logo'>
                <h2>Foodi</h2>
            </div>
            <div className='middle'>
                <ul>
                    <Link to="/" className={menuSelected === "home" ? "active" : ""} onClick={() => setMenuSelected(m => "home")}>Home</Link>
                    <a href='#explore-menu' className={menuSelected === "menu" ? "active" : ""} onClick={() => setMenuSelected(m => "menu")}>Menu</a>
                    <a href='#download-app' className={menuSelected === "about" ? "active" : ""} onClick={() => setMenuSelected(m => "about")}>About us</a>
                    <a href='#footer' className={menuSelected === "contact" ? "active" : ""} onClick={() => setMenuSelected(m => "contact")}>Contact</a>
                </ul>
            </div>
            <div className='right-side'>
                <img src={assets.searchbar} id='search-bar'/>
                <img src={assets.cart} id='cart-icon'/>
                <button onClick={() => setShowLoginPopup(true)}>Sign In</button>
            </div>
        </div>
    );
}

export default NavBar;