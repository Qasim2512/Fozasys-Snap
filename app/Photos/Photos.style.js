/** @format */

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
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
    fontSize: 24, // Større fontstørrelse for overskrift
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 20,
    textAlign: "center",
  },
  mainScroll: {
    flexGrow: 1,
    width: "100%",
  },
  photoCard: {
    width: 500, // Full bredde for kortet
    height: 400, // Høyden på kortene
    marginBottom: 20, // Økt margin for å gi bedre mellomrom
    marginTop: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  photoText: {
    fontSize: 16,
    color: "#34495e",
    marginBottom: 5,
    textAlign: "center",
  },
  imageWrapper: {
    borderWidth: 5,
    borderColor: "#3498db", // Farge på kanten til bildewrapper
    borderRadius: 10,
    overflow: "hidden",
    width: "100%", // Ta opp hele bredden av kortet
    height: "70%", // Ta opp mesteparten av kortets høyde
  },
  photoImage: {
    width: "100%",
    height: "100%", // Fyller hele bildet i wrapperen
    resizeMode: "cover", // Sørg for at hele bildet vises uten kutting
  },
  photoDescription: {
    fontSize: 14, // Størrelse for beskrivelse
    color: "#7f8c8d",
    textAlign: "center", // Sentrerer teksten
  },
  deleteButton: {
    backgroundColor: "#e74c3c", // Rød farge for slett-knappen
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 25,
    elevation: 5,
    alignSelf: "center", // Sentrere slett-knappen
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#7f8c8d",
    textAlign: "center",
  },
});

export default styles;
