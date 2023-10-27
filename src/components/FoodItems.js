import { IMG_URL_CDN } from "../constants"
import { useContext } from "react";
import UserContext from "../Utils/userContext";

const FoodItems = ({
    name,
    price,
    imageId,
    description
}) => {
    const { user } = useContext(UserContext);
    return (
        <div className="card w-[400px] mx-3 my-3 h-[400px] hover:shadow-2xl p-8 hover:bg-gray-200">
            <img src={
                IMG_URL_CDN + imageId
            } alt="restaurant-logo">
            </img>
            <h2 className="font-bold text-xl">{name}</h2>
            <p>Rupees: {price/100}</p>
            <p>{description}</p>
        </div>
    )
}

export default FoodItems