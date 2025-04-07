/** @format */

import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import styles from "./Video.style";
import SearchBar from "../../Components/Searchbar/Searchbar";

const Video = () => {
  const [video, setVideo] = useState([]);

  /*
  const videoURl =
    "https://res.cloudinary.com/dand5cke0/video/upload/v1743966441/fqnigrt5zh29tovjtsae.mkv";

     <video width="600" controls autoPlay>
        <source src={videoURl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    */
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
      )}{" "}
    </View>
  );
};

export default Video;
