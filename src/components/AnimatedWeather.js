import React, { useState, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { getDewPointLabel } from "../helpers";
//import Svg, {G, Circle} from "react-native-svg";

const AnimatedWeather = ({ temp, isCelsius, humidity }) => {
  const animation = useRef(null);

  const tempValue = isCelsius ? (temp - 32) * 0.5556 : temp;
  const tempUnity = isCelsius ? "°C" : "°F";
  const dewPoint = ((temp - 32) * 0.5556) - ((100 - humidity)/5)
  const dewPointLabel = getDewPointLabel(dewPoint);
  
  return (
    <View style={styles.container}>
      <View flexDirection={"row"} justifyContent={"center"}>
        {/* <Svg>
          <G>
            <Circle></Circle>
          </G>
        </Svg> */}
        <Text style={styles.valueText}>{dewPointLabel}</Text>
        {/* <Text style={styles.cText}>°{isCelsius ? "C" : "F"}</Text> */}
      </View>
      {/* <View alignItems={"center"} flex={1}>
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
      </View> */}
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
    fontSize: 40,
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
