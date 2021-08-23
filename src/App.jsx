import React, { useState, useEffect } from "react";
import "./App.css";
import { getData } from "./utils/fetchData";

import cloud from "./assets/cloud.png";
import clear from "./assets/clesr.png";
import rain from "./assets/rain.png";

export default function App() {
  const [location, setLocation] = useState("Nigeria");
  const [weather, setWeather] = useState({});

  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSearch = async () => {
    // e.preventDefault();

    try {
      const data = await getData(location);
      setWeather(data);
      setLocation("");
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div>
      <div className="input">
        <input
          type="search"
          value={location}
          onChange={handleChange}
          className="search"
          placeholder="Enter city or country"
        />
        <button onClick={handleSearch} className="btn btn__search">
          {/* Get Weather */}
          <i class="fab fa-searchengin"></i>
        </button>
      </div>

      {weather.message ? <p className="error">{weather.message}</p> : ""}
      {weather.main !== undefined ? (
        <div
          className={`weather ${
            weather.main.temp - 273 > 24 ? "hot__weather" : "cold__weather"
          }`}
        >
          <p className="location">
            {weather.name} - {weather.sys.country}
          </p>
          <div className="weather__info">
            <p className="temp">{~~weather.main.temp - 273}°c</p>

            {weather.weather.map((item) => (
              <div>
                <img
                  src={`${
                    item.main === "Clear"
                      ? clear
                      : "Rain"
                      ? rain
                      : // : "Clouds"
                        cloud
                    // : rain
                  }`}
                  className="description__icon"
                />
                <p className="description">{item.main}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="error">Enter a location and try again</p>
      )}
    </div>
  );
}
