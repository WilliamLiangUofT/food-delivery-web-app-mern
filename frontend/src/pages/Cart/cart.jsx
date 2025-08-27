import { useContext } from 'react';
import './cart.css'
import { GlobalContext } from '../../context/ContextStore';

function Cart() {

    const { cartCounts, food_list, removeFromCart } = useContext(GlobalContext);

    const filtered_food_list = food_list.filter(element => element._id in cartCounts && cartCounts[element._id] > 0)
    const totalCost = filtered_food_list.reduce((accumulator, element) => accumulator + element.price * cartCounts[element._id], 0);

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
                            <>
                                <div className='column-item-names cart-actual-item' key={element._id}>
                                    <img src={element.image}/>
                                    <p>{element.name}</p>
                                    <p>${element.price}</p>
                                    <p>{cartCounts[element._id]}</p>
                                    <p>${element.price * cartCounts[element._id]}</p>
                                    <p className='cross-remove-item' onClick={() => removeFromCart(element._id)}>x</p>
                                </div>
                                <hr/>
                            </>
                            
                        );
                    })}
            </div>
            <div className='cart-bottom'>
                <div className='cart-total'>
                    <h3>Cart Totals</h3>
                    <div>
                        
                        <div className='cart-total-details'>
                            <p>Subtotal</p>
                            <p>{totalCost}</p>
                        </div>
                        <hr/>
                        <div className='cart-total-details'>
                            <p>Delivery Fee</p>
                            <p>{filtered_food_list.length}</p>
                        </div>
                        <hr/>
                        <div className='cart-total-details' id='total-cart-value'>
                            <p>Total</p>
                            <p>{totalCost + filtered_food_list.length}</p>
                        </div>
                        
                    </div>
                    <button>PROCEED TO CHECKOUT</button>
                    
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
