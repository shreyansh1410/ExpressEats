// import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import {
    IMG_URL_CDN,
    swiggy_menu_api_URL,
    RESTAURANT_TYPE_KEY,
    MENU_ITEM_TYPE_KEY,
    ITEM_IMG_CDN_URL
} from "../constants";
import useRestaurant from "../Utils/useRestaurant";
import {addItem} from "../Utils/cartSlice"
import { useDispatch } from "react-redux";

const RestaurantMenu = () => {
    const { resId } = useParams();
    // console.log(resId);

    const dispatch = useDispatch();
    const addFoodItem = (item) => {
        dispatch(addItem(item));    //dispatching an action (adding item to cart)
    }

    const [restaurant, menuItems] = useRestaurant(
        swiggy_menu_api_URL,
        resId,
        RESTAURANT_TYPE_KEY,
        MENU_ITEM_TYPE_KEY
    )

    return !restaurant ? (
        <Shimmer />
    ) : (
        <div className="restaurant-menu">
            <div className="restaurant-summary mx-9 my-3 flex justify-evenly flex-wrap">
                <div className="restaurantImage">
                <img
                    className="restaurant-img"
                    src={IMG_URL_CDN + restaurant?.cloudinaryImageId}
                    alt={restaurant?.name}
                />
                </div>
                <div className="restaurant-summary-details my-3">
                    <h2 className="restaurant-title text-5xl py-4">{restaurant?.name}</h2>
                    <p className="restaurant-title text-xl">📍{restaurant?.areaName}, {restaurant?.locality}</p>
                    <p className="restaurant-tags text-2xl px-7">{restaurant?.cuisines?.join(", ")}</p>
                    <div className="restaurant-details">
                        <div
                            className="restaurant-rating"
                            style={
                                restaurant?.avgRating < 4
                                    ? { backgroundColor: "var(--light-red)" }
                                    : restaurant?.avgRating === "--"
                                        ? { backgroundColor: "white", color: "black" }
                                        : { color: "white" }
                            }
                        >
                            <i className="fa-solid fa-star"></i>
                            <span>{restaurant?.avgRating}</span>
                        </div>
                        {/* <div className="restaurant-rating-slash px-7">|</div> */}
                        <div className="px-7">⌚{restaurant?.sla?.slaString}</div>
                        {/* <div className="restaurant-rating-slash">|</div> */}
                        <div className="px-7">💵{restaurant?.costForTwoMessage}</div>
                    </div>
                </div>
            </div>
            <div className="restaurant-menu-content">
                <div className="menu-items-container">
                    <div className="menu-title-wrap mx-9 my-3 flex justify-center">
                        <h3 className="menu-title text-2xl">Recommended</h3>
                        
                    </div>
                    <div className="menu-items-list flex justify-evenly flex-wrap">
                        {menuItems.map((item, index) => (
                            <div className="menu-item w-[400px] mx-3 my-3 h-[500px] hover:shadow-2xl p-8 hover:bg-gray-100" key={item?.id}>
                            <p className="menu-count">{index+1} of {menuItems.length} Items</p>
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
                                    {/* <p className="item-desc">{item?.description}</p> */}
                                </div>
                                <div className="menu-img-wrapper">
                                    {item?.imageId && (
                                        <img
                                            className="menu-item-img w-[250px] h-[150px] rounded-md"
                                            src={ITEM_IMG_CDN_URL + item?.imageId}
                                            alt={item?.name}
                                        />
                                    )}
                                    <button className="bg-red-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full" onClick={()=> addFoodItem(item)}> ADD +</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RestaurantMenu;