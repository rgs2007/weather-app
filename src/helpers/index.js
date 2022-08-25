import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { getWeatherData } from "../actions";

// This is for showing notifications
export const showNotificationInfo = async () => {
  const location = await getLocation();
  if (location) {
    const weatherData = await getWeatherData(location);
    const cityName = weatherData?.name;
    const temperature = weatherData?.main?.temp?.toFixed();

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    if (temperature < 70) {
      Notifications.scheduleNotificationAsync({
        content: {
          title: "The temperature is lower than 70°F",
          body: `It's ${temperature}°F in ${cityName}`,
        },
        trigger: null,
      });
    }
    // this is for showing notifications when weather is not lower than 70F (Remove comment if you wanna test it)
    // else {
    //   Notifications.scheduleNotificationAsync({
    //     content: {
    //       title: "The temperature is not lower than 70°F",
    //       body: `It's ${temperature}°F in ${cityName}`,
    //     },
    //     trigger: null,
    //   });
    // }
  }
};

// This is for storing the location so we can use it when app is not open
export const saveLocation = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("location", jsonValue);
  } catch (e) {
    console.log("Error while saving location");
  }
};

export const getLocation = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("location");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log("Error while getting location");
  }
};

export const getDewPointLabel = (dewpoint) => {
  
  const myObj = {dewpoint:dewpoint};
  console.log(myObj);

  switch (true) {
    case (dewpoint >= 21):
      return "humid";
    case (dewpoint >= 16):
      return "somehow humid";
    case (dewpoint >= 13):
      return "somehow comfortable";
    case (dewpoint >= 9):
      return "comfortable";
    case (dewpoint >= 0):
      return "somehow comfortable";
    case (dewpoint < 0):
      return "dry";
    default:
      return "unknown";
  }
}


// This is for showing an animation by an id from OPEN WEATHER MAP
export const getWeatherAnimationById = (id) => {
  switch (id) {
    case "01d":
      return require("../animations/sunny.json");
    case "01n":
      return require("../animations/night.json");
    case "02d":
      return require("../animations/partly-cloudy.json");
    case "02n":
      return require("../animations/cloudynight.json");
    case "03d":
      return require("../animations/partly-cloudy.json");
    case "03n":
      return require("../animations/cloudynight.json");
    case "04d":
      return require("../animations/partly-cloudy.json");
    case "04n":
      return require("../animations/cloudynight.json");
    case "09d":
      return require("../animations/partly-shower.json");
    case "09n":
      return require("../animations/rainynight.json");
    case "10d":
      return require("../animations/partly-shower.json");
    case "10n":
      return require("../animations/rainynight.json");
    case "11d":
      return require("../animations/stormshowersday.json");
    case "11n":
      return require("../animations/storm.json");
    case "13d":
      return require("../animations/snow-sunny.json");
    case "13n":
      return require("../animations/snow-night.json");
    case "50d":
      return require("../animations/foggy.json");
    case "50n":
      return require("../animations/mist.json");
    default:
      return require("../animations/windy.json");
  }
};
