import { useContext } from 'react'
import './dishDisplay.css'
import { GlobalContext } from '../../context/ContextStore';
import DishCard from '../dishCard/dishCard';

function DishDisplay({category}) {
    const dish_menu = useContext(GlobalContext);

    return (
        <div className='dish-display-container'>
            <h2>Top Dishes Near You</h2>
            <div className='dish-grid'>
                {dish_menu.foodList.map((card, index) => {
                    if (category === "" || category === card.category) {
                        return (
                            <DishCard key={index} id={card._id} name={card.name} image={card.image} price={card.price} description={card.description}/>
                        );
                    }
                })}
            </div>
        </div>
    );
}

export default DishDisplay;
