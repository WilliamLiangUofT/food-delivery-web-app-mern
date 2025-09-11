import { useEffect } from 'react';
import { useListOrderQuery } from '../../slices/adminAPISlices';
import './orders.css'

function Orders() {

    const { data, isLoading, error } = useListOrderQuery();

    useEffect(() => {
        if (data) {
            console.log(data)
        }
    }, [data]);

    return (
        <div className='order-items-container'>
            <h2>All Orders</h2>
        </div>
    );
}

export default Orders;