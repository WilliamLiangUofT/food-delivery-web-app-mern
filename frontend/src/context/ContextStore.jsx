import { createContext, useState } from "react";
import { food_list } from "../assets/assets";
import { useGetItemsQuery } from "../slices/apiSlice";
import { useEffect } from "react";

export const GlobalContext = createContext();

function ContextStoreProvider({children}) {

    const [foodList, setFoodList] = useState([]);

    const [cartCounts, setCartCounts] = useState({});

    const [userSignedIn, setUserSignedIn] = useState(false);

    const { data, isLoading, error } = useGetItemsQuery();

    useEffect(() => {
        if (data) {
            setFoodList(data.data);
        }
    }, [data]);

    const addToCart = (dishID) => {
        if (dishID in cartCounts) {
            setCartCounts(prevCartCounts => ({...prevCartCounts, [dishID]: prevCartCounts[dishID] + 1}));
        } else {
            setCartCounts(prevCartCounts => ({...prevCartCounts, [dishID]: 1}));
        }
    };

    const removeFromCart = (dishID) => {
        setCartCounts(prevCartCounts => ({...prevCartCounts, [dishID]: prevCartCounts[dishID] - 1}));
    };

    const getCart = () => {
        return foodList.filter(element => element._id in cartCounts && cartCounts[element._id] > 0);
    };

    const getCartTotalCost = () => {
        const filter_food_list = getCart();
        const theTotalCost = filter_food_list.reduce((accumulator, element) => accumulator + element.price * cartCounts[element._id], 0);
        
        return theTotalCost;
    };

    const context = {
        foodList,
        cartCounts,
        setCartCounts,
        addToCart,
        removeFromCart,
        getCart,
        getCartTotalCost,
        userSignedIn,
        setUserSignedIn
    };

    return (
        <GlobalContext.Provider value={context}>
            {children}
        </GlobalContext.Provider>
    );
}

export default ContextStoreProvider;