import { useContext } from 'react';
import './cart.css'
import { GlobalContext } from '../../context/ContextStore';
import { useNavigate } from 'react-router';
import React from 'react';
import { Fragment } from 'react';

function Cart() {

    const { cartCounts, removeFromCart, getCart, getCartTotalCost } = useContext(GlobalContext);
    const filtered_food_list = getCart();
    const navigate = useNavigate();

    return (
        <div className='cart-page'>
            <div className='cart-added-items'>
                <div className='column-item-names'>
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <hr/>
                {filtered_food_list
                    .map((element, index) => {
                        return (
                            <React.Fragment key={element._id}>
                                <div className='column-item-names cart-actual-item'>
                                    <img src={`http://localhost:4000/images/${element.image}`}/>
                                    <p>{element.name}</p>
                                    <p>${element.price}</p>
                                    <p>{cartCounts[element._id]}</p>
                                    <p>${element.price * cartCounts[element._id]}</p>
                                    <p className='cross-remove-item' onClick={() => removeFromCart(element._id)}>x</p>
                                </div>
                                <hr/>
                            </React.Fragment>
                            
                        );
                    })}
            </div>
            <div className='cart-bottom'>
                <div className='cart-total'>
                    <h3>Cart Totals</h3>
                    <div>
                        
                        <div className='cart-total-details'>
                            <p>Subtotal</p>
                            <p>${getCartTotalCost()}</p>
                        </div>
                        <hr/>
                        <div className='cart-total-details'>
                            <p>Delivery Fee</p>
                            <p>${filtered_food_list.length}</p>
                        </div>
                        <hr/>
                        <div className='cart-total-details' id='total-cart-value'>
                            <p>Total</p>
                            <p>${getCartTotalCost() + filtered_food_list.length}</p>
                        </div>
                        
                    </div>

                    <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
                    
                </div>
                <div className='promo-code'>
                    <p>If you have a promo code, enter it here!</p>
                    <div className='promo-code-area'>
                        <input type='text' placeholder='Promo code'/>
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
