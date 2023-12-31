import RestaurantCard from "./RestaurantCard";
import { restaurantList } from "../constants";
import { useEffect, useState, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnline from "../Utils/useOnline";
import UserContext from "../Utils/userContext";

function filterRestaurant(searchText, restaurants) {
    const filterData = restaurants.filter(
        (restaurant) => restaurant?.info?.name?.toLowerCase().includes(searchText.toLowerCase())
    )
    return filterData;
}

const Body = () => {
    const [searchText, setSearchText] = useState("");
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [allRestaurants, setAllRestaurants] = useState([]);
    const {user, setUser} = useContext(UserContext)

    // first the code renders and then useEffect is used
    useEffect(() => {
        getRestaurants();
        // Empty dependency array => render only once
    }, []);

    // https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.4163164&lng=80.3670537&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING
    async function getRestaurants() {
        try {
          const response = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.4163164&lng=80.3670537&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
          const json = await response.json();
    
          // initialize checkJsonData() function to check Swiggy Restaurant data
          async function checkJsonData(jsonData) {
            for (let i = 0; i < jsonData?.data?.cards.length; i++) {
    
              // initialize checkData for Swiggy Restaurant data
              let checkData = json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
    
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
    if(!online){
        return(
            <h1>No internet found, check your connection</h1>
        )
    }
    //first the code renders and then useEffect is used
    // console.log("render");

    //early return:
    if(!allRestaurants) return null;

    // if(filteredRestaurants?.length===0)
    //     return <h1>No restaurants found for the name</h1>

    return allRestaurants?.length === 0 ? (
        <Shimmer />
    ) : (
        <div className="Body">
            <div className="search-container w-200 h-10 rounded-md mx-5 flex justify-center">
                <input
                    type="text"
                    className="search-box rounded-lg focus:bg-red-20 w-[400px] hover:shadow-md text-center text-black placeholder-black space-x-2"
                    placeholder="Search for your favourite restaurants"
                    value={searchText}
                    onChange={(e) =>
                        setSearchText(e.target.value)
                    }
                >
                </input>
                <button
                    className="search-btn bg-gray-800 text-white w-[100px] rounded-lg hover:shadow-md p-2"
                    onClick={() => {
                        const data = filterRestaurant(searchText, allRestaurants);
                        setFilteredRestaurants(data);
                    }}
                >
                    Go
                </button>
                <input value={user.name} onChange={
                  e => setUser({
                      name: e.target.value,
                      email: "random@gmail.com",
                  })
                }>
                </input>
            </div>
            <div className="restaurant-list flex flex-wrap my-5 mx-[100px]">
                {
                    filteredRestaurants.length===0?<h1>No matching res</h1>:filteredRestaurants?.map((restaurant) => {
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
                }
            </div>
        </div>
    )
}

export default Body;