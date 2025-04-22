import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Home from "./Home/Home";
import Photos from "./Photos/photos";
import Video from "./Video/video";
import Login from "./Auth/Login";
import Register from "./Auth/register";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("Home");
  const [authPage, setAuthPage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const showLoginPage = () => setAuthPage("Login");
  const showRegisterPage = () => setAuthPage("Register");
  const logout = () => {
    setIsLoggedIn(false);
    setAuthPage("");
  };

  const handleLoginSuccess = (token) => {
    // Store the token (in state or AsyncStorage) for authenticated sessions
    setIsLoggedIn(true);
    setAuthPage("");
    console.log("Login successful, token:", token);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={styles.navbar}>
          <TouchableOpacity onPress={() => setCurrentPage("Home")}>
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCurrentPage("Photos")}>
            <Text style={styles.navText}>Photos</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCurrentPage("Video")}>
            <Text style={styles.navText}>Videos</Text>
          </TouchableOpacity>
        </View>

        {authPage === "Login" ? (
          <Login onLoginSuccess={handleLoginSuccess} />
        ) : authPage === "Register" ? (
          <Register onRegisterSuccess={handleLoginSuccess} />
        ) : (
          <View style={{ marginTop: 60 }}>
            {currentPage === "Home" && <Home />}
            {currentPage === "Photos" && <Photos />}
            {currentPage === "Video" && <Video />}
          </View>
        )}

        {!isLoggedIn && !authPage && (
          <View style={styles.authNav}>
            <TouchableOpacity style={styles.button} onPress={showLoginPage}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={showRegisterPage}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        )}

        {isLoggedIn && (
          <View style={styles.logoutContainer}>
            <TouchableOpacity style={styles.button} onPress={logout}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#333",
  },
  navText: {
    color: "white",
    fontSize: 18,
  },
  button: {
    backgroundColor: "#333",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  authNav: {
    position: "absolute",
    bottom: 20,
    left: "50%",
    transform: [{ translateX: -80 }],
    flexDirection: "row",
    justifyContent: "space-between",
    width: 180,
  },
  logoutContainer: {
    position: "absolute",
    bottom: 20,
    left: "50%",
    transform: [{ translateX: -60 }],
  },
});

export default Index;
