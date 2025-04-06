/** @format */

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Navbar = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
        backgroundColor: "#ccc",
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text>🏠 Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Photos")}>
        <Text>📸 Photos</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Video")}>
        <Text>📸 Videos</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;
