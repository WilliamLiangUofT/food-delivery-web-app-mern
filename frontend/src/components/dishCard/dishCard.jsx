import './dishCard.css'
import { assets } from '../../assets/assets';
import { useContext, useState } from 'react';
import { GlobalContext } from '../../context/ContextStore';

function DishCard({id, name, image, price, description, category}) {
    
    const {cartCounts, addToCart, removeFromCart} = useContext(GlobalContext);

    let controller;
    if (!(id in cartCounts) || cartCounts[id] === 0) {
        controller = (
            <img className='add' src={assets.add_icon_white} onClick={() => addToCart(id)}/>
        );
    } else {
        controller= (
            <div className='food-item-counter'>
                <img src={assets.remove_icon_red} onClick={() => removeFromCart(id)}/>
                <p>{cartCounts[id]}</p>
                <img src={assets.add_icon_green} onClick={() => addToCart(id)}/>
            </div>
        );
    }

    return (
        <div className='dish-card'>
            <img className='dish-image' src={`http://localhost:4000/images/${image}`}/>
            {controller}
            <div className='dish-info'>
                <div className='dish-rating'>
                    <p>{name}</p>
                    <img src={assets.stars}/>
                </div>
                
                <p className='dish-description'>{description}</p>
                <p className='dish-price'>{`\$${price}`}</p>
            </div>
        </div>
    );
}

export default DishCard;


