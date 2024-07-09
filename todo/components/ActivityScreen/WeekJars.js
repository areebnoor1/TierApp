import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FilledJarIcon from "../SVGicons/FilledJarIcon.js";
import EmptyJarIcon from "../SVGicons/EmptyJarIcon.js";
import DisabledJarIcon from "../SVGicons/DisabledJarIcon.js";

export default function WeekJars({}) {
  return (
    <View style={styles.container}>
      {/* export-- day of the week, and streak number. */}

      <View style={styles.day}>
        <Text>SUN</Text>
        <EmptyJarIcon />
        <FilledJarIcon />
      </View>

      <View style={styles.today}>
        <Text style={{ fontWeight: "bold" }}>MON</Text>
        <View style={{alignContent: "center"}}>
        <EmptyJarIcon  />
         <DisabledJarIcon />
        </View>
      </View>

<View style={styles.day}>
        <Text>TUE</Text>
        <EmptyJarIcon />
        <FilledJarIcon />
      </View>

      <View style={styles.day}>
              <Text>WED</Text>
              <EmptyJarIcon />
              <FilledJarIcon />
            </View>
            <View style={styles.day}>
                    <Text>THU</Text>
                    <EmptyJarIcon />
                    <FilledJarIcon />
                  </View>
              <View style={styles.day}>
                          <Text>FRI</Text>
                          <EmptyJarIcon />
                          <FilledJarIcon />
                        </View>
                 <View style={styles.day}>
                                <Text>SAT</Text>
                                <EmptyJarIcon />
                                <FilledJarIcon />
                              </View>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
  //  backgroundColor: "blue",
    //width: "80%",

  },

  day: {
    alignContent: "center",
    justifyContent: "center",
   // backgroundColor: "red",

  },
  today: {
    alignContent: "center",
    justifyContent: "center",
    borderOutline: "black",
    borderWidth: 1,
  //  backgroundColor: "red",
  padding: 2,
  },
  jarIcon: {},
  text: {
    fontSize: 14,
  },
});
