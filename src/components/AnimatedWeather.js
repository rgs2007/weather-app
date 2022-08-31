import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { getDewPointLabel } from "../helpers";
import { Svg, Circle, Defs, LinearGradient, Stop, Text as SVGText } from 'react-native-svg'
import { MyPieChart } from "../components/CircleChart";
import { StackedBarChart } from 'react-native-svg-charts'

const AnimatedWeather = ({ temp, isCelsius, humidity }) => {

    //const tempValue = isCelsius ? (temp - 32) * 0.5556 : temp;
    //const tempUnity = isCelsius ? "°C" : "°F";
    const dewPoint = ((temp - 32) * 0.5556) - ((100 - humidity)/5)
    const dewPointLabel = getDewPointLabel(dewPoint);
    const {width}  = Dimensions.get("window"); 
    const size = width - 128;
    const strokeWidth = 50;
    const text = dewPointLabel;
    const radius = (size - strokeWidth) / 2;
    const circum = radius * 2 * Math.PI;
    const svgProgress = 100 - (dewPoint*4);


    const data = [
      {
          month: new Date(2015, 0, 1),
          apples: 3840,
          bananas: 1920,
          cherries: 960,
          dates: 400,
          oranges: 400,
      },
      {
          month: new Date(2015, 1, 1),
          apples: 1600,
          bananas: 1440,
          cherries: 960,
          dates: 400,
      },
      {
          month: new Date(2015, 2, 1),
          apples: 640,
          bananas: 960,
          cherries: 3640,
          dates: 400,
      },
      {
          month: new Date(2015, 3, 1),
          apples: 3320,
          bananas: 480,
          cherries: 640,
          dates: 400,
      },
  ]

  const colors = ['#7b4173', '#a55194', '#ce6dbd', '#de9ed6']
  const keys = ['apples', 'bananas', 'cherries', 'dates']

    return (
      <View style={styles.container}>
        <View flexDirection={"row"} justifyContent={"center"}>
        <View style={{margin: 10}}>

        <StackedBarChart
                style={{ height: 200 }}
                keys={keys}
                colors={colors}
                data={data}
                showGrid={false}
                contentInset={{ top: 30, bottom: 30 }}
                horizontal={true}
            />

        <Svg width={size} height={size}>

        <Defs>
      <LinearGradient id="icon-grad" x1="0" y1="0" x2="0" y2="100%">
        <Stop offset="0" stopColor="blue" stopOpacity="1" />
        <Stop offset="100%" stopColor="red" stopOpacity="1" />
      </LinearGradient>
    </Defs>

          {/* Background Circle */}
          
          
                    <Circle 
            stroke={"#FFFFFF55"}
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            {...{strokeWidth}}
          />

              
          {/* Progress Circle 
          stroke={"#f5d142"}
          fill="none"  
          */}
          <Circle 
          stroke={"#f5d142"}
            fill="none"         
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeDasharray={`${circum} ${circum}`}
            strokeDashoffset={radius * Math.PI * 2 * (svgProgress/100)}
            transform={`rotate(-90, ${size/2}, ${size/2})`}
            {...{strokeWidth}}
          />
          {/* Text */}
          <SVGText
            fontSize={"10"}
            x={size / 2}
            y={size / 2 + (5)}
            textAnchor="middle"
            fill={"#333333"}
          >
            {text}
          </SVGText>
          </Svg>
        </View> 
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    gradientCircle:{

    },
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around"
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
