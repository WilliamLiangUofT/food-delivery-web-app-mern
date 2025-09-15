import { useEffect, useState } from 'react';
import { useListAllOrderQuery, useSetOrderStatusMutation } from '../../slices/adminAPISlices';
import './orders.css'
import { useDispatch } from 'react-redux';
import { setOrders, setStatus } from '../../slices/orderStatusSlices';

function Orders() {

    const { data, isLoading, error } = useListAllOrderQuery();
    const [allOrders, setAllOrders] = useState([]);

    const [setOrderStatus] = useSetOrderStatusMutation();

    const dispatch = useDispatch();

    useEffect(() => {
        if (data) {
            setAllOrders(data.orderInfo);

            const filterOrders = data.orderInfo.map(order => ({
                _id: order._id,
                order_status: order.order_status
            }));

            dispatch(setOrders(filterOrders));
        }
    }, [data]);

    const formatOrderItems = (itemOrderArray) => {
        return itemOrderArray.reduce((accumulator, currentValue) => {
            return accumulator += currentValue.name + " x" + currentValue.quantity + ", "; 
        }, "").slice(0, -2);
    };

    const orderStatusChange = async (orderId, newStatus) => {
        dispatch(setStatus({order_id: orderId, new_status: newStatus}));

        await setOrderStatus({order_id: orderId, orderStatus: newStatus}).unwrap();
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
                        <select id='processing-select' value={order_element.order_status} onChange={(e) => orderStatusChange(order_element._id, e.target.value)}>
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