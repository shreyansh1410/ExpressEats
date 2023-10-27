import { useSelector } from "react-redux";
import FoodItems from "./FoodItems";
import { useDispatch } from "react-redux";
import { clearCart } from "../Utils/cartSlice";

const Cart = () =>{
    
    const cartItems = useSelector((store) => store.cart.items);
    console.log(cartItems);
    console.log(2);
    const dispatch = useDispatch();
    const handleClearCart = () => {
        dispatch(clearCart());
    }
    return(
        <>
            <h1 className="font-bold text-3xl">Cart Items: {cartItems.length}</h1>
            <button className="bg-red-500 p-2 m-8 rounded-md" onClick={handleClearCart}>Clear Cart</button>
            <div className="flex ">
            {cartItems.map((item, index) => (
                <FoodItems key={item.id} {...item}/>
            ))}
            </div>
        </>
    )
}

export default Cart;