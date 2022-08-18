const API_KEY = "ff1a3503cd73bdfb12f77b0d2e9e2194";
import axios from "axios";

export const getWeatherData = async (location) => {
  let weatherData;
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${API_KEY}&units=imperial`
    );
    weatherData = response.data;
  } catch (e) {
    console.log(e);
  }

  return weatherData;
};
