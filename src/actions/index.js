const API_KEY = "804152c8ea1960e7dec430d64330a123";
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
