import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaLocationArrow } from "react-icons/fa";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import useOnline from "../Utils/useOnline";
import Shimmer from "./Shimmer";
import RestaurantCard from "./RestaurantCard";
import CitySearch from "./CitySearch";
import SlidingRestaurantCard from "./SlidingRestaurantCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { UNSERVICABLE_IMAGE_URL } from "../Utils/constants";

function filterRestaurant(searchText, restaurants) {
  return restaurants.filter((restaurant) =>
    restaurant?.info?.name?.toLowerCase().includes(searchText.toLowerCase())
  );
}

const TempBody = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [showCitySearch, setShowCitySearch] = useState(false);
  const [isServicable, setIsServicable] = useState(true);
  const [headerText, setHeaderText] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const online = useOnline();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        setError(error.message);
      }
    );
  }, []);

  useEffect(() => {
    const fetchWeatherAndRestaurants = async () => {
      if (latitude && longitude) {
        try {
          const API_KEY = process.env.OPEN_WEATHER_API_KEY;
          const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
          const weatherResponse = await fetch(weatherApiUrl);
          const weatherData = await weatherResponse.json();
          setWeatherData(weatherData);

          const restaurantsApiUrl = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${latitude}&lng=${longitude}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;
          const restaurantsResponse = await fetch(restaurantsApiUrl);
          const restaurantsData = await restaurantsResponse.json();

          if (
            restaurantsData?.data?.cards[0]?.card?.card?.title ===
            "Location Unserviceable"
          ) {
            setIsServicable(false);
          } else {
            const resData = await checkJsonData(restaurantsData);
            setAllRestaurants(resData);
            setFilteredRestaurants(resData);
          }
        } catch (error) {
          setError(error.message);
        }
      }
    };

    fetchWeatherAndRestaurants();
  }, [latitude, longitude]);

  async function checkJsonData(jsonData) {
    for (let i = 0; i < jsonData?.data?.cards.length; i++) {
      let checkData =
        jsonData?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;
      if (checkData !== undefined) {
        setHeaderText(jsonData?.data?.cards[0]?.card?.card?.header?.title);
        return checkData;
      }
    }
  }

  const handleCitySearch = (lat, lon) => {
    setLatitude(lat);
    setLongitude(lon);
    setIsServicable(true);
    setShowCitySearch(false);
  };

  const SampleNextArrow = (props) => {
    const { onClick } = props;
    return (
      <IconButton
        style={{
          position: "absolute",
          right: "-25px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1,
        }}
        onClick={onClick}
      >
        <ArrowForwardIos />
      </IconButton>
    );
  };

  const SamplePrevArrow = (props) => {
    const { onClick } = props;
    return (
      <IconButton
        style={{
          position: "absolute",
          left: "-25px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1,
        }}
        onClick={onClick}
      >
        <ArrowBackIos />
      </IconButton>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (!online) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-gray-800">
          No internet connection. Please check your network.
        </h1>
      </div>
    );
  }

  if (!isServicable) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-8">
          <img
            className="w-64"
            src={UNSERVICABLE_IMAGE_URL}
            alt="Location unserviceable"
          />
          <p className="text-xl font-bold text-gray-800">
            This location is currently unserviceable
          </p>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            onClick={() => setShowCitySearch(true)}
          >
            Change Location
          </button>
          {showCitySearch && <CitySearch onSearch={handleCitySearch} />}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 font-quicksand">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0 md:space-x-2 mx-12">
        <div className="w-full md:w-1/2">
          <form onSubmit={(e) => e.preventDefault()} className="flex">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Search for restaurants"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-r-md transition duration-300"
              onClick={() => {
                const data = filterRestaurant(searchText, allRestaurants);
                setFilteredRestaurants(data);
              }}
            >
              Search
            </button>
          </form>
        </div>
        <div className="flex items-center space-x-2 border border-gray-300 rounded-md p-2">
          <FaLocationArrow className="text-red-500" />
          <span className="font-medium">{weatherData?.name}</span>
          <button
            className="text-red-500 hover:text-red-600"
            onClick={() => setShowCitySearch(!showCitySearch)}
          >
            {showCitySearch ? (
              <RiArrowDropUpLine size={24} />
            ) : (
              <RiArrowDropDownLine size={24} />
            )}
          </button>
        </div>
      </div>

      {showCitySearch && (
        <div className="mb-8 mx-10">
          <CitySearch onSearch={handleCitySearch} />
        </div>
      )}

      {filteredRestaurants.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4 px-12">{headerText}</h2>
          <div className="relative px-10">
            {" "}
            {/* Added padding for slider arrows */}
            <Slider {...settings}>
              {filteredRestaurants.map((restaurant) => (
                <div key={restaurant?.info?.id} className="px-3">
                  {" "}
                  {/* Increased padding between slides */}
                  <Link to={`/restaurant/${restaurant?.info?.id}`}>
                    <SlidingRestaurantCard {...restaurant?.info} />
                  </Link>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-10">
        {filteredRestaurants.length === 0 ? (
          <Shimmer />
        ) : (
          filteredRestaurants.map((restaurant) => (
            <Link
              to={`/restaurant/${restaurant?.info?.id}`}
              key={restaurant?.info?.id}
            >
              <RestaurantCard {...restaurant?.info} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default TempBody;
