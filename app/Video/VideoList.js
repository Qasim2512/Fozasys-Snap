/** @format */

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import styles from "./Video.style";
import { Searchbar } from "react-native-paper";
import filter from "lodash.filter";
import { X } from "lucide-react-native";
import Video from "react-native-video";

const VideoList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [activeVideoId, setActiveVideoId] = useState(null); 

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const baseUrl =
      Platform.OS === "web"
        ? `http://localhost:3000/video`
        : `http://172.20.10.3:3000/video`;
    let response = await fetch(baseUrl); //APP
    const dataInfo = await response.json();
    setData(dataInfo);
    setFullData(dataInfo);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const formattedQuery = query.toLowerCase();
    const filteredData = filter(fullData, (user) =>
      contains(user, formattedQuery)
    );
    setData(filteredData);
  };

  const contains = ({ name }, query) => {
    return name.toLowerCase().includes(query);
  };

  const deleteVideo = async (_id) => {
    const baseUrl =
      Platform.OS === "web"
        ? `http://localhost:3000/video/${_id}`
        : `http://172.20.10.3:3000/video/${_id}`;
    try {
      const response = await fetch(baseUrl, {
        method: "DELETE",
      });

      if (response.ok) {
        setData((prevVideo) => prevVideo.filter((video) => video._id !== _id));
        setFullData((prevData) =>
          prevData.filter((photo) => photo._id !== _id)
        );

        if (activeVideoId === _id) {
          setActiveVideoId(null);
        }
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
              <View style={styles.videoWrapper}>
                {activeVideoId === video._id ? (
                  <Video
                    source={{ uri: video.video }} 
                    style={styles.videoImage}
                    controls={true} 
                    resizeMode="contain"
                    onEnd={() => setActiveVideoId(null)} 
                  />
                ) : (
                  <TouchableOpacity
                    onPress={() => setActiveVideoId(video._id)}
                    style={styles.playButton}
                  >
                    <Text style={styles.playButtonText}>Play</Text>
                  </TouchableOpacity>
                )}
              </View>
              <Text style={styles.videoDescription}>
                beskrivelse: {video.description}
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
