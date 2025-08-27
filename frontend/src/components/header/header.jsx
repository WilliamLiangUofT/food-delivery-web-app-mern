import './header.css'
import { assets } from '../../assets/assets';

function Header() {

    return (
        <div className='header-element'>
            <div className='header-contents'>
                <h2>Order your favourite foods and enjoy within minutes!</h2>
                <p>Delicious food is waiting for you just down the corner! Simply order here online from the comfort of your own home and your food will arrive within minutes.</p>
                <div className='view-buttons'>
                    <button>View Menu</button>
                    <button>Contact Us</button>
                </div>
            </div>
        </div>
    );
}

export default Header;

