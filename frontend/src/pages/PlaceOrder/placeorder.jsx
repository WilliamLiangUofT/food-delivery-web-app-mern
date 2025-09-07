import { useContext, useEffect, useState } from 'react';
import './placeorder.css'
import { GlobalContext } from '../../context/ContextStore';
import { useNavigate } from 'react-router';
import { usePlaceOrderMutation, useGetCookieQuery } from '../../slices/apiSlice';

function PlaceOrder() {

    const { getCart, getCartTotalCost, cartCounts } = useContext(GlobalContext);
    const filtered_food_list = getCart();

    const [inputFieldValues, setInputFieldValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        phone: ""
    });

    const onInputChange = (e) => {
        const input_field_name = e.target.name;
        const input_field_value = e.target.value;

        setInputFieldValues(prevVal => ({...prevVal, [input_field_name]: input_field_value}));
    };

    const navigate = useNavigate();
    const [placeOrder] = usePlaceOrderMutation();
    const {data, isLoading, error} = useGetCookieQuery();

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            let orderItems = [];
            filtered_food_list.map((element, index) => {
                let item_info = {...element};
                item_info["quantity"] = cartCounts[element._id];
                orderItems.push(item_info);
            });

            const payload = {
                userId: data.userInfo._id,
                items: orderItems,
                subTotalAmount: getCartTotalCost(),
                deliveryFee: filtered_food_list.length,
                address: inputFieldValues
            };

            const response = await placeOrder(payload).unwrap();
            if (response.success) {
                const {sessionURL} = response;
                window.location.replace(sessionURL);
            }

        } catch (error) {
            alert(`ERROR: Status: ${error.status} Message: ${error.message}`)
        }
    };

    return (
        <form className='place-order'>
            <div className='place-order-left'>
                <h2>Delivery Information</h2>

                <div className='order-grid-area'>
                    <input name='firstName' value={inputFieldValues.firstName} onChange={onInputChange} type="text" placeholder='First name'/>
                    <input name='lastName' value={inputFieldValues.lastName} onChange={onInputChange} type="text" placeholder='Last name'/>

                    <input name='email' value={inputFieldValues.email} onChange={onInputChange} id='delivery-email-input' type="email" placeholder='Email address'/>
                    <input name='street' value={inputFieldValues.street} onChange={onInputChange} id='street-input' type="text" placeholder='Street'/>

                    <input name='city' value={inputFieldValues.city} onChange={onInputChange} type="text" placeholder='City'/>
                    <input name='state' value={inputFieldValues.state} onChange={onInputChange} type="text" placeholder='State'/>

                    <input name='zipCode' value={inputFieldValues.zipCode} onChange={onInputChange} type="text" placeholder='Zip code'/>
                    <input name='country' value={inputFieldValues.country} onChange={onInputChange} type="text" placeholder='Country'/>

                    <input name='phone' value={inputFieldValues.phone} onChange={onInputChange} id='phone-input' type="text" placeholder='Phone'/>
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

                    <button type="submit" onClick={onSubmitHandler}>PROCEED TO PAYMENT</button>
                    
                </div>


            </div>
        </form>
    );
}

export default PlaceOrder;
