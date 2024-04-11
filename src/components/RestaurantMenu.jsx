// import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import {
  IMG_URL_CDN,
  swiggy_menu_api_URL,
  RESTAURANT_TYPE_KEY,
  MENU_ITEM_TYPE_KEY,
  ITEM_IMG_CDN_URL,
} from "../Utils/constants";
import useRestaurant from "../Utils/useRestaurant";
import { addItem } from "../Utils/cartSlice";
import { useDispatch } from "react-redux";

const RestaurantMenu = () => {
  const { resId } = useParams();
  // console.log(resId);

  const dispatch = useDispatch();
  const addFoodItem = (item) => {
    dispatch(addItem(item)); //dispatching an action (adding item to cart)
  };

  const [restaurant, menuItems] = useRestaurant(
    swiggy_menu_api_URL,
    resId,
    RESTAURANT_TYPE_KEY,
    MENU_ITEM_TYPE_KEY
  );

  const rating = restaurant?.avgRating;

  return !restaurant ? (
    <Shimmer />
  ) : (
    <div className="restaurant-menu font-quicksand">
      <div className="restaurant-summary mx-9 my-3 flex justify-evenly flex-wrap shadow-md p-6 hover:shadow-lg rounded-lg">
        <div className="restaurantImage w-80 ">
          <img
            className="restaurant-img rounded-lg"
            src={IMG_URL_CDN + restaurant?.cloudinaryImageId}
            alt={restaurant?.name}
          />
        </div>
        <div className="restaurant-summary-details my-3">
          <h2 className="restaurant-title text-5xl py-4 font-quicksand">
            {restaurant?.name}
          </h2>
          <p className="restaurant-title text-xl">
            {" "}
            {restaurant?.areaName}, {restaurant?.locality}{" "}
          </p>
          <p className="restaurant-tags">{restaurant?.cuisines?.join(", ")}</p>

          <div className="restaurant-details">
            <div
              className="restaurant-rating"
              style={
                rating < 4
                  ? { backgroundColor: "var(--light-red)" }
                  : restaurant?.avgRating === "--"
                  ? { backgroundColor: "white", color: "black" }
                  : { color: "green" }
              }
            >
              <i className="fa-solid fa-star"></i>
              <span className="text-xl">{restaurant?.avgRating}</span>
            </div>
            <div className="">{restaurant?.sla?.slaString}</div>
            <div className="">{restaurant?.costForTwoMessage}</div>
          </div>
        </div>
      </div>
      <div className="restaurant-menu-content">
        <div className="menu-items-container">
          <div className="menu-title-wrap mx-9 my-6 flex justify-center">
            <h3 className="menu-title text-3xl font-bold">Recommended</h3>
          </div>
          <div className="flex justify-center text-xl ">
            {menuItems.length} items available
          </div>
          <div className="menu-items-list flex justify-evenly flex-col">
            {menuItems.map((item, index) => (
              
              <div
                className="flex justify-around menu-item w-full mx-3 my-3 h-[300px] hover:shadow-2xl p-8 hover:bg-gray-100"
                key={item?.id}
              >
                
                <div className="menu-item-details">
                  <h3 className="item-title text-2xl">{item?.name}</h3>
                  <p className="item-cost">
                    {item?.price > 0
                      ? new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(item?.price / 100)
                      : " "}
                  </p>
                  { <p className="item-desc">{item?.description}</p> }
                </div>
                <div className="menu-img-wrapper">
                  {item?.imageId && (
                    <img
                      className="menu-item-img w-[250px] h-[150px] rounded-md"
                      src={ITEM_IMG_CDN_URL + item?.imageId}
                      alt={item?.name}
                    />
                  )}
                  <button
                    className="bg-red-500 hover:bg-green-700 text-white font-bold py-2 my-4 px-4 rounded-full"
                    onClick={() => addFoodItem(item)}
                  >
                    {" "}
                    ADD +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
