//INSTALLED PACKAGES
import React from "react";
import { Text, StyleSheet, ImageBackground, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

//APP COMPONENTS
import MainScreenStyling from "../../styling/MainScreenStyling";
import ghost from "../../static/images/ghost.png";
import books from "../../static/images/books.png";
import hammer from "../../static/images/hammer.png";

function HomeScreen() {
//Static events for displaying
  return (
    <ScrollView style={styles.center}>
      <ImageBackground style={styles.post} source={ghost}>
        <LinearGradient colors={["#00000000", "#00000000", "#00000099"]} style={styles.textContainer}>
          <Text style={styles.heading}>CBS Film presents: Ghost World</Text>
          <Text style={styles.organization}>CBS Film</Text>
          <Text style={[MainScreenStyling.lightText, styles.date]}>Mon, 1. Apr · 15.00 - 18.00</Text>
          <Text style={styles.location}>Husets Biograf, Rådhusstræde 13, 2 th, 1466 Co…</Text>
        </LinearGradient>
      </ImageBackground>
      <ImageBackground style={styles.post} source={hammer}>
        <LinearGradient colors={["#00000000", "#00000000", "#00000099"]} style={styles.textContainer}>
          <Text style={styles.heading}>CBS Film presents: Oldboy</Text>
          <Text style={styles.organization}>CBS Film</Text>
          <Text style={[MainScreenStyling.lightText, styles.date]}>Mon, 1. Apr · 15.00 - 18.00</Text>
          <Text style={styles.location}>Husets Biograf, Rådhusstræde 13, 2 th, 1466 Co…</Text>
        </LinearGradient>
      </ImageBackground>
      <ImageBackground style={styles.post} source={books}>
        <LinearGradient colors={["#00000000", "#00000000", "#00000099"]} style={styles.textContainer}>
          <Text style={styles.heading}>Studying during corona events...</Text>
          <Text style={styles.organization}>CBS Students</Text>
          <Text style={[MainScreenStyling.lightText, styles.date]}>Mon, 1. Apr · 15.00 - 18.00</Text>
          <Text style={styles.location}>Husets Biograf, Rådhusstræde 13, 2 th, 1466 Co…</Text>
        </LinearGradient>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  post: {
    width: "100%",
    height: 180,
    marginBottom: 16,
    borderRadius: 50,
     shadowColor: "#AAAAAA",
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 3,
    },
  },
  center: {
    padding: 16,
  },
  textContainer: {
    borderRadius: 5,
    padding: 16,
    justifyContent: "flex-end",
    height: "100%",
    backgroundColor: "#0000004d",
  },
  heading: {
    fontFamily: "Teko_500Medium",
    fontSize: 26,
    color: "white",
  },
  date: {
    fontSize: 12,
    fontFamily: "OpenSans_700Bold",
  },
  organization: {
    color: "white",
    fontFamily: "OpenSans_700Bold",
    fontSize: 12,
  },
  location: {
    color: "white",
    fontSize: 12,
  },
});

export default HomeScreen;
