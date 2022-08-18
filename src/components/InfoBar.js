import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";

const InfoBar = ({ humidity, windSpeed }) => {
  return (
    <BlurView intensity={50} style={styles.container}>
      <View flexDirection={"row"}>
        <View flex={1}>
          <Text style={styles.blueText}>Humidity</Text>
          <Text style={styles.whiteText}>{(humidity || " ") + "%"}</Text>
        </View>
        <View flex={1}>
          <Text style={styles.blueText}>Wind speed</Text>
          <Text style={styles.whiteText}>
            {(windSpeed?.toFixed(1) || " ") + "km/h"}
          </Text>
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
