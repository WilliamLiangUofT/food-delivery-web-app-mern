import { useContext } from 'react';
import './placeorder.css'
import { GlobalContext } from '../../context/ContextStore';
import { useNavigate } from 'react-router';

function PlaceOrder() {

    const { getCart, getCartTotalCost } = useContext(GlobalContext);
    const filtered_food_list = getCart();

    const navigate = useNavigate();

    return (
        <form className='place-order'>
            <div className='place-order-left'>
                <h2>Delivery Information</h2>

                <div className='order-grid-area'>
                    <input type="text" placeholder='First name'/>
                    <input type="text" placeholder='Last name'/>

                    <input id='delivery-email-input' type="email" placeholder='Email address'/>
                    <input id='street-input' type="text" placeholder='Street'/>

                    <input type="text" placeholder='City'/>
                    <input type="text" placeholder='State'/>

                    <input type="text" placeholder='Zip code'/>
                    <input type="text" placeholder='Country'/>

                    <input id='phone-input' type="text" placeholder='Phone'/>
                </div>
            </div>

            <div className='place-order-right'>



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

                    <button type="button" onClick={() => navigate('/')}>PROCEED TO PAYMENT</button>
                    
                </div>


            </div>
        </form>
    );
}

export default PlaceOrder;
