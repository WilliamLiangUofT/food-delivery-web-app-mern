import { createContext, useState } from "react";
import { food_list } from "../assets/assets";

export const GlobalContext = createContext();

function ContextStoreProvider({children}) {
    const [cartCounts, setCartCounts] = useState({});

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

    const context = {
        food_list,
        cartCounts,
        setCartCounts,
        addToCart,
        removeFromCart
    };

    return (
        <GlobalContext.Provider value={context}>
            {children}
        </GlobalContext.Provider>
    );
}

export default ContextStoreProvider;