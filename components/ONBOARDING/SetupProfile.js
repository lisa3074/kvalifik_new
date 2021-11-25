//INSTALLED PACKAGES
import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";

//APP COMPONENTS
import Input from "../REUSABLE_COMPONENTS/Input";
import MainScreenStyling from "../../styling/MainScreenStyling";
import logo from "../../static/images/CBS_logo.png";
import ProfileImage from "../REUSABLE_COMPONENTS/ProfileImage";

const SetupProfile = props => {
  const navigation = useNavigation();

  //Destructure props
  const { firstname, setFirstname, lastname, setLastname, imageUrl, setImageUrl, studyProgramme, setStudyProgramme } =
    props;

  //State variables, set initial state to false (apart from imageUrl to be able to complete flow without setting image handler up)
  const [isFirstnameValid, setIsFirstNameValid] = useState(false);
  const [isLastnameValid, setIsLastNameValid] = useState(false);
  const [isStudyProgrammeValid, setIsStudyProgrammeValid] = useState(false);
  const [isImageUrlValid, setIsImageUrlValid] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isTouched, setIsTouched] = useState(false);

  //Set isDisabled / isTouched whenever isFirstnameValid, isLastnameValid, isStudyProgrammeValid or isImageUrlValid changes
  useEffect(
    function handleSignupBtn() {
      isFirstnameValid && isLastnameValid && isStudyProgrammeValid && isImageUrlValid
        ? setIsDisabled(false)
        : setIsDisabled(true);
      isFirstnameValid && isLastnameValid && isStudyProgrammeValid && isImageUrlValid && setIsTouched(false);
    },
    [isFirstnameValid, isLastnameValid, isStudyProgrammeValid, isImageUrlValid]
  );

  //Navigate to Notifications only if button is not disabled, otherwise set isTouched to true
  const handleSubmit = () => {
    isDisabled ? setIsTouched(true) : navigation.navigate(props.action);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={logo} style={MainScreenStyling.logo} />
        <Text style={MainScreenStyling.heading}>Before we start...</Text>
        <ProfileImage imageUrl={imageUrl} setImageUrl={setImageUrl} />
        <View style={[styles.input, MainScreenStyling.input]}>
          {/* Reusable component */}
          <Input
            placeholder={"First name"}
            label={"What is your first name?"}
            text={firstname}
            error={""}
            isValid={isFirstnameValid}
            setIsValid={setIsFirstNameValid}
            setText={setFirstname}
          />
        </View>
        <View style={[styles.input, MainScreenStyling.input]}>
          {/* Reusable component */}
          <Input
            placeholder={"Last name"}
            label={"What is your last name?"}
            text={lastname}
            error={""}
            isValid={isLastnameValid}
            setIsValid={setIsLastNameValid}
            setText={setLastname}
          />
        </View>
        <View style={[styles.input, MainScreenStyling.input]}>
          {/* Reusable component */}
          <Input
            placeholder={"Study programme"}
            label={"What do you study?"}
            text={studyProgramme}
            error={""}
            isValid={isStudyProgrammeValid}
            setIsValid={setIsStudyProgrammeValid}
            setText={setStudyProgramme}
          />
        </View>

        {/* Show only error text if */}
        {isDisabled &&
          isTouched &&
          (!isFirstnameValid || !isLastnameValid || !isStudyProgrammeValid || !isImageUrlValid) && (
            <Text style={styles.error}>You need to fill out all fields to proceed.</Text>
          )}
        <TouchableOpacity
          style={[MainScreenStyling.button, styles.button, isDisabled && styles.disabled]}
          onPress={handleSubmit}>
          <Text style={MainScreenStyling.darkBtnTxt}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const CBS_disabled = "#BABADD";
const styles = StyleSheet.create({
  button: {
    paddingTop: 16,
    paddingBottom: 16,
    alignItems: "flex-start",
  },
  input: {
    height: 60,
  },
  disabled: {
    backgroundColor: CBS_disabled,
  },
  error: {
    color: "red",
    marginTop: 8,
  },
  container: {
    backgroundColor: "white",
    height: "100%",
    padding: 16,
    paddingTop: 50,
  },
});

export default SetupProfile;
