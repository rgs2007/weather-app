import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import SwitchToggle from "react-native-switch-toggle";

const WeatherSwitch = ({ isCelsius, setIsCelsius }) => {
  return (
    <View
      marginVertical={35}
      flexDirection={"row"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Text style={styles.whiteText}>{"F"}</Text>
      <SwitchToggle
        circleColorOff="#1e517b"
        circleColorOn="#1e517b"
        backgroundColorOn="#FFFFFF55"
        backgroundColorOff="#FFFFFF55"
        onPress={setIsCelsius}
        switchOn={isCelsius}
        containerStyle={styles.switchContainer}
        circleStyle={styles.circleStyle}
      />
      <Text style={styles.whiteText}>{"C"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    width: 55,
    height: 15,
    borderRadius: 15,
    padding: 5,
    marginHorizontal: 10,
  },
  circleStyle: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  whiteText: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 20,
    color: "white",
  },
});

export default WeatherSwitch;
