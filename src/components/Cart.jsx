import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FoodItems from './FoodItems';
import { clearCart } from '../Utils/cartSlice';
import { Link } from 'react-router-dom';
import Modal from './Modal'; // Import the Modal component
import Login from './Login'; // Import the Login component

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const openLoginModal = () => {
    setIsModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsModalOpen(false);
  };

  if (user) {
    return (
      <div>
        <h1 className="font-bold text-3xl">Cart Items: {cartItems.length}</h1>
        <button
          className="bg-red-500 p-2 m-8 rounded-md text-white"
          onClick={handleClearCart}
        >
          Clear Cart
        </button>
        <div className="flex flex-wrap">
          {cartItems.map((item) => (
            <FoodItems key={item.id} {...item} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          You are not signed in
        </h1>
        <p className="text-gray-600 mb-4">
          Please sign in to access your cart.
        </p>
        <button
          onClick={openLoginModal}
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Sign In
        </button>
        
        <Modal isOpen={isModalOpen} onClose={closeLoginModal}>
          <Login />
        </Modal>
      </div>
    );
  }
};

export default Cart;
