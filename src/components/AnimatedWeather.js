import React, { useState, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getWeatherAnimationById } from "../helpers";
import LottieView from "lottie-react-native";

const AnimatedWeather = ({ temp, weather, isCelsius }) => {
  const animation = useRef(null);

  const source = getWeatherAnimationById(weather?.icon);

  const value = isCelsius ? (temp - 32) * 0.5556 : temp;
  return (
    <View style={styles.container}>
      <View flexDirection={"row"} justifyContent={"center"} flex={1}>
        <Text style={styles.valueText}>{temp ? value.toFixed() : " "}</Text>
        <Text style={styles.cText}>°{isCelsius ? "C" : "F"}</Text>
      </View>
      <View alignItems={"center"} flex={1}>
        <LottieView
          autoPlay
          ref={animation}
          style={{
            width: 120,
            height: 120,
          }}
          source={source}
        />

        <Text style={styles.wText}>{weather?.description?.toUpperCase()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 40,
  },
  valueText: {
    fontFamily: "Montserrat_300Light",
    fontSize: 80,
    color: "white",
  },
  cText: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 25,
    color: "white",
  },
  wText: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 13,
    color: "white",
  },
});

export default AnimatedWeather;
