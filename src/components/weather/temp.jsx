// https://api.openweathermap.org/data/2.5/weather?q=lahore&appid=b7c1ba8952d2a147112ee2207edf2d40

import React, { useState, useEffect } from 'react'
import "./style.css";
import Weathercard from './weathercard';



const Temp = () => {
  // whatever city user searches will be stored in this
  const [searchValue, setSearchValue] = useState("Lahore");

  // All the data thats is stored in myNewWeatherInfo object will be stored in tempInfo now
  const [tempInfo, setTempInfo] = useState({});



  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=b7c1ba8952d2a147112ee2207edf2d40`;

      // returns a promise
      const res = await fetch(url);
      const data = await res.json();
      // object destructuring
      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };

      setTempInfo(myNewWeatherInfo);

      // console.log(temp);
    } catch (error) {
      console.log(error);
    }
  }

  // On page load getWeatherInfo will be called by default
  useEffect(() => {
    getWeatherInfo();
  }, []);

    return (
      <>
        <div className="wrap">
          <div className="search">
            <input type="search" className="searchTerm"
              placeholder='search...' autoFocus id='search'
              value={searchValue} onChange={(e) => {
                setSearchValue(e.target.value);
              }} />

            <button className='searchButton'
              type='button' onClick={getWeatherInfo}>Search</button>
          </div>
        </div>

        {/* Temp Card */}
        <Weathercard tempInfo={tempInfo} />
      </>
    )
  }

  export default Temp
