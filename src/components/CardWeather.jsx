import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingScreen from "./LoadingScreen";

const CardWeather = ({ lon, lat }) => {
  const [weather, setWeather] = useState();
  const [temperature, setTemperature] = useState();
  const [isCelsius, setIsCelsius] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (lon) {
      const APIKey = `55b17f3aee668f2cf1dd14bb525316e4`;
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`;

      axios
        .get(URL)
        .then((res) => {
          setWeather(res.data);
          const temp = {
            celsius: `${Math.round(res.data.main.temp - 273.15)} °C`,
            farenheit: `${Math.round(res.data.main.temp - (273.15 * 9) / 5 + 32)} °F`,
          };
          setTemperature(temp);
          setIsLoading(false);
        })
        .catch(err => console.log(err))
    }
  }, [lon, lat]);

  console.log(weather);

  const handleClick = () => setIsCelsius(!isCelsius);

  if (isLoading) {
    return <LoadingScreen />;
  } else {
    return (
      <article className="show_principal">
        <div className="block1">
          <h1 className="font_color">Weather App</h1>
          <h2 className="font_color">{`${weather?.name} ${weather?.sys.country}`}</h2>
        </div>
        <div className="unite_block">
          <div className="block2">
            <img
              src={
                weather &&
                `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`
              }
              alt=""
            />
          </div>
          <div className="block3">
            <h3 className="font_color weather_description" >
              &#34;{weather?.weather[0].description}&#34;
            </h3>
            <ul>
              <li>
                Win Speed: <span>{weather?.wind.speed} m/s</span>
              </li>
              <li>
                Clouds......: <span>{weather?.clouds.all} %</span>
              </li>
              <li>
                Pressure....: <span>{weather?.main.pressure} hPa</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="block4">
          <h2 className="temperatura">
            {isCelsius ? temperature?.celsius : temperature?.farenheit}
          </h2>
          <button onClick={handleClick}>
            {isCelsius ? "Change to oF" : "Change to oC"}
          </button>
        </div>
      </article>
    );
  }
};
export default CardWeather;
