import { useEffect, useState } from 'react';
import { useListAllOrderQuery } from '../../slices/adminAPISlices';
import './orders.css'

function Orders() {

    const { data, isLoading, error } = useListAllOrderQuery();
    const [allOrders, setAllOrders] = useState([]);

    useEffect(() => {
        if (data) {
            console.log(data.orderInfo);
            setAllOrders(data.orderInfo);
        }
    }, [data]);

    const formatOrderItems = (itemOrderArray) => {
        return itemOrderArray.reduce((accumulator, currentValue) => {
            return accumulator += currentValue.name + " x" + currentValue.quantity + ", "; 
        }, "").slice(0, -2);
    };

    return (
        <div className='order-items-container'>
            <h2>All Orders</h2>
            {allOrders.map((order_element, order_index) => {
                return (
                    <div className='admin-order-items-grid' key={order_index}>
                        <p id='listed-names'>{formatOrderItems(order_element.items)}</p>
                        <p># of Items: {order_element.items.length}</p>
                        <p>${order_element.subTotalAmount + order_element.deliveryFee}</p>
                        <select id='processing-select'>
                            <option>Food Processing</option>
                            <option>Out for Delivery</option>
                            <option>Delivered</option>
                        </select>
                        <div className='admin-order-item-address'>
                            <p id='admin-order-name'>{order_element.address.firstName + " " + order_element.address.lastName}</p>
                            <div className='admin-exact-address'>
                                <p>{order_element.address.street + ", "}</p>
                                <p>{order_element.address.city + ", " + order_element.address.state + ", " + order_element.address.country}</p>
                                <p>{order_element.address.zipCode}</p>
                            </div>
                            <p>{order_element.date}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Orders;