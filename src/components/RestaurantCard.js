import { IMG_URL_CDN } from "../constants"

const RestaurantCard = ({
    name,
    cloudinaryImageId,
    costForTwo,
    cuisines,
    avgRating
}) => {
    return (
        <div className="card">
            <img src={
                IMG_URL_CDN + cloudinaryImageId
            } alt="restaurant-logo">
            </img>
            <h2>{name}</h2>
            <p>{cuisines.join(", ")}</p>
            <p>{costForTwo}</p>
            <p>Rating: {avgRating} stars</p>
        </div>
    )
}

export default RestaurantCard