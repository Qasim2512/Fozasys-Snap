/** @format */

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Platform,
} from "react-native";

const Profile = ({ userInfo }) => {
  const [newProfilePic, setNewProfilePic] = useState("");
  const [isUpdatingPic, setIsUpdatingPic] = useState(false);

  useEffect(() => {
    console.log("User Info:", userInfo);
  }, [userInfo]);

  const handleUpdateProfilePic = async () => {
    const baseUrl =
      Platform.OS === "web"
        ? `http://localhost:3000/user/${userInfo._id}/profile-pic`
        : `http://172.20.10.3:3000//user/${userInfo._id}/profile-pic`;

    try {
      setIsUpdatingPic(true);
      const response = await fetch(baseUrl, {
        method: "POST",
        body: JSON.stringify({ profilePic: newProfilePic }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const updatedUser = await response.json();
      setIsUpdatingPic(false);
      alert("Profile picture updated successfully!");
    } catch (error) {
      setIsUpdatingPic(false);
      alert("Failed to update profile picture");
    }
  };

  const uploads = userInfo.posts || [];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}> Account Overview </Text>

      <View style={styles.card}>
        <Image
          source={{
            uri: userInfo.profilePic || "https://via.placeholder.com/150",
          }}
          style={styles.profilePic}
        />

        <Text style={styles.label}>Username</Text>
        <Text style={styles.value}>
          @{userInfo.username || "Not available"}
        </Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{userInfo.email || "Not available"}</Text>

        <Text style={styles.label}>Posts</Text>
        {uploads.length === 0 ? (
          <Text style={styles.value}>No posts yet </Text>
        ) : (
          uploads.map((post, index) => (
            <Text key={index} style={styles.postItem}>
              • {post}
            </Text>
          ))
        )}

        <Text style={styles.label}>Update Profile Picture</Text>
        <TextInput
          style={styles.input}
          placeholder="Paste new profile pic URL"
          value={newProfilePic}
          onChangeText={setNewProfilePic}
        />
        <View style={styles.buttonContainer}>
          <Button
            title={isUpdatingPic ? "Updating..." : "Update Picture"}
            onPress={handleUpdateProfilePic}
            disabled={isUpdatingPic}
            color="#4a90e2"
          />
          {isUpdatingPic && <ActivityIndicator style={{ marginTop: 10 }} />}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: "#f0f4f8",
    flexGrow: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#4a90e2",
  },
  label: {
    fontSize: 16,
    color: "#666",
    marginTop: 15,
    marginBottom: 3,
  },
  value: {
    fontSize: 18,
    color: "#222",
    fontWeight: "600",
  },
  postItem: {
    fontSize: 16,
    color: "#444",
    marginTop: 5,
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default Profile;
