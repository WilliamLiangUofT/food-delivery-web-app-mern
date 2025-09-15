import { useEffect, useState } from 'react';
import { useListOrderQuery } from '../../slices/apiSlice';
import './order.css'
import { useNavigate } from 'react-router';
import React from 'react';
import { assets } from '../../assets/assets';

function Order() {
    const {data, isLoading, error, refetch} = useListOrderQuery();
    const [orderDataList, setOrderDataList] = useState([]);
    const [invalidAuth, setInvalidAuth] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        refetch();
    }, [])

    useEffect(() => {
        if (data) {
            if (data.success) {
                setOrderDataList(data.orderInfo);
            } else {
                setInvalidAuth(true);
            }
        }
    }, [data]);

    if (isLoading) {
        return (
            <div>
                <h2>Loading orders...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <h2>Error loading orders</h2>
                <p>{error.message}</p>
            </div>
        );
    }

    if (invalidAuth) {
        return (
            <div>
                <h2>403 FORBIDDEN</h2>
                <p>You are not allowed to visit the page you were looking for.</p>
                <button onClick={() => navigate('/')}>Go Home</button>
            </div>
        );
    }

    return (
        <div className='user-orders'>
            <h2>Your Orders</h2>
            {orderDataList.map((order_element, index) => {
                const orderItems = order_element.items;
                return (
                    <div className='order-id-info' key={index}>
                        <div className='order-status-top'>
                            <p className='order-status-id'>Order ID #{order_element._id}</p>
                            <button className='order-status-button'>{order_element.order_status}</button>
                        </div>

                        <div className='order-status-grid'>
                            <p>Items</p>
                            <p>Quantity</p>
                            <p>Price</p>
                            <p>Total Price</p>

                            {orderItems.map((item_element, item_index) => {
                                return (
                                    <React.Fragment key={item_index}>
                                        <div className='order-status-title'>
                                            <div className='order-status-title-left'>
                                                <img src={`http://localhost:4000/images/${item_element.image}`} className='order-image-icon'/>
                                            </div>

                                            <div className='order-status-title-right'>
                                                <span id='main-course'>MAIN COURSE</span>
                                                <span>{item_element.name}</span>
                                                <img src={assets.stars} className='order-stars'/>
                                            </div>
                                        </div>
                                        
                                        <p>{item_element.quantity}</p>
                                        <p>${item_element.price}</p>
                                        <p>${item_element.price * item_element.quantity}</p>
                                    </React.Fragment>
                                );
                            })}
                        </div>
                        
                    </div>
                );
            })}
        </div>
    )
}

export default Order;
