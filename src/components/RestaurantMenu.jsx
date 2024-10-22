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

// Dummy image URL in case the item doesn't have an image

const DUMMY_IMG_URL =
  "https://via.placeholder.com/250x150?text=No+Image+Available";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const dispatch = useDispatch();

  const addFoodItem = (item) => {
    dispatch(addItem(item));
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
      <div className="restaurant-summary my-3 flex justify-evenly flex-wrap shadow-md p-6 hover:shadow-lg rounded-lg max-w-7xl mx-auto">
        <div className="restaurantImage w-80">
          <img
            className="restaurant-img rounded-lg"
            src={IMG_URL_CDN + restaurant?.cloudinaryImageId}
            alt={restaurant?.name}
          />
        </div>

        <div className="restaurant-summary-details my-3 max-w-lg">
          <h2 className="restaurant-title text-4xl py-4 font-semibold">
            {restaurant?.name}
          </h2>
          <p className="restaurant-location text-lg text-gray-700 mb-2">
            {restaurant?.areaName}, {restaurant?.locality}
          </p>
          <p className="restaurant-tags text-sm text-gray-500">
            {restaurant?.cuisines?.join(", ")}
          </p>

          <div className="restaurant-details mt-4">
            <div
              className="restaurant-rating text-lg font-bold p-2 rounded-lg inline-block"
              style={
                rating < 4
                  ? { backgroundColor: "#ff6961" }
                  : restaurant?.avgRating === "--"
                  ? { backgroundColor: "white", color: "black" }
                  : { backgroundColor: "#34d399", color: "white" }
              }
            >
              <i className="fa-solid fa-star"></i> {restaurant?.avgRating}
            </div>

            <div className="text-sm text-gray-500 mt-2">
              {restaurant?.sla?.slaString} | {restaurant?.costForTwoMessage}
            </div>
          </div>
        </div>
      </div>

      <div className="restaurant-menu-content max-w-7xl mx-auto">
        <div className="menu-items-container">
          <div className="menu-title-wrap mx-9 my-6 flex justify-center">
            <h3 className="menu-title text-3xl font-bold">Recommended</h3>
          </div>

          <div className="text-xl text-center mb-6">
            {menuItems.length} items available
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <div
                className="menu-item bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-200"
                key={item?.id}
              >
                <div className="menu-item-details">
                  <h3 className="item-title text-2xl font-semibold mb-2">
                    {item?.name}
                  </h3>

                  <p className="item-cost text-lg text-gray-700 mb-2">
                    {item?.price > 0
                      ? new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(item?.price / 100)
                      : " "}
                  </p>

                  {item?.description && (
                    <p className="item-desc text-sm text-gray-500 mb-4">
                      {item?.description}
                    </p>
                  )}
                </div>

                <div className="menu-img-wrapper flex justify-center items-center">
                  <img
                    className="menu-item-img w-[250px] h-[150px] rounded-md object-cover"
                    src={
                      item?.imageId
                        ? ITEM_IMG_CDN_URL + item?.imageId
                        : DUMMY_IMG_URL
                    }
                    alt={item?.name}
                  />
                </div>

                <button
                  className="bg-red-500 hover:bg-green-700 text-white font-bold py-2 mt-4 px-4 rounded-full w-full transform transition duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-400"
                  onClick={() => addFoodItem(item)}
                >
                  ADD +
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
