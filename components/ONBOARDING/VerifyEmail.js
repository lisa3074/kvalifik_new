//INSTALLED PACKAGES
import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";

//APP COMPONENTS
import logo from "../../static/images/logo_invert.png";
import mailman from "../../static/images/postman-receive-letter.png";
import check from "../../static/images/icons8-checked.png";
import MainScreenStyling from "../../styling/MainScreenStyling";

const VerifyEmail = props => {
  const navigation = useNavigation();

  //Navigate to SetupProfile
  const handleSubmit = () => {
    navigation.navigate(props.action);
  };

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <Text style={[MainScreenStyling.heading, styles.heading]}>Just one more step...</Text>
        <Text style={styles.text}>
          We need to verify your student status. There is an email waiting for you in your mailbox.
        </Text>
        <Image source={mailman} style={styles.splash} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[MainScreenStyling.button, styles.button]} onPress={handleSubmit}>
            <Text style={MainScreenStyling.lightBtnTxt}>I've verified my email</Text>
            <Image source={check} style={styles.check} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: "#5050A5",
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginBottom: 16,
    marginRight: 8,
    alignSelf: "center",
  },
  container: {
    padding: 16,
    paddingTop: 50,
    backgroundColor: "#5050A5",
    height: "100%",
    alignItems: "center",
    width: "100%",
  },
  splash: {
    height: 246,
    width: 214,
  },
  check: {
    height: 20,
    width: 20,
  },
  buttonContainer: {
    width: "100%",
  },
  button: {
    backgroundColor: "white",
    flexDirection: "row",
    padding: 16,
    height: 60,
    marginTop: 56,
    justifyContent: "space-between",
    width: "100%",
  },
  heading: {
    color: "white",
  },
  text: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    paddingTop: 8,
    marginBottom: 32,
  },
});

export default VerifyEmail;
