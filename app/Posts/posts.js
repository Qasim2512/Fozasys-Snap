/** @format */

import React from "react";
import { Text, View } from "react-native";
import styles from "./Posts.style";
import SearchBar from "../../Components/Searchbar/Searchbar";

const Posts = () => {
  return (
    <View style={styles.container}>
      <SearchBar style={styles.searchbar}/>
      <Text>Her skal alle postene ligge</Text>
    </View>
  );
};

export default Posts;
