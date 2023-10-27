import { IMG_URL_CDN } from "../constants"
import { useContext } from "react";
import UserContext from "../Utils/userContext";

const RestaurantCard = ({
    name,
    cloudinaryImageId,
    costForTwo,
    cuisines,
    avgRating
}) => {
    const { user } = useContext(UserContext);
    return (
        <div className="card w-[400px] mx-3 my-3 h-[400px] hover:shadow-2xl p-8 hover:bg-gray-100">
            <img src={
                IMG_URL_CDN + cloudinaryImageId
            } alt="restaurant-logo">
            </img>
            <h2 className="font-bold text-xl">{name}</h2>
            <p>{cuisines.join(", ")}</p>
            <p>💵: {costForTwo}</p>
            <p>Rating: {avgRating} ⭐</p>
        </div>
    )
}

export default RestaurantCard