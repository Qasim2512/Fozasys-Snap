/** @format */

import React, { useEffect, useState } from "react";
import { Text, View, Image, ScrollView } from "react-native";
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

  return (
    <View style={styles.container}>
      <SearchBar style={styles.searchbar} />
      <Text>Her skal alle postene ligge</Text>
      {photos.length > 0 ? (
        <ScrollView>
          {photos.map((photos, index) => (
            <View key={index} style={{ marginBottom: 20 }}>
              <Text>Navn: {photos.photo}</Text>
              <Image
                style={{ width: 500, height: 500 }}
                source={{ uri: photos.photo }}
                onError={(error) => console.log("Error loading image:", error)} // Logge feil fører til at bilde ikke lastes
              />
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default Photo;
