/** @format */

import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import styles from "./Video.style";
import SearchBar from "../../Components/Searchbar/Searchbar";

const Posts = () => {
  const [video, setVideo] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let response = await fetch("http://localhost:3000/video");
    let data = await response.json();
    setVideo(data);
  };

  console.log(video);

  return (
    <View style={styles.container}>
      <SearchBar style={styles.searchbar} />
      <Text>Her skal alle postene ligge</Text>
      {video.length > 0 ? (
        <Text>Navn: {video[0].video}</Text>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default Posts;
