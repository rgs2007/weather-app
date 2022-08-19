import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import WeatherSwitch from "../components/WeatherSwitch";
import InfoBar from "../components/InfoBar";
import AnimatedWeather from "../components/AnimatedWeather";
import { saveLocation } from "../helpers";
import { getWeatherData } from "../actions";
import * as Location from "expo-location";
import { AdMobBanner } from "expo-ads-admob";
import * as Device from "expo-device";

// Your production Ids
const bannerIdIOS = "ca-app-pub-5749251004508816/6844889926";
const bannerIdAndroid = "ca-app-pub-5749251004508816/1975706623";

const bannerId = Platform.OS === "android" ? bannerIdAndroid : bannerIdIOS;

//Test id for development

const bannerTestIdIOS = "ca-app-pub-3940256099942544/2934735716";
const bannerTestIdAndroid = "ca-app-pub-3940256099942544/6300978111";

const bannerTestId =
  Platform.OS === "android" ? bannerTestIdAndroid : bannerTestIdIOS;

const adUnitID = Device.isDevice && !__DEV__ ? bannerId : bannerTestId;

export default function WeatherScreen() {
  const [isCelsius, setIsCelsius] = useState(false);

  //Getting Weather information and update them every 15 minutes (15*60000 ms)
  useEffect(() => {
    getWeatherInfo();
    setInterval(() => {
      getWeatherInfo();
    }, 15 * 60000);
  }, []);

  const getWeatherInfo = async () => {
    
    try {
      setData(null);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const longlat = {
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      };
      await saveLocation({
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      });

      const weatherData = await getWeatherData(longlat);
      setData(weatherData);

      // const city = await getCity(longlat);
      // setCity(city);

      console.log(weatherData);
      // console.log(city)

    } catch (e) {
      console.log(e);
    }

  };
  const [data, setData] = useState(null);
  // const [city, setCity] = useState(null);

  return (
    <LinearGradient colors={["#4183d7", "#59abe3"]} style={styles.container}>
      <View width={"100%"}>
        <Text style={styles.cityName}>{data?.name}</Text>
        <WeatherSwitch
          isCelsius={isCelsius}
          setIsCelsius={() => setIsCelsius(!isCelsius)}
        />
        <AnimatedWeather
          temp={data?.main?.temp}
          isCelsius={isCelsius}
          humidity={data?.main?.humidity}
        />
      </View>
      <AdMobBanner
        bannerSize="fullBanner"
        adUnitID={bannerTestId} // Test ID, Replace with your-admob-unit-id
        servePersonalizedAds // true or false
        onDidFailToReceiveAdWithError={(err) => console.log(err)}
      />
      <InfoBar
        humidity={data?.main?.humidity}
        windSpeed={data?.wind?.speed}
        temp={data?.main?.temp}
        weather={data?.weather[0]}
        isCelsius={isCelsius}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 80,
    paddingHorizontal: 20,
  },
  cityName: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 18,
    color: "#FFFFFF",
    textAlign: "center",
  },
});
