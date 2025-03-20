import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Home from "./Home/Home";
import Post from "./Posts/posts";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("Home");

  return (
    <View style={{ flex: 1 }}>
      {/* Navbar uten imports */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          padding: 10,
          backgroundColor: "#333",
        }}
      >
        <TouchableOpacity onPress={() => setCurrentPage("Home")}>
          <Text style={{ color: "white", fontSize: 18 }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentPage("Post")}>
          <Text style={{ color: "white", fontSize: 18 }}>Posts</Text>
        </TouchableOpacity>
      </View>

      {/* Viser riktig side basert på currentPage */}
      {currentPage === "Home" ? <Home /> : <Post />}
    </View>
  );
};

export default Index;

