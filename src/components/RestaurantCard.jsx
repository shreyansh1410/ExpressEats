import React from "react";
import { IMG_URL_CDN } from "../Utils/constants";

const RestaurantCard = ({
  name,
  cloudinaryImageId,
  costForTwo,
  cuisines,
  avgRating,
  aggregatedDiscountInfoV3,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
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
        <h2 className="text-xl font-bold mb-2 truncate">{name}</h2>
        <p className="text-gray-600 mb-2 truncate">{cuisines.join(", ")}</p>
        <div className="flex justify-between items-center">
          <span className="text-gray-700">{costForTwo}</span>
          <span
            className={`px-2 py-1 rounded-full text-sm font-bold ${
              avgRating >= 4
                ? "bg-green-500 text-white"
                : avgRating >= 3
                ? "bg-yellow-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            ★ {avgRating}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
