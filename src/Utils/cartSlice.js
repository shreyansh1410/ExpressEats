import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],  
    },
    reducers:{
        addItem: (state, action) => {            
            state.items.push(action.payload)
           
        },
        removeItem: (state, action) => {
            state.items.pop;
        },
        clearCart: (state) => {
            state.items = [];
        },
    }
})

export const {addItem, removeItem, clearCart} = cartSlice.actions;
export default cartSlice.reducer;

//initial state is an empty array
//addItem is the action that will happen when the reducer is called, the fucntion inside the addItem is called reducer funciton
//state is the initial state and action is the data coming in
//action.payload is used to receive the passed data
//reducer function does not return anyhting, it only takes a state and modifies it
//recuder (singular) is exported by default.
//actions (plural) are exported by name