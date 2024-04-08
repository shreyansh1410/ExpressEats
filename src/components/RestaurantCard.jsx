import { IMG_URL_CDN } from "../Utils/constants";
import { useContext } from "react";
import UserContext from "../Utils/userContext";

const RestaurantCard = ({
  name,
  cloudinaryImageId,
  costForTwo,
  cuisines,
  avgRating,
}) => {
  const { user } = useContext(UserContext);
  return (
    <div className="card w-[300px] ml-12 mx-2 my-2 mb-6 h-[500px] hover:shadow-2xl p-8 hover:bg-gray-100 font-quicksand">
      <img
        className="w-60 h-60 rounded-lg"
        src={IMG_URL_CDN + cloudinaryImageId}
        alt="restaurant-logo"
      ></img>
      <h2 className="font-bold text-xl font-quicksand">{name}</h2>
      <p>{cuisines.join(", ")}</p>
      <p>💵: {costForTwo}</p>
      <p>Rating: {avgRating} ⭐</p>
    </div>
  );
};

export default RestaurantCard;
