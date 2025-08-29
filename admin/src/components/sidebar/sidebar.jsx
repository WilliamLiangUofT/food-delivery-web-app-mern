import './sidebar.css'
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router';

function SideBar() {
    return (
        <div className='sidebar-component'>
            <NavLink to='/addItem' className='sidebar-options'>
                <img src={assets.add_icon}/>
                <p>Add Items</p>
            </NavLink>
            <NavLink to='/listItems' className='sidebar-options'>
                <img src={assets.order_icon}/>
                <p>List Items</p>
            </NavLink>
            <NavLink to='/orders' className='sidebar-options'>
                <img src={assets.order_icon}/>
                <p>Orders</p>
            </NavLink>
        </div>
    );
}

export default SideBar;

