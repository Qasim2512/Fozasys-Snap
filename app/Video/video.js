/** @format */

import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import styles from "./Video.style";
import SearchBar from "../../Components/Searchbar/Searchbar";

const Video = () => {
  const [video, setVideo] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let response = await fetch("http://localhost:3000/video");
    let data = await response.json();
    setVideo(data);
  };

  const deleteVideo = async (_id) => {
    try {
      const response = await fetch(`http://localhost:3000/video/${_id}`, {
        method: "DELETE",
      });

      console.log("Response:", response);
      if (response.ok) {
        console.log("video deleted successfully.");
        setVideo((prevVideo) => prevVideo.filter((video) => video._id !== _id));
      } else {
        console.error("Failed to delete the video.", await response.text());
      }
    } catch (error) {
      console.error("Error deleting the video:", error);
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar style={styles.searchbar} />
      <Text style={styles.headingText}>Her skal alle postene ligge</Text>
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        showsVerticalScrollIndicator={false}
      >
        {video.length > 0 ? (
          video.map((video, index) => (
            <View key={index} style={styles.videoCard}>
              <Text style={styles.videoText}>Navn: {video.name}</Text>
              <View style={styles.imageWrapper}>
                <Image
                  style={styles.videoImage}
                  source={{ uri: video.video }}
                />
              </View>
              <Text style={styles.videoDescription}>
                description: {video.description}
              </Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteVideo(video._id)}
              >
                <Text style={styles.buttonText}>❌ Slett</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.loadingText}>Loading...</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default Video;
