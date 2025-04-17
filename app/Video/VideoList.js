/** @format */

import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import styles from "./Video.style";
import { Searchbar } from "react-native-paper";
import filter from "lodash.filter";
import { X } from "lucide-react-native";

const VideoList = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch("http://localhost:3000/video");
    const dataInfo = await response.json();
    setData(dataInfo);
    setFullData(dataInfo);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const formattedQuery = query.toLowerCase();
    const filteredData = filter(fullData, (user) => {
      return contains(user, formattedQuery);
    });
    setData(filteredData);
  };

  const contains = ({ name }, query) => {
    return name.toLowerCase().includes(query);
  };

  const deleteVideo = async (_id) => {
    try {
      const response = await fetch(`http://localhost:3000/video/${_id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setData((prevVideo) => prevVideo.filter((video) => video._id !== _id));
        setFullData((prevData) =>
          prevData.filter((photo) => photo._id !== _id)
        );
      } else {
        console.error("Failed to delete the video.", await response.text());
      }
    } catch (error) {
      console.error("Error deleting the video:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search by name"
        onChangeText={handleSearch}
        value={searchQuery}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        showsVerticalScrollIndicator={false}
      >
        {data.length > 0 ? (
          data.map((video, index) => (
            <View key={index} style={styles.videoCard}>
              <Text style={styles.videoText}>Navn: {video.name}</Text>
              <View style={styles.imageWrapper}>
                <video
                  style={styles.videoImage}
                  source={{ uri: video.video }}
                />{" "}
                {/*husk å bytte denne til video og ikke image VELDIG VIKTIG HUSKEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/}
              </View>
              <Text style={styles.videoDescription}>
                description: {video.description}
              </Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteVideo(video._id)}
              >
                <X style={styles.buttonLogo} />

                <Text style={styles.buttonText}>Slett</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : searchQuery ? (
          <Text>No results found for "{searchQuery}".</Text>
        ) : (
          <Text>Loading...</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default VideoList;
