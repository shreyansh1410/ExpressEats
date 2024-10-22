import React from "react";
import { IMG_URL_CDN } from "../Utils/constants";

const SlidingRestaurantCard = ({
  name,
  cloudinaryImageId,
  aggregatedDiscountInfoV3,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 h-72">
      <div className="relative">
        <img
          className="w-full h-48 object-cover"
          src={IMG_URL_CDN + cloudinaryImageId}
          alt={name}
        />
        {aggregatedDiscountInfoV3?.header && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white p-2">
            <p className="text-lg font-bold truncate">
              {aggregatedDiscountInfoV3.header}{" "}
              {aggregatedDiscountInfoV3.subHeader}
            </p>
          </div>
        )}
      </div>
      <div className="p-4">
        <h2 className="text-lg font-bold truncate">{name}</h2>
      </div>
    </div>
  );
};

export default SlidingRestaurantCard;
