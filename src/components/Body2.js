import RestaurantCard from "./RestaurantCard"
import { restaurantList } from "../constants"
import { useEffect, useState } from "react"
import Shimmer from "./Shimmer"

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

    //first the code renders and then useEffect is used
    useEffect(() => {
        getRestaurants();
        //Empty dependency array => render only once
    }, []);

    async function getRestaurants() {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.4163164&lng=80.3670537&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")
        const json = await data.json();
        console.log(json);
        //Optional Chaining
        setAllRestaurants(json?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurants(json?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    }

    //first the code renders and then useEffect is used
    console.log("render");

    //early return:
    if(!allRestaurants) return null;

    // if(filteredRestaurants?.length===0)
    //     return <h1>No restaurants found for the name</h1>

    return allRestaurants?.length === 0 ? (
        <Shimmer />
    ) : (
        <>
            <div className="search-container">
                <input
                    type="text"
                    className="search-box"
                    placeholder="search"
                    value={searchText}
                    onChange={(e) =>
                        setSearchText(e.target.value)
                    }
                >
                </input>
                <button
                    className="search-btn"
                    onClick={() => {
                        const data = filterRestaurant(searchText, allRestaurants);
                        setFilteredRestaurants(data);
                    }}
                >
                    Submit
                </button>
            </div>
            <div className="restaurant-list">
                {
                    filteredRestaurants.length===0?<h1>No matching res</h1>:filteredRestaurants?.map((restaurant) => {
                        return (
                            <RestaurantCard key={restaurant.info.id} {...restaurant.info} />
                        );
                    })
                }
            </div>
        </>
    )
}

export default Body;