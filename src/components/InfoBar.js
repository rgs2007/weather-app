import React, { useState, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { getWeatherAnimationById } from "../helpers";
import LottieView from "lottie-react-native";

const InfoBar = ({ humidity, windSpeed, temp, weather, isCelsius }) => {

  const animation = useRef(null);

  const source = getWeatherAnimationById(weather?.icon);

  const tempValue = isCelsius ? (temp - 32) * 0.5556 : temp;
  const tempUnity = isCelsius ? "°C" : "°F";
  const windSpeeValue = isCelsius ? Number(windSpeed * 1.609) : Number(windSpeed);
  const windSpeeUnity = isCelsius ? "km\h" : "mph";
  
  return (
    <BlurView intensity={50} style={styles.container}>
      <View flexDirection={"row"}>
        <View flex={1}>
          <Text style={styles.blueText}>Temperature</Text>
          <Text style={styles.whiteText}>{temp ? tempValue.toFixed() : " "}{tempUnity}</Text>
        </View>
        <View flex={1}>
          <Text style={styles.blueText}>Weather</Text>
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: 30,
              height: 30,
            }}
            source={source}
          />
        </View>
      </View>
      <View flexDirection={"row"}>
        <View flex={1}>
          <Text style={styles.blueText}>Humidity</Text>
          <Text style={styles.whiteText}>{(humidity || " ") + "%"}</Text>
        </View>
        <View flex={1}>
          <Text style={styles.blueText}>Wind speed</Text>
          <Text style={styles.whiteText}>{(windSpeeValue.toFixed(1)  || " ") + windSpeeUnity}</Text>
        </View>
      </View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 13,
    overflow: "hidden",
  },
  whiteText: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 20,
    color: "white",
  },
  blueText: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 13,
    color: "#1e517baa",
    marginBottom: 3,
  },
});

export default InfoBar;
