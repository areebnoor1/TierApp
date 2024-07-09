import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FilledJarIcon from "../SVGicons/FilledJarIcon.js";
import EmptyJarIcon from "../SVGicons/EmptyJarIcon.js";
import DisabledJarIcon from "../SVGicons/DisabledJarIcon.js";

const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export default function WeekJars({ completedGoals }) {
  const today = new Date().getDay();

  const renderJar = (dayIndex) => {
    const day = daysOfWeek[dayIndex];
    const isToday = dayIndex === today;
    const isCompleted = completedGoals.includes(dayIndex);
    const isDisabled = dayIndex > today;

    return (
      <View key={day} style={isToday ? styles.today : styles.day}>
        <Text style={isToday ? styles.todayText : styles.dayText}>{day}</Text>
        {isDisabled ? (
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
    alignItems: "center",
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
