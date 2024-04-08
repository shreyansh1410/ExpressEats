import { useSelector } from "react-redux";
import FoodItems from "./FoodItems";
import { useDispatch } from "react-redux";
import { clearCart } from "../Utils/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const user = useSelector((state) => state.user);
  console.log("User is: " + user);
  // console.log(cartItems);
  // console.log(2);
  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  if(user){
    return(
        <div>
          <h1 className="font-bold text-3xl">Cart Items: {cartItems.length}</h1>
          <button
            className="bg-red-500 p-2 m-8 rounded-md"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
          <div className="flex ">
            {cartItems.map((item, index) => (
              <FoodItems key={item.id} {...item} />
            ))}
          </div>
        </div>
      );
  }else{return <div>You are not signed in, please sign in to access this page!</div>
  };
};

export default Cart;
