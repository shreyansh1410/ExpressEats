import RestaurantCard from "./RestaurantCard";
import { restaurantList } from "../Utils/constants";
import { useEffect, useState, useContext, useSyncExternalStore } from "react";
import Shimmer from "./Shimmer";
import { Link, useNavigate } from "react-router-dom";
import useOnline from "../Utils/useOnline";
import UserContext from "../Utils/userContext";
import swiggy_api_URL from "../Utils/constants";
import { FaLocationArrow } from "react-icons/fa6";

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
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  // first the code renders and then useEffect is used
  useEffect(() => {
    getRestaurants();
    // Empty dependency array => render only once
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user's geolocation
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

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        if (latitude && longitude) {
          const API_KEY = process.env.OPEN_WEATHER_API_KEY;
          const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

          const response = await fetch(apiUrl);
          const data = await response.json();
          console.log(data.coord.lat);
          console.log(data.coord.lon);
          setWeatherData(data);
          console.log(weatherData?.coord?.lat);

          // Once weather data is fetched, call getRestaurants
          getRestaurants(data.coord.lat, data.coord.lon);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchWeatherData();
  }, [latitude, longitude]);

  // https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.4163164&lng=80.3670537&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING
  async function getRestaurants(latitude, longitude) {
    try {
      let apitobecalled = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${latitude}&lng=${longitude}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;
      const response = await fetch(apitobecalled);
      const json = await response.json();

      // initialize checkJsonData() function to check Swiggy Restaurant data
      async function checkJsonData(jsonData) {
        for (let i = 0; i < jsonData?.data?.cards.length; i++) {
          // initialize checkData for Swiggy Restaurant data
          let checkData =
            json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle
              ?.restaurants;

          // if checkData is not undefined then return it
          if (checkData !== undefined) {
            return checkData;
          }
        }
      }

      //   call the checkJsonData() function which return Swiggy Restaurant data
      const resData = await checkJsonData(json);

      //   update the state variable restaurants with Swiggy API data
      setAllRestaurants(resData);
      setFilteredRestaurants(resData);
    } catch (error) {
      console.log(error);
    }
  }

  const online = useOnline();
  if (!online) {
    return <h1>No internet found, check your connection</h1>;
  }
  //first the code renders and then useEffect is used
  // console.log("render");

  //early return:
  if (!allRestaurants) return <Shimmer />;

  // if(filteredRestaurants?.length===0)
  //     return <h1>No restaurants found for the name</h1>

  return allRestaurants?.length === 0 ? (
    <Shimmer />
  ) : (
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
        <div className="my-4 flex justify-evenly">
          <div className="flex justify-between items-center">
            <FaLocationArrow />
            <div>{weatherData?.name}</div>
          </div>
          <div>
            
          </div>
        </div>
      </div>
      <div className="restaurant-list flex flex-wrap my-5 mx-[100px]">
        {filteredRestaurants.length === 0 ? (
          <h1>No matching res</h1>
        ) : (
          filteredRestaurants?.map((restaurant) => {
            return (
              <Link
                to={"/restaurant/" + restaurant?.info?.id}
                key={restaurant?.info?.id}
              >
                {/* if we click on any restaurant card it will redirect to that restaurant menu page */}
                <RestaurantCard {...restaurant?.info} />
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default tempbody;
