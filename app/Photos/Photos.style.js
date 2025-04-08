/** @format */

// Photos.style.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
    padding: 10,
    alignItems: "center",
  },
  searchbar: {
    marginBottom: 10,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    elevation: 3,
    padding: 6,
    fontSize: 14,
    borderColor: "#007aff",
    borderWidth: 1,
    color: "#007aff",
  },
  headingText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 8,
    textAlign: "center",
    textShadowColor: "#dcdcdc",
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 2,
  },
  photoCard: {
    backgroundColor: "#ffffff",
    borderRadius: 6,
    overflow: "hidden",
    elevation: 3,
    marginBottom: 15,
    width: 450,
    height: 450,
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
  },
  imageWrapper: {
    borderWidth: 5, 
    borderColor: "#3498db", 
    borderRadius: 6,
    width: "100%", 
    height: "70%", 
    alignItems: "center",
    justifyContent: "center",
  },
  photoImage: {
    width: "100%", 
    height: "100%", 
    borderRadius: 6,
    resizeMode: "cover",
  },
  photoText: {
    fontSize: 14,
    color: "#34495e",
    fontWeight: "500",
    marginBottom: 3,
    textAlign: "center",
  },
  deleteButton: {
    backgroundColor: "#ff4757",
    borderRadius: 15,
    padding: 6,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
    elevation: 2,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 12,
  },
  loadingText: {
    fontSize: 14,
    color: "#7f8c8d",
    textAlign: "center",
  },
});

export default styles;
