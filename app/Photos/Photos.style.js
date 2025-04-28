/** @format */

import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

// Definerer en flaggvariabel for å sjekke om enheten er mobil eller PC
const isMobile = width < 768; // Endre bredden basert på hva du anser som mobil

const mobileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1", // Lys bakgrunnsfarge
    padding: 15,
    alignItems: "center", // Sentrer innholdet
  },
  searchbar: {
    marginVertical: 15,
    borderRadius: 30,
    backgroundColor: "#ffffff",
    elevation: 3,
    padding: 10,
    width: "100%", // Full bredde til søkefeltet
  },
  headingText: {
    fontSize: 20, // Mindre fontstørrelse for overskrift på mobilen
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 20,
    textAlign: "center",
  },
  photoCard: {
    width: 350, // Full bredde for kortet
    height: 450, // Høyden tilpasses for mobile enheter
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    elevation: 3,
  },
  imageWrapper: {
    borderWidth: 5,
    borderColor: "#3498db",
    borderRadius: 10,
    overflow: "hidden",
    width: "100%",
    height: "70%",
  },
  photoImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", // Sørger for at hele bildet vises
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 25,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});

const pcStyles = StyleSheet.create({
  // Definerer PC-stiler her
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
    padding: 15,
    alignItems: "center",
  },
  searchbar: {
    marginVertical: 15,
    borderRadius: 30,
    backgroundColor: "#ffffff",
    elevation: 3,
    padding: 10,
    width: "100%",
  },
  headingText: {
    fontSize: 24, // Større fontstørrelse for overskrift på PC
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 20,
    textAlign: "center",
  },
  photoCard: {
    width: 600, // Fast bredde for kortet på PC
    height: 500,
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    elevation: 3,
    alignItems: "center", 
  },
  imageWrapper: {
    borderWidth: 5,
    borderColor: "#3498db",
    borderRadius: 10,
    overflow: "hidden",
    width: "100%",
    height: "70%",
    
  },
  photoImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 25,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});

// Eksporterer den aktuelle stilen basert på om det er mobil eller PC
const styles = isMobile ? mobileStyles : pcStyles;

export default styles;
