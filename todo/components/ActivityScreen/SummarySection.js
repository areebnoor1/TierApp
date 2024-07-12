import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SummarySection = ({ completedToday, dueToday, dueThisWeek }) => {
  return (
    <View style={styles.summaryContainer}>
      <View style={styles.summaryBoxBlack}>
        <Text style={styles.summaryBlackBoxText}>Completed Today: </Text>
        <Text style={styles.summaryBlackBoxNum}>{completedToday}</Text>
      </View>
      <View style={styles.summaryBoxWhite}>
        <Text style={styles.summaryWhiteBoxText}>Due Today: </Text>
        <Text style={styles.summaryWhiteBoxNum}>{dueToday}</Text>
      </View>
      <View style={styles.summaryBoxWhite}>
        <Text style={styles.summaryWhiteBoxText}>Due this week: </Text>
        <Text style={styles.summaryWhiteBoxNum}>{dueThisWeek}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  summaryContainer: {
    flex: 1,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    marginBottom: 10,
  },
  summary: {
    fontFamily: "Inter",
    color: "#A5A5A5",
    fontSize: 24,
  },
  summaryBoxWhite: {
    width: 100,
    height: 80,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "white",
    elevation: 2,
  },
  summaryBoxBlack: {
    width: 100,
    height: 80,
    borderRadius: 10,
    backgroundColor: "black",
    elevation: 2,
  },
  summaryBlackBoxText: {
    color: "white",
    left: 10,
    top: 5,
  },
  summaryWhiteBoxText: {
    color: "black",
    padding: 5,
  },
  summaryWhiteBoxNum: {
    fontFamily: "Inter",
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    position: "absolute",
    bottom: 10,
    left: 20,
  },
  summaryBlackBoxNum: {
    fontFamily: "Inter",
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    position: "absolute",
    bottom: 10,
    left: 20,
  },
});

export default SummarySection;
