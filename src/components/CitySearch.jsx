import React, { useState } from "react";

const CitySearch = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    const API_KEY = process.env.OPEN_WEATHER_API_KEY;
    // Call the API to get latitude and longitude based on the city
    // You can use fetch or Axios to make the API request
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        const { coord } = data;
        onSearch(coord.lat, coord.lon);
      })
      .catch((error) => {
        console.error("Error fetching city data:", error);
        // Handle error
      });
  };

  return (
    <div className="city-search-dialogue">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="border-4 border-black-500 rounded-lg px-2 py-1 mr-2"
      />
      <button onClick={handleSearch} className="bg-gray-800 text-white w-[100px] rounded-lg hover:shadow-md p-2">Search</button>
    </div>
  );
};

export default CitySearch;
