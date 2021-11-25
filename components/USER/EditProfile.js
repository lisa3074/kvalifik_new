//INSTALLED PACKAGES
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useSelector, useDispatch } from "react-redux";

//APP COMPONENTS
import MainScreenStyling from "../../styling/MainScreenStyling";
import Input from "../REUSABLE_COMPONENTS/Input";
import { editUser, deleteUser } from "./userStore/UserAction";
import ProfileImage from "../REUSABLE_COMPONENTS/ProfileImage";

const EditProfile = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  //Get redux states
  const loggedInUser = useSelector(state => state.user.loggedInUser);
  const token = useSelector(state => state.user.token);

  //State variables
  const [firstName, setFirstName] = useState(loggedInUser.firstname);
  const [isFirstNameValid, setIsFirstNameValid] = useState(true);
  const [lastName, setLastName] = useState(loggedInUser.lastname);
  const [isLastNameValid, setIsLastNameValid] = useState(true);
  const [programme, setProgramme] = useState(loggedInUser.studyProgramme);
  const [isProgrammValid, setIsProgrammValid] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isTouched, setIsTouched] = useState(false);

  //If button is touched while disabled
  const handleDisabled = () => {
    setIsTouched(true);
  };

  //Call deleteUser (redux acition)
  const handleDelete = () => {
    console.log("handleDelete");
    dispatch(deleteUser(token, loggedInUser.id));
  };

  //Set disabled/touched whenever isFirstNameValid, isLastNameValid and isProgrammValid changes
  useEffect(
    function handleEditBtn() {
      //if password or email is not valid, set login button to disabled
      isFirstNameValid && isLastNameValid && isProgrammValid ? setIsDisabled(false) : setIsDisabled(true);
      //if password and email is valid, reset isTouched on button
      isFirstNameValid && isLastNameValid && isProgrammValid && setIsTouched(false);
    },
    [isFirstNameValid, isLastNameValid, isProgrammValid]
  );

  //Call editUser (redux acition) and navigate to profile
  const HandleSave = () => {
    dispatch(editUser(firstName, lastName, programme, loggedInUser.id, token, loggedInUser.email, loggedInUser.imageUrl, loggedInUser.chatNotifications, loggedInUser.eventNotifications));
    navigation.navigate(props.action);
  };

  return (
    <ScrollView style={styles.container}>
      <ProfileImage />
      <View style={MainScreenStyling.input}>
        {/* Reusable component */}
        <Input
          label={"What is your first name?"}
          placeholder={"Type your first name"}
          text={firstName}
          setText={setFirstName}
          isValid={isFirstNameValid}
          setIsValid={setIsFirstNameValid}
          error={""}
        />
      </View>
      <View style={MainScreenStyling.input}>
        {/* Reusable component */}
        <Input
          label={"What is your last name?"}
          placeholder={"Type your last name"}
          text={lastName}
          setText={setLastName}
          isValid={isLastNameValid}
          setIsValid={setIsLastNameValid}
          error={""}
        />
      </View>
      <View style={[MainScreenStyling.input, styles.inputHigh]}>
        {/* Reusable component */}
        <Input
          label={"Study programme"}
          placeholder={"Type your study programme"}
          text={programme}
          setText={setProgramme}
          isValid={isProgrammValid}
          setIsValid={setIsProgrammValid}
          error={""}
        />
      </View>
      {/* Only show error if */}
      {isDisabled && isTouched && (!isFirstNameValid || !isLastNameValid || isProgrammValid) && (
        <Text style={MainScreenStyling.error}>You need to fill out all fields</Text>
      )}

      {/* Only save if button is not disabled */}
      <TouchableOpacity
        style={[MainScreenStyling.button, styles.save, isDisabled && MainScreenStyling.disabled]}
        onPress={isDisabled ? handleDisabled : HandleSave}>
        <Text style={MainScreenStyling.darkBtnTxt}>Save changes</Text>
      </TouchableOpacity>

      {/* Only delete if button is not disabled */}
      <TouchableOpacity style={[MainScreenStyling.button, styles.delete]} onPress={handleDelete}>
        <Text style={[MainScreenStyling.lightBtnTxt, styles.deleteText]}>Delete profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 16,
    paddingTop: 0,
  },
  save: {
    height: 60,
    padding: 24,
    alignItems: "flex-start",
  },
  inputHigh: {
    height: 92,
    marginBottom: 16,
  },
  delete: {
    backgroundColor: "white",
    height: 60,
    padding: 24,
    alignItems: "flex-start",
    marginTop: 24,
    marginBottom: 24,
  },
  deleteText: {
    color: "#B10024",
  },
});

export default EditProfile;
