import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  Touchable,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { auth, getStreak, setStreak, initializeStreak } from "./firebase";
import { TodoContext } from "./TodoContext";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { Octicons } from "@expo/vector-icons";
const CustomButton = ({ title, onPress, style, textStyle, icon }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    {icon && (
      <Icon name={icon} size={20} color="#fff" style={styles.buttonIcon} />
    )}
    <Text style={[styles.buttonText, textStyle]}>{title}</Text>
  </TouchableOpacity>
);

const SettingsScreen = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [bestStreak, setBestStreak] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { todos, goal } = useContext(TodoContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        getStreak(currentUser.uid)
          .then((streak) => {
            if (streak !== null) {
              setBestStreak(streak);
            }
          })
          .catch((error) => {
            console.error("Error fetching streak:", error);
          });
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        Alert.alert("", "Invalid username and/or password", [{ text: "OK" }]);
        console.error(error.message);
      });
  };

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        initializeStreak(user.uid).then(() => handleLogin());
      })
      .catch((error) => {
        Alert.alert("", "Invalid username and/or password", [{ text: "OK" }]);
        console.error(error.message);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("signed out!");
        setUser(null);
        setIsLoggedIn(false);
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  const renderProfileSection = () => (
    <View>
      <View style={styles.topBar}>
        <Text style={styles.titleText}>Settings</Text>
        <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton2}>
          <Octicons name="sign-out" size={20} color="black" />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileSection}>
        <View style={{ alignItems: "center" }}>
          <Icon name="person-circle" size={100} color="black" />
          <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 8 }}>
            {user.displayName || "User Information"}
          </Text>
        </View>
        <View style={{ justifyContent: "center" }}>
          <Text style={{ color: "black", fontWeight: "bold" }}>
            {user.displayName || "Email:"}
          </Text>
          <Text style={styles.profileEmail}>{user.email}</Text>

          <View style={styles.summaryContainer}>
            <View style={styles.summaryBoxBlack}>
              <Text style={styles.summaryBlackBoxText}>Best Streak: </Text>
              <Text style={styles.summaryBlackBoxNum}>
                {goal.streak > bestStreak ? goal.streak : bestStreak}
              </Text>
            </View>
            <View style={styles.summaryBoxWhite}>
              <Text style={styles.summaryWhiteBoxText}>
                Remaining Tasks:{" "}
              </Text>
              <Text style={styles.summaryWhiteBoxNum}>
                {todos.filter((todo) => todo.completed === false).length}
              </Text>
            </View>
          </View>
        </View>
        {/* <CustomButton title="Sign Out" onPress={handleSignOut} style={styles.signOutButton} icon="log-out-outline" /> */}
      </View>
    </View>
  );

  const renderAuthSection = () => (
    <>
      <View>
        <View style={styles.topBar}>
          <Text style={styles.titleText}>Settings</Text>
        </View>
        <View style={styles.profileSection}>
          {isSignUp ? (
            <Text style={styles.subtitle}>
              Want to save your streak and number of remaining tasks? Create an
              account!
            </Text>
          ) : (
            <Text style={styles.subtitle}>
              Want to save your streak and number of remaining tasks? Log in!
            </Text>
          )}

          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            placeholderTextColor="#aaa"
          />
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            secureTextEntry
            placeholder="Password"
            placeholderTextColor="#aaa"
          />
          {isSignUp ? (
            <>
              <CustomButton title="Sign Up" onPress={handleSignUp} />
              <TouchableOpacity onPress={() => setIsSignUp(false)}>
                <Text style={styles.switchText}>
                  Already have an account? Log In
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <CustomButton title="Log In" onPress={handleLogin} />
              <TouchableOpacity onPress={() => setIsSignUp(true)}>
                <Text style={styles.switchText}>
                  Don't have an account? Sign Up
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      {user ? renderProfileSection() : renderAuthSection()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // backgroundColor: 'red',
    //  width: "100%",
    //    height: "100%",
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 32,
    //   padding: 16,
    //width: "80%",
    // justifyContent: "center",
    borderWidth: 2,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "white",
  },

  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 8,
    alignItems: "center",
  },
  profileEmail: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  accountDetails: {
    marginTop: 16,
    alignItems: "center",
  },
  accountText: {
    fontSize: 16,
    marginBottom: 8,
  },
  signOutButton: {
    marginTop: 16,
    backgroundColor: "black",
    justifyContent: "flex-end",
  },
  signOutButton2: {
    //marginTop: 16,
    flexDirection: "row",
    paddingHorizontal: 8,
    padding: 5,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 6,
    justifyContent: "space-around",
    //  justifyContent: "flex-end",
  },
  signOutText: {
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "bold",
  },
  authSection: {
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
    color: "black",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 16,
    color: "black",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    width: "100%",
    color: "#333",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black",
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    width: "100%",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonIcon: {
    marginRight: 8,
  },
  switchText: {
    color: "#4A90E2",
    marginTop: 16,
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryBoxWhite: {
    width: "60%",
    height: 80,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
  },
  summaryBoxBlack: {
    width: "36%",
    height: 80,
    borderRadius: 10,
    backgroundColor: "black",
  },
  summaryBlackBoxText: {
    color: "white",
    left: 10,
    top: 5,
    fontSize: 16,
  },
  summaryWhiteBoxText: {
    color: "black",
    padding: 5,
    fontSize: 16,
  },
  summaryWhiteBoxNum: {
    fontFamily: "Inter",
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    position: "absolute",
    bottom: 10,
    left: 20,
  },
  summaryBlackBoxNum: {
    fontFamily: "Inter",
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    position: "absolute",
    bottom: 10,
    left: 20,
  },
  screen: {
    ///  backgroundColor: "#FFF",
    padding: 16,
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    //marginBottom: 24,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    //padding: 16,
    paddingHorizontal: 10,
    alignItems: "flex-end",

    //  backgroundColor: "white",
    marginBottom: 24,
  },
});

export default SettingsScreen;
