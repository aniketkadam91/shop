import { createContext, useReducer, useState } from "react";

export const CartContext = createContext({
    items:[],
    addItemToCart: () =>{}
})

function cartReducer(state,action){
    if(action.type == 'ADD_ITEM'){
        const exestingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );


        const updateItems = [...state.items];

        if(exestingCartItemIndex > -1){
            //const state.items[exestingCartItemIndex];
            const existingItem = state.items[exestingCartItemIndex];
            const updatedItem = {
                ...existingItem,
                quantity : existingItem.quantity + 1,
            };

            updateItems[exestingCartItemIndex] = updatedItem;


        }else{
            updateItems.push({...action.item, quantity : 1});
        }

        return { state , items : updateItems }

    }

    if(action.type == 'REMOVE_ITEM'){

        const exestingCartItemIndex = state.items.findIndex(

            (item) => item.id === action.item.id

        );

        const exestingCartItem = state.items[exestingCartItemIndex];
        const updatedItems = [...state.items];

        if( exestingCartItem.quantity === 1 ){

            updatedItems.splice( exestingCartItemIndex , 1);

        }else{
            const updatedItem = {
                ...exestingCartItem,
                quantity: exestingCartItem.quantity - 1,
            }

            return { state , updatedItem }
        }
        
    }

    return state;
}


export default function CartContextProvider({children}){

    // const [cartState,dispatchCartAction] =useState({
    //     items: [],
    // })

    // //console.log("hii");
    // const addItemToCartM = (meal_id) =>{
        
    //     updateCartState((prevState)=>{
    //         return{
    //             prevState,
    //             items: [...prevState.items,meal_id]
    //         }
    //     });
        
    // }

    const [cartState,dispatchCartAction] = useReducer(cartReducer,{ items: [] });

    

    function addItem(item){
        dispatchCartAction({ type: 'ADD_ITEM', item: item});
    }

    function removeItem(id){
        dispatchCartAction({ type: 'REMOVE_ITEM', id: id});
    }

    const ctxVal = {
        items: cartState.items,
        addItem: addItem,
        removeItem: removeItem
    }

    console.log(ctxVal);

    return <CartContext.Provider value={ctxVal}>
        {children}
    </CartContext.Provider>
}