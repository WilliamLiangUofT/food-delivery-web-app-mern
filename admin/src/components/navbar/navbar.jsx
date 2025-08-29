import './navbar.css'
import { assets } from '../../assets/assets.js';

function NavBar() {
    return (
        <div className='navbar-component'>
            <div className='foodi-logo'>
                <h2>Foodi</h2>
                <h4>Admin Panel</h4>
            </div>
            <div className='profile-area'>
                <img src={assets.userProfile}/>
                <h3>Admin</h3>
            </div>
        </div>
    );
}

export default NavBar;