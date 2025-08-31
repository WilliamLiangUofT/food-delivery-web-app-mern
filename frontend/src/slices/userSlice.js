import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    email: "",
    password: ""
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserField: (state, action) => {
            const { fieldName, newValue } = action.payload;
            state[fieldName] = newValue;
        },
        resetUser: (state, action) => {
            state["name"] = "";
            state["email"] = "";
            state["password"] = "";
        }
    }
});

export const { setUserField, resetUser } = userSlice.actions;

export default userSlice.reducer;

