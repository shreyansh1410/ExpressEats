import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FaLocationArrow } from "react-icons/fa6";
import useOnline from "../Utils/useOnline";
import UserContext from "../Utils/userContext";
import Shimmer from "./Shimmer";
import RestaurantCard from "./RestaurantCard";
import CitySearch from "./CitySearch"; // Import CitySearch component
import { UNSERVICABLE_IMAGE_URL } from "../Utils/constants";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import SlidingRestaurantCard from "./SlidingRestaurantCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

// Helper function to filter restaurants based on search text
function filterRestaurant(searchText, restaurants) {
  return restaurants.filter((restaurant) =>
    restaurant?.info?.name?.toLowerCase().includes(searchText.toLowerCase())
  );
}

const TempBody = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [showCitySearch, setShowCitySearch] = useState(false);
  const [isServicable, setIsServicable] = useState(true);
  const [headerText, setHeaderText] = useState("");
  const [weatherData, setWeatherData] = useState(null); // To store weather data
  const [error, setError] = useState(null);

  // Fetch user's geolocation
  useEffect(() => {
    const fetchGeolocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          setError(error.message);
        }
      );
    };

    fetchGeolocation();
  }, []);

  // Fetch weather data and restaurants when latitude and longitude are available
  useEffect(() => {
    const fetchWeatherAndRestaurants = async () => {
      try {
        if (latitude && longitude) {
          const API_KEY = process.env.OPEN_WEATHER_API_KEY;
          const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

          const weatherResponse = await fetch(weatherApiUrl);
          const weatherData = await weatherResponse.json();
          setWeatherData(weatherData);

          // Fetch restaurants based on the latitude and longitude
          const restaurantsApiUrl = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${latitude}&lng=${longitude}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;
          const restaurantsResponse = await fetch(restaurantsApiUrl);
          const restaurantsData = await restaurantsResponse.json();
          
          if (restaurantsData?.data?.cards[0]?.card?.card?.title == "Location Unserviceable")
            setIsServicable(false);
          
          const resData = await checkJsonData(restaurantsData);
          setAllRestaurants(resData);
          setFilteredRestaurants(resData);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchWeatherAndRestaurants();
  }, [latitude, longitude]);

  // Check and extract Swiggy restaurant data from the API response
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

  // Handle city search
  const handleCitySearch = (lat, lon) => {
    setLatitude(lat);
    setLongitude(lon);
    setIsServicable(true);
    setShowCitySearch(false); // Hide city search dialogue
  };

  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <IconButton
        onClick={onClick}
        style={{
          position: "absolute",
          right: "-40px",
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "white",
        }}
      >
        <ArrowForwardIos />
      </IconButton>
    );
  }

  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <IconButton
        onClick={onClick}
        style={{
          position: "absolute",
          left: "-40px",
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "white",
        }}
      >
        <ArrowBackIos />
      </IconButton>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const online = useOnline();
  if (!online) {
    return <h1>No internet found, check your connection</h1>;
  }

  if (!isServicable)
    return (
      <div>
        <div className="flex justify-around mx-6 my-4 items-center">
          <div className="search-container w-200 h-10 rounded-md">
            <form>
              <input
                type="text"
                className="search-box h-10 rounded-lg focus:bg-red-20 w-[400px] hover:shadow-md text-left px-4 text-black placeholder-black space-x-2 border-2 border-black"
                placeholder="Search for your favourite restaurants"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              ></input>
              <button
                type="submit"
                className="search-btn bg-gray-800 text-white w-[100px] rounded-lg hover:shadow-md p-2"
                onClick={() => {
                  const data = filterRestaurant(searchText, allRestaurants);
                  setFilteredRestaurants(data);
                }}
              >
                Go
              </button>
            </form>
          </div>
          <div className="my-4 flex justify-evenly rounded-lg border-2 border-red-600">
            <div className="flex justify-between items-center w-40">
              <FaLocationArrow />
              <div className="items-start w-full">{weatherData?.name}</div>
            </div>
            <div className="flex items-center">
              <button
                className="hover:text-red-600"
                onClick={() => setShowCitySearch(!showCitySearch)}
              >
                {!showCitySearch && (
                  <RiArrowDropDownLine className="text-3xl" />
                )}
                {showCitySearch && <RiArrowDropUpLine className="text-3xl" />}
              </button>
            </div>
          </div>
        </div>
        <div className="relative left-[1075px]">
          {showCitySearch && <CitySearch onSearch={handleCitySearch} />}{" "}
          {/* Render CitySearch component */}
        </div>
        <div className="flex justify-center my-10">
          <img
            className="w-60"
            alt="location unserviable"
            src={UNSERVICABLE_IMAGE_URL}
          ></img>
        </div>
        <div className="flex justify-center">
          <p className="font-bold">This location is currently unserviable</p>
        </div>
      </div>
    );

  return (
    <div className="Body font-quicksand">
      {filteredRestaurants.length > 0 && (
        <div className="flex justify-around mx-6 my-4 items-center">
          <div className="search-container w-200 h-10 rounded-md">
            <form>
              <input
                type="text"
                className="search-box h-10 rounded-lg focus:bg-red-20 w-[400px] hover:shadow-md text-left px-4 text-black placeholder-black space-x-2 border-2 border-red-600 mx-2"
                placeholder="Search for your favourite restaurants"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              ></input>
              <button
                type="submit"
                className="search-btn bg-gray-800 text-white w-[100px] rounded-lg hover:shadow-md hover:bg-red-600 p-2"
                onClick={() => {
                  const data = filterRestaurant(searchText, allRestaurants);
                  setFilteredRestaurants(data);
                }}
              >
                Go
              </button>
            </form>
          </div>
          <div className="my-4 flex justify-evenly rounded-lg border-2 border-red-600">
            <div className="flex justify-between items-center w-40 mx-2">
              <FaLocationArrow />
              <div className="items-start w-full mx-2">{weatherData?.name}</div>
            </div>
            <div className="flex items-center">
              <button
                className="hover:text-red-600"
                onClick={() => setShowCitySearch(!showCitySearch)}
              >
                {!showCitySearch && (
                  <RiArrowDropDownLine className="text-3xl" />
                )}
                {showCitySearch && <RiArrowDropUpLine className="text-3xl" />}
              </button>
            </div>
          </div>
        </div>
      )}

      {filteredRestaurants.length > 0 && (
        <div className="relative left-[1075px]">
          {showCitySearch && <CitySearch onSearch={handleCitySearch} />}{" "}
          {/* Render CitySearch component */}
        </div>
      )}

      {filteredRestaurants.length > 0 && (
        <div className="mx-60 px-4">
          <div className="text-3xl font-bold">{headerText}</div>
          <Slider {...settings}>
            {filteredRestaurants?.map((restaurant) => {
              return (
                <Link
                  to={"/restaurant/" + restaurant?.info?.id}
                  key={restaurant?.info?.id}
                >
                  <SlidingRestaurantCard
                    className="mx-10"
                    {...restaurant?.info}
                  />
                </Link>
              );
            })}
          </Slider>
        </div>
      )}

      <div className="restaurant-list flex flex-wrap mb-5 mx-60">
        {filteredRestaurants.length === 0 ? (
          <div className="flex justify-center items-center h-full p-4">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700 text-center">
              Please wait while we search for the best restaurants nearest to you...
            </h1>
          </div>
        ) : (
          filteredRestaurants.map((restaurant) => {
            return (
              <Link
                to={"/restaurant/" + restaurant?.info?.id}
                key={restaurant?.info?.id}
              >
                <RestaurantCard {...restaurant?.info} />
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TempBody;
