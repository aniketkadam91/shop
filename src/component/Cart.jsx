import Modal from "./Modal";

import CartContextProvider from "../store/cart-context";
import { useContext } from "react";

import { CartContext } from "../store/cart-context";
//import CartContextProvider from "../store/cart-context";
import {UserContext} from "../store/userProgress";
import {currencyFormater} from '../util/CurrenyFormater.js'

const Cart = () =>{

    const cartData = useContext(CartContext);
    const userCtx = useContext(UserContext);

    //console.log(cartData.items);

    const cartTotal = cartData.items.reduce(getSum, 0);

    function getSum(total, item) {
        return total + item.quantity * item.price;
    }

    console.log(userCtx.progress);

    function closeCart(){
        userCtx.hideCart();
    }

    return (
        <>
        <Modal open={userCtx.progress}>
            <div className="cart">
            <h2>Your Cart</h2>
                <div className="items-list">
                    <ul>
                        {cartData.items.map((item)=>{
                            return <li className="cart-item" key={item.id}>
                               {item.name} - {item.quantity}
                                </li>
                        })}
                    </ul>
                    <p className="cart-total">Total Price:{currencyFormater.format(cartTotal)}</p>
                </div>
                <div className="modal-actions">
                        <button className="textOnly" onClick={closeCart}>Close</button>
                        <button className="button">Checkout</button>
                </div>
            </div>
                
           
        </Modal>
        </>
    )
}

export default Cart;