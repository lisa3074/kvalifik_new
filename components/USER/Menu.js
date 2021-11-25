//INSTALLED PACKAGES
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";

//APP COMPONENTS
import Logout from "./Logout";
import CheckBox from "../REUSABLE_COMPONENTS/Checkbox";
import MainScreenStyling from "../../styling/MainScreenStyling";
import { editNotifications } from "./userStore/UserAction";
import placeholder from "../../static/images/placeholder.png";

const Menu = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  //get redux states
  const loggedInUser = useSelector(state => state.user.loggedInUser);
  const token = useSelector(state => state.user.token);

  //State variables
  const [isChatChecked, setIsChatChecked] = useState(undefined);
  const [isEventChecked, setIsEventChecked] = useState(undefined);

  //Go to edit profile
  const HandleEdit = () => {
    navigation.navigate(props.action);
  };

  //Finding first and last name to display on profile.
  const firstName = loggedInUser.firstname;
  const lastName = loggedInUser.lastname;
  const firstSpace = firstName.indexOf(" ");
  const lastSpace = lastName.lastIndexOf(" ");
  let firstFirstName;
  //if there's more than one name
  if (firstSpace != -1) {
    firstFirstName = firstName.substring(0, firstSpace);
  } else {
    firstFirstName = firstName;
  }
  const lastLastName = lastName.substring(lastSpace, 1000);
  const newFullName = firstFirstName.trim() + " " + lastLastName.trim();

  useEffect(() => {
  setIsChatChecked(loggedInUser.chatNotifications)
  setIsEventChecked(loggedInUser.eventNotifications)
  }, [])

  //Call editNotifications whenever isChatChecked or isEventChecked changes
  useEffect(() => {
    if (isChatChecked != undefined && isEventChecked != undefined) {
     
      dispatch(editNotifications(isChatChecked, isEventChecked, loggedInUser.id, token, loggedInUser.firstname, loggedInUser.lastname, loggedInUser.studyProgramme, loggedInUser.email, loggedInUser.imageUrl));
    }
  }, [isChatChecked, isEventChecked]);

  /* const handleChange = () => {
    console.log("handleChange")
  } */

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Image style={styles.profilePicture} source={placeholder} />
          <View style={styles.textContainer}>
            <Text style={[MainScreenStyling.heading, styles.textColor]}>{newFullName}</Text>
            <Text style={[MainScreenStyling.paragraphSmall, styles.textColor]}>{loggedInUser.email}</Text>
            <Text style={[MainScreenStyling.paragraphSmall, styles.textColor]}>{loggedInUser.studyProgramme}</Text>
          </View>
        </View>
        <TouchableOpacity style={MainScreenStyling.button} onPress={HandleEdit}>
          <Text style={MainScreenStyling.darkBtnTxt}>Edit profile</Text>
        </TouchableOpacity>
        <View style={styles.line}></View>
        <View>
          <Text style={[MainScreenStyling.header, styles.textColor]}>NOTIFICATIONS</Text>
          <View style={styles.notificationContainer}>
            <View>
              <Text style={styles.heading}>Chat</Text>
              <Text style={MainScreenStyling.paragraphSmall}>When you recieve a new message</Text>
            </View>
            {/* Reusable compoent */}
            <CheckBox l
              abel={""}
              isChecked={isChatChecked}
              setIsChecked={setIsChatChecked}
              type={"switch"}
              error={""} />
          </View>
          <View style={styles.notificationContainer}>
            <View>
              <Text style={styles.heading}>Event reminder</Text>
              <Text style={MainScreenStyling.paragraphSmall}>An hour before events you are ‘going to’</Text>
            </View>
            {/* Reusable compoent */}
            <CheckBox
              label={""}
              isChecked={isEventChecked}
              setIsChecked={setIsEventChecked}
              type={"switch"}
              error={""}
            />
          </View>
        </View>
        <View style={styles.line}></View>
        <Logout />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  profilePicture: {
    width: 70,
    height: 70,
    borderRadius: 100,
    marginRight: 16,
  },
  profileContainer: {
    flexDirection: "row",
  },
  textColor: {
    color: "#32305D",
  },
  line: {
    borderBottomColor: "#AAAAAA",
    borderBottomWidth: 1,
    marginTop: 32,
    marginBottom: 32,
    opacity: 0.2,
  },
  notificationContainer: {
    backgroundColor: "white",
    borderRadius: 5,
    flexDirection: "row",
    padding: 16,
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 8,
    marginTop: 24,
    shadowColor: "#AAAAAA",
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 3,
    },
  },
  heading: {
    color: "#32305D",
    fontSize: 16,
    fontFamily: "OpenSans_700Bold",
  },
  textContainer: {
    paddingBottom: 16,
  },
});

export default Menu;
