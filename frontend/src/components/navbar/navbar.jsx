import './navbar.css'
import { assets } from '../../assets/assets';
import { useState } from 'react';
import { Link } from 'react-router';
import { GlobalContext } from '../../context/ContextStore';
import { useContext } from 'react';
import { useSelector } from 'react-redux';

function NavBar({setShowLoginPopup}) {
    const [menuSelected, setMenuSelected] = useState("home");

    const { userSignedIn } = useContext(GlobalContext);

    const userData = useSelector((state) => state.user);

    return (
        <div className="navigation-bar">
            <div className='logo'>
                <Link to='/'><h2>Foodi</h2></Link>
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
                <Link to='/cart'><img src={assets.cart} id='cart-icon'/></Link>
                {userSignedIn ? <h2 className='login-name-h2'>{userData.name}</h2> : <button onClick={() => setShowLoginPopup(true)}>Sign In</button>}
            </div>
        </div>
    );
}

export default NavBar;