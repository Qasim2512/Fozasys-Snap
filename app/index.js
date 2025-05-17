/** @format */

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  Image,
  TextInput,
  Button,
} from "react-native";
import Home from "./Home/Home";
import Photos from "./Photos/photos";
import Video from "./Video/VideoList";
import Login from "./Auth/Login";
import Register from "./Auth/register";
import Profile from "./Auth/profile";
import NewFile from "./newFile";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("Home");
  const [authPage, setAuthPage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    uploads: [],
    profilePic: "",
  });

  useEffect(() => {
    // You can check local storage or async storage here to check if user is already logged in
    // Example: getUserDataFromStorage();
  }, []);

  const showLoginPage = () => setAuthPage("Login");
  const showRegisterPage = () => setAuthPage("Register");

  const handleLoginSuccess = async (token, user) => {
    try {
      // Corrected URL by wrapping the string in quotes

      const baseUrl =
        Platform.OS === "web"
          ? `http://localhost:3000/user/${user._id}`
          : `http://172.20.10.3:3000/user/${user._id}`;

      const res = await fetch(baseUrl);
      const userData = await res.json();
      setUserInfo(userData); // updated with the correct userData from response
      setIsLoggedIn(true);
      setAuthPage(""); // close the auth page after successful login
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
    }
  };

  const handleRegisterSuccess = (user) => {
    setAuthPage("Login");
    setUserInfo(user);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setAuthPage("Login");
    setUserInfo({
      username: "",
      email: "",
      uploads: [],
      profilePic: "",
    });
    setShowProfileMenu(false);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ flex: 1 }}>
        {authPage === "Login" ? (
          <Login
            onLoginSuccess={handleLoginSuccess}
            showRegisterPage={showRegisterPage}
          />
        ) : authPage === "Register" ? (
          <Register onRegisterSuccess={handleRegisterSuccess} />
        ) : (
          <View style={{ marginTop: 60 }}>
            {isLoggedIn ? (
              <>
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
                  <TouchableOpacity onPress={() => setCurrentPage("newFile")}>
                    <Text style={styles.navText}>New File</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setShowProfileMenu(!showProfileMenu)}
                  >
                    <Text style={styles.navText}> 👤 Profile</Text>
                  </TouchableOpacity>
                </View>

                {/* Profile dropdown */}
                {showProfileMenu && (
                  <View style={styles.dropdown}>
                    <TouchableOpacity
                      onPress={() => {
                        setCurrentPage("Account");
                        setShowProfileMenu(false);
                      }}
                    >
                      <Text style={styles.dropdownItem}>Account Info</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={logout}>
                      <Text style={styles.dropdownItem}>Logout</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {/* Render pages */}
                {currentPage === "Home" && <Home />}
                {currentPage === "Photos" && <Photos />}
                {currentPage === "Video" && <Video />}
                {currentPage === "Account" && <Profile userInfo={userInfo} />}
                {currentPage === "newFile" && <NewFile />}
              </>
            ) : (
              <Login
                onLoginSuccess={handleLoginSuccess}
                showRegisterPage={showRegisterPage}
              />
            )}
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
  dropdown: {
    backgroundColor: "#444",
    padding: 10,
  },
  dropdownItem: {
    color: "white",
    paddingVertical: 5,
    fontSize: 16,
  },
});

export default Index;
