/** @format */

import React, { useEffect } from "react";
import { Text, View } from "react-native";
import styles from "./Posts.style";
import SearchBar from "../../Components/Searchbar/Searchbar";

const Posts = () => {
  useEffect(async () => {
    let response = await fetch("http://localhost:3000/photo");
    let json = await response.json();
    console.log(json);
    return json;
  }, []);

  return (
    <View style={styles.container}>
      <SearchBar style={styles.searchbar} />
      <Text>Her skal alle postene ligge</Text>
    </View>
  );
};

export default Posts;
