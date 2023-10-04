import RestaurantCard from "./RestaurantCard"
import { restaurantList } from "../constants"
import { useState } from "react"

function filterRestaurant(searchText, restaurants) {
    const filterData = restaurants.filter(
        (restaurant) => restaurant?.info?.name?.toLowerCase().includes(searchText.toLowerCase())
    )
    return filterData;
}

const Body = () => {

    const [searchText, setSearchText] = useState("");
    const [restaurants, setRestaurants] = useState(restaurantList);

    return (
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
                        const data = filterRestaurant(searchText, restaurants);
                        setRestaurants(data);
                    }}
                >
                    Submit
                </button>
            </div>
            <div className="restaurant-list">
                {
                    restaurants.map((restaurant) => {
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