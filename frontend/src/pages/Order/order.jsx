import { useEffect, useState } from 'react';
import { useListOrderQuery } from '../../slices/apiSlice';
import './order.css'

function Order() {
    const {data, isLoading, error} = useListOrderQuery();
    const [orderDataList, setOrderDataList] = useState([]);

    useEffect(() => {
        if (data) {
            setOrderDataList(data.orderInfo);
            console.log(data.orderInfo)
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

    return (
        <div className='user-orders'>
            <h2>Your Orders</h2>
            {orderDataList.map((element, index) => {
                return (
                    <div className='order-id-info' key={index}>
                        <div className='order-status-top'>
                            <p className='order-status-id'>Order ID #{element._id}</p>
                            <button className='order-status-button'>{element.order_status}</button>
                        </div>

                        <div className='order-status-grid'>
                            
                        </div>
                        
                    </div>
                );
            })}
        </div>
    )
}

export default Order;
