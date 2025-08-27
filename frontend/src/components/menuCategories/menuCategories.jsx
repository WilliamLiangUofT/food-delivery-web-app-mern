import './menuCategories.css'
import { menu_items } from '../../assets/assets';

function MenuCategories({menuCategory, setMenuCategory}) {
    return (
        <div className='explore-menu-container' id='explore-menu'>
            <div className='header-title'>
                <h3>Explore Our Menu</h3>
            </div>
            <p>
                Choose from a wide variety of delectable foods in our diverse menu in the groupings below.
                Our mission is to provide you with affordable and fresh food that satisfies your cravings, no matter where in the world you currently are.
            </p>
            <div className='menu-categories'>
                {menu_items.map((menuItem, index) => {
                    return (
                        <div onClick={() => setMenuCategory(prev => prev === menuItem.food_type ? "" : menuItem.food_type)} key={index} className='menu-item'>
                            <img className={menuCategory === menuItem.food_type ? "active" : ""} src={menuItem.food_img}/>
                            <h3>{menuItem.food_type}</h3>
                        </div>
                    );
                })}
            </div>
            <hr />
        </div>
    );
}

export default MenuCategories;
