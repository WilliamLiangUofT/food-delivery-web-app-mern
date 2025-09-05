import { createContext, useState } from "react";
import { useGetItemsQuery, useGetCookieQuery, useAddCartMutation, useRemoveCartMutation, useListCartQuery } from "../slices/apiSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserField } from "../slices/userSlice";

export const GlobalContext = createContext();

function ContextStoreProvider({children}) {

    const dispatch = useDispatch();

    const [foodList, setFoodList] = useState([]);

    const [cartCounts, setCartCounts] = useState({});

    const [databaseCartCounts, setDatabaseCartCounts] = useState({});

    const [userSignedIn, setUserSignedIn] = useState(false);

    const [cookieExist, setCookieExist] = useState(false);

    const { data: itemsData, isLoading: itemsLoading, isError: itemsIsError, error: itemsError} = useGetItemsQuery();
    const { data: cookiesData, isLoading: cookiesLoading, isError: cookieIsError, error: cookiesError} = useGetCookieQuery();
    const {data: listCartData, isLoading, error} = useListCartQuery();

    const [addCart] = useAddCartMutation();
    const [removeCart] = useRemoveCartMutation();

    useEffect(() => {
        if (listCartData) {
            setDatabaseCartCounts(listCartData.cart_items);
        }
    }, [listCartData]);

    useEffect(() => {
        if (itemsData) {
            setFoodList(itemsData.data);
        }
    }, [itemsData]);

    useEffect(() => {
        if (cookiesData?.success) {
            setCookieExist(true);

            cookiesData.userInfo
        } else {
            setCookieExist(false);
        }
    }, [cookiesData]);

    const addToCart = (dishID) => {
        if (dishID in cartCounts) {
            setCartCounts(prevCartCounts => ({...prevCartCounts, [dishID]: prevCartCounts[dishID] + 1}));
        } else {
            setCartCounts(prevCartCounts => ({...prevCartCounts, [dishID]: 1}));
        }

        if (cookieExist) {
            addCart({item_id: dishID});
        }
    };

    const removeFromCart = (dishID) => {
        setCartCounts(prevCartCounts => ({...prevCartCounts, [dishID]: prevCartCounts[dishID] - 1}));

        if (cookieExist) {
            removeCart({item_id: dishID});
        }
    };

    useEffect(() => {
        if (cookieExist) {
            setCartCounts({...databaseCartCounts});
            dispatch(setUserField({
                fieldName: "name",
                newValue: cookiesData.userInfo.name
            }));
            setUserSignedIn(true);
        } else {
            setCartCounts({});
        }
    }, [cookieExist, databaseCartCounts]);

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
        setUserSignedIn,
        cookieExist
    };

    return (
        <GlobalContext.Provider value={context}>
            {children}
        </GlobalContext.Provider>
    );
}

export default ContextStoreProvider;