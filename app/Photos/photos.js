/** @format */

import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import styles from "./Photos.style";
import SearchBar from "../../Components/Searchbar/Searchbar";

const Photo = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let response = await fetch("http://localhost:3000/photo");
    let data = await response.json();
    setPhotos(data);
  };

  const deletePhoto = async (_id) => {
    try {
      const response = await fetch(`http://localhost:3000/photo/${_id}`, {
        method: "DELETE", 
      });

      console.log("Response:", response); 
      if (response.ok) {
        console.log("Photo deleted successfully."); 
        setPhotos((prevPhotos) =>
          prevPhotos.filter((photo) => photo._id !== _id)
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
      <SearchBar style={styles.searchbar} />
      <Text style={styles.headingText}>Her skal alle postene ligge</Text>
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }} 
        showsVerticalScrollIndicator={false} 
      >
        {photos.length > 0 ? (
          photos.map((photo, index) => (
            <View key={index} style={styles.photoCard}>
              <Text style={styles.photoText}>
                Navn: {photo.name}, ID: {photo._id}
              </Text>
              <View style={styles.imageWrapper}>
                <Image
                  style={styles.photoImage}
                  source={{ uri: photo.photo }}
                />
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deletePhoto(photo._id)} 
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

export default Photo;
