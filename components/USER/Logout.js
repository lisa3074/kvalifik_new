//INSTALLED PACKAGES
import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";

//APP COMPONENTS
import { userLogout } from "./userStore/UserAction";
import MainScreenStyling from "../../styling/MainScreenStyling";

const Logout = props => {
  const dispatch = useDispatch();

  //Call userLogout (redux acition)
  const handleLogout = () => {
    dispatch(userLogout());
  };

  return (
    <TouchableOpacity onPress={handleLogout} style={styles.logout}>
      <Text style={MainScreenStyling.header}>LOG OUT</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logout: {
    width: "100%",
    borderRadius: 5,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    shadowColor: "#AAAAAA",
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 3,
    },
  },
});

export default Logout;
