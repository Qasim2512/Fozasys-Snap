/** @format */

import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Home from "./Home/Home";
import Photos from "./Photos/photos";
import VideoList from "./Video/VideoList";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("Home");

  return (
    <View style={{ flex: 1 }}>
      {/* Navbar uten imports */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 0.5,
          padding: 50,
          backgroundColor: "#333",
        }}
      >
        <TouchableOpacity onPress={() => setCurrentPage("Home")}>
          <Text style={{ color: "white", fontSize: 18 }}>🏠 Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentPage("Photos")}>
          <Text style={{ color: "white", fontSize: 18 }}>📸 Photos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentPage("Video")}>
          <Text style={{ color: "white", fontSize: 18 }}>🎥 Videos</Text>
        </TouchableOpacity>
      </View>

      {/* Viser riktig side basert på currentPage */}
      {currentPage === "Home" ? (
        <Home />
      ) : currentPage === "Photos" ? (
        <Photos />
      ) : (
        <VideoList />
      )}
    </View>
  );
};

export default Index;
