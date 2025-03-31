/** @format */

import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import styles from "./Posts.style";
import SearchBar from "../../Components/Searchbar/Searchbar";

const Posts = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let response = await fetch("http://localhost:3000/photo");
    let data = await response.json();
    setPhotos(data);
  };

  console.log(photos);

  return (
    <View style={styles.container}>
      <SearchBar style={styles.searchbar} />
      <Text>Her skal alle postene ligge</Text>
      {photos.length > 0 ? (
        <Text>Navn: {photos[0].photo}</Text>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default Posts;
