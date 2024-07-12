import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FilledJarIcon from "../SVGicons/FilledJarIcon.js";
import EmptyJarIcon from "../SVGicons/EmptyJarIcon.js";
import DisabledJarIcon from "../SVGicons/DisabledJarIcon.js";

const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export default function WeekJars({ remaining, streakNumber }) {
  const today = new Date().getDay();
{/*have to sub 1 from streak if got credit for today*/}
  if (!remaining) {
    streakNumber--;
  }

  const renderJar = (dayIndex) => {
    const day = daysOfWeek[dayIndex];
    const isToday = dayIndex === today;
    const isDisabled = dayIndex > today;
    const isCompleted = dayIndex >= today - streakNumber;
    // const isCompleted = !hasRemainingTasks && dayIndex < today;
    return (
      <View key={day} style={isToday ? styles.today : styles.day}>
        <Text style={isToday ? styles.todayText : styles.dayText}>{day}</Text>

        {/* today's jar icon */}
        {isToday ? (
          remaining ? (
            <EmptyJarIcon />
          ) : (
            <FilledJarIcon />
          )
        ) : // other days icon
        isDisabled ? (
          <DisabledJarIcon />
        ) : isCompleted ? (
          <FilledJarIcon />
        ) : (
          <EmptyJarIcon />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {daysOfWeek.map((_, index) => renderJar(index))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    //alignItems: "center",
     // backgroundColor: "white",
  },
  day: {
    alignItems: "center",
    justifyContent: "center",
  },
  today: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 5,
    padding: 2,
  },
  dayText: {
    fontSize: 14,
  },
  todayText: {
    fontSize: 14,
    fontWeight: "bold",
  },

});
