import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ActiveJar from "./SVGicons/ActiveJarTab.js";
import InactiveJar from "./SVGicons/InactiveJarTab.js";
import HomePage from "./HomePage";
import Jars from "./Jars";
import Activity from "./Activity";
import SettingsScreen from "./Settings";

export default function TabNavigator() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 0,
          height: 80,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontSize: 15,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="home" style={styles.icon} size={30} />
            ) : (
              <Ionicons name="home-outline" size={30} color="black" />
            ),
          tabBarLabel: ({ focused }) => (
            <Text style={[styles.label, focused && styles.boldLabel]}>
              Home
            </Text>
          ),
        }}
        component={HomePage}
      />
      <Tab.Screen
        name="Jars"
        component={Jars}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <ActiveJar color="black" />
            ) : (
              <InactiveJar color="black" />
            ),
          tabBarLabel: ({ focused }) => (
            <Text style={[styles.label, focused && styles.boldLabel]}>
              Jars
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Activity"
        component={Activity}
        options={{
          tabBarIcon: () => (
            <MaterialIcons
              name="playlist-add-check"
              style={styles.icon}
              size={30}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={[styles.label, focused && styles.boldLabel]}>
              Activity
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="settings" style={styles.icon} size={30} />
            ) : (
              <Ionicons name="settings-outline" size={30} color="black" />
            ),
          tabBarLabel: ({ focused }) => (
            <Text style={[styles.label, focused && styles.boldLabel]}>
              Settings
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginBottom: -5, // Adjust to bring the icon closer to the text
  },
  label: {
    fontSize: 15,
    color: "black",
    marginTop: -5, // Adjust to bring the text closer to the icon
  },
  boldLabel: {
    fontWeight: "bold",
  },
});
