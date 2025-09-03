import './navbar.css'
import { assets } from '../../assets/assets';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { GlobalContext } from '../../context/ContextStore';
import { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutUserMutation } from '../../slices/apiSlice';
import { resetUser } from '../../slices/userSlice';

function NavBar({setShowLoginPopup}) {
    const [menuSelected, setMenuSelected] = useState("home");

    const { userSignedIn, setUserSignedIn } = useContext(GlobalContext);

    const userData = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [ logoutUser ] = useLogoutUserMutation();

    const onLogoutUserHandler = () => {
        logoutUser();
        dispatch(resetUser());
        setUserSignedIn(false);
        navigate('/');
    };

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
                {userSignedIn ? 
                <div className='navbar-profile'>
                    <h2 className='login-name-h2'>{userData.name}</h2>
                    <ul className='nav-profile-dropdown'>
                        
                        <li><img src={assets.bag_icon}/><p>Orders</p></li>
                        <hr/>
                        <li onClick={onLogoutUserHandler}><img src={assets.logout_icon}/><p>Logout</p></li>
                    </ul>
                </div>
                : <button onClick={() => setShowLoginPopup(true)}>Sign In</button>}
            </div>
        </div>
    );
}

export default NavBar;