//INSTALLED PACKAGES
import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import { useDispatch } from "react-redux";

//APP COMPONENTS
import { userSignup } from "../ONBOARDING/onboardingStore/OnboardingAction";
import MainScreenStyling from "../../styling/MainScreenStyling";
import notifications from "../../static/images/notifications.png";

const Notification = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  //Destructure props
  const { signupEmail, signupPassword, isSignedin, firstname, lastname, imageUrl, studyProgramme } = props;

  //Call userSignup (Redux action)
  const handleSignup = notifications => {
    dispatch(
      userSignup(
        signupEmail,
        signupPassword,
        firstname,
        lastname,
        imageUrl,
        studyProgramme,
        notifications,
        notifications
      )
    );
  };

  //Don't navigate to start screen before making sure the user is logged in.
  useEffect(() => {
    isSignedin && navigation.navigate(props.action);
  }, [isSignedin]);

  return (
    <View style={styles.container}>
      <Image source={notifications} style={styles.splash} />
      <Text style={[MainScreenStyling.heading, styles.heading]}>Stay in the loop</Text>
      <Text style={styles.text}>Enable notifications to stay updated on new messages and more.</Text>
      <View style={styles.fullwidth}>
        {/* Set chat and event notifications to true */}
        <TouchableOpacity style={[MainScreenStyling.button, styles.btnHeight]} onPress={() => handleSignup(true)}>
          <Text style={MainScreenStyling.darkBtnTxt}>Turn on notifications</Text>
        </TouchableOpacity>
        {/* Set chat and event notifications to false */}
        <TouchableOpacity style={[MainScreenStyling.button, styles.lightBtn]} onPress={() => handleSignup(false)}>
          <Text style={[MainScreenStyling.darkBtnTxt, styles.lightBtnTxt]}>Maybe later</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 120,
    height: "100%",
  },
  fullwidth: {
    width: "100%",
  },
  heading: {
    color: "#5050A5",
    textAlign: "center",
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 32,
  },
  lightBtn: {
    backgroundColor: "#33333320",
    height: 60,
    marginTop: 16,
  },
  lightBtnTxt: {
    color: "#333333",
  },
  btnHeight: {
    height: 60,
  },
  splash: {
    height: 200,
    width: 200,
    marginBottom: 40,
  },
});

export default Notification;
