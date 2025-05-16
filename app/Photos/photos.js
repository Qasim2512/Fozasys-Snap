/** @format */

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform
} from "react-native";
import { Searchbar } from "react-native-paper";
import filter from "lodash.filter";
import { X } from "lucide-react-native";

import styles from "./Photos.style";

const Photo = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    //  let response = await fetch("http://localhost:3000/photo"); WEB

    const baseUrl =
      Platform.OS === "web"
        ? `http://localhost:3000/photo`
        : `http://172.20.10.3:3000/photo`;

    let response = await fetch(baseUrl); //APP
    let dataInfo = await response.json();

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

  const deletePhoto = async (_id) => {
    const baseUrl =
      Platform.OS === "web"
        ? `http://localhost:3000/photo/${_id}`
        : `http://172.20.10.3:3000/photo/${_id}`;
    try {
      const response = await fetch(baseUrl, {
        method: "DELETE",
      });

      if (response.ok) {
        setData((prevdata) => prevdata.filter((photo) => photo._id !== _id));
        setFullData((prevData) =>
          prevData.filter((photo) => photo._id !== _id)
        );
      } else {
        console.error("Failed to delete the photo.", await response.text());
      }
    } catch (error) {
      console.error("Error deleting the photo:", error);
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
          data.map((photo, index) => (
            <View key={index} style={styles.photoCard}>
              <Text style={styles.photoText}>Navn: {photo.name}</Text>
              <View style={styles.imageWrapper}>
                <Image
                  style={styles.photoImage}
                  source={{ uri: photo.photo }}
                />
              </View>
              <Text style={styles.photoDescription}>
                beskrivelse: {photo.description}
              </Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deletePhoto(photo._id)}
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

export default Photo;
