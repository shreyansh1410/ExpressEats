import React from 'react'
import { IMG_URL_CDN } from "../Utils/constants";

const SlidingRestaurantCard = ({
    name,
    cloudinaryImageId,
    aggregatedDiscountInfoV3,
  }) => {
  return (
    <div className="card w-[300px] mx-16  my-2 mb-6 h-[300px] hover:shadow-2xl py-8 hover:bg-gray-100 font-quicksand">
      <div className="relative">
        <img
          className="w-60 h-40 rounded-xl"
          src={IMG_URL_CDN + cloudinaryImageId}
          alt="restaurant-logo"
        />
        {aggregatedDiscountInfoV3?.header && (
          <div
            className="font-bold absolute top-28 left-0 bg-transparent text-white text-2xl p-2 z-10 whitespace-nowrap overflow-hidden overflow-ellipsis"
            style={{ maxWidth: "240px" }}
          >
            {aggregatedDiscountInfoV3.header}{" "}
            {aggregatedDiscountInfoV3.subHeader}
          </div>
        )}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black to-transparent z-0" />
      </div>

      <h2 className="font-bold text-xl font-quicksand">{name}</h2>
    </div>
  )
}

export default SlidingRestaurantCard
