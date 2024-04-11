import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FaLocationArrow } from "react-icons/fa6";
import { restaurantList } from "../Utils/constants";
import useOnline from "../Utils/useOnline";
import UserContext from "../Utils/userContext";
import Shimmer from "./Shimmer";
import RestaurantCard from "./RestaurantCard";
import CitySearch from "./CitySearch"; // Import CitySearch component
import { UNSERVICABLE_IMAGE_URL } from "../Utils/constants";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";
import SlidingRestaurantCard from "./SlidingRestaurantCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function filterRestaurant(searchText, restaurants) {
  const filterData = restaurants.filter((restaurant) =>
    restaurant?.info?.name?.toLowerCase().includes(searchText.toLowerCase())
  );
  return filterData;
}

const tempbody = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [showCitySearch, setShowCitySearch] = useState(false); // State variable to control city search dialogue
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [isServicable, setIsServicable] = useState(true);
  const [headerText, setHeaderText] = useState("");

  // Fetch user's geolocation
  useEffect(() => {
    const fetchData = async () => {
      try {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          (error) => {
            setError(error.message);
          }
        );
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  // Fetch weather data and restaurants when latitude and longitude are available
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        if (latitude && longitude) {
          const API_KEY = process.env.OPEN_WEATHER_API_KEY;
          const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

          const response = await fetch(apiUrl);
          const data = await response.json();
          setWeatherData(data);

          // Once weather data is fetched, call getRestaurants
          getRestaurants(data.coord.lat, data.coord.lon);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchWeatherData();
  }, [latitude, longitude]);

  // Fetch restaurants based on latitude and longitude
  async function getRestaurants(latitude, longitude) {
    try {
      let apiUrl = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${latitude}&lng=${longitude}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;
      const response = await fetch(apiUrl);
      const json = await response.json();
      console.log();
      if (json?.data?.cards[0]?.card?.card?.title == "Location Unserviceable")
        setIsServicable(false);
      const resData = await checkJsonData(json);
      setAllRestaurants(resData);
      setFilteredRestaurants(resData);
    } catch (error) {
      console.log(error);
    }
  }

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
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          color: "black",
          background: "lightgray",
        }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          color: "black",
          background: "lightgray",
        }}
        onClick={onClick}
      />
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
  else
    return (
      <div className="Body font-quicksand">
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

        <div className="restaurant-list flex flex-wrap mb-5 mx-[100px]">
          {filteredRestaurants?.length === 0 ? (
            <h1>No matching restaurants found</h1>
          ) : (
            filteredRestaurants?.map((restaurant) => {
              return (
                <>
                
                  <Link
                    to={"/restaurant/" + restaurant?.info?.id}
                    key={restaurant?.info?.id}
                  >
                    <RestaurantCard {...restaurant?.info} />
                  </Link>
                </>
              );
            })
          )}
        </div>
      </div>
    );
};

export default tempbody;
