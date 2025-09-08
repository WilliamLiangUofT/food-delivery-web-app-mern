import { useNavigate, useSearchParams } from "react-router";
import { useVerifyOrderMutation } from "../../slices/apiSlice";
import { useEffect, useState } from "react";

function Verify() {

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const successfulQuery = searchParams.get('success');
    const orderIdQuery = searchParams.get('orderId');

    const [verifyOrder] = useVerifyOrderMutation();

    const [errorHandler, setErrorHandler] = useState(false);

    const verifyPayment = async () => {
        if (!successfulQuery || !orderIdQuery) {
            navigate('/');
        }

        const payload = {
            success: successfulQuery,
            orderId: orderIdQuery
        }

        try {
            const response = await verifyOrder(payload);
            if (response.data.success) {
                navigate('/orders')
            } else {
                navigate('/');
            }
        } catch (error) {
            navigate('/');
        }
        
    };

    useEffect(() => {
        verifyPayment();
    }, []);

    if (errorHandler) {
        return (
            <h1>ERROR. INTERNAL SERVER ERROR 500</h1>
        )
    }

    return (
        <div>
            Verifying...
        </div>
    );
}

export default Verify;