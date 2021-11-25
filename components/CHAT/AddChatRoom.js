//INSTALLED PACKAGES
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { useDispatch } from "react-redux";

//APP COMPONENTS
import { newChatRoom, deleteChatRoom } from "./chatStore/ChatAction";
import MainScreenStyling from "../../styling/MainScreenStyling";
import { round } from "react-native-reanimated";

const AddChatRoom = props => {
  const dispatch = useDispatch();

  //State variables
  const [text, setText] = useState("");

  //Call newChatRoom or deleteChatRomm in response to type (redux action)
  const handleSubmit = type => {
    dispatch(type === "new" ? newChatRoom(text) : deleteChatRoom(text));
    setText("");
  };

  return (
    <View style={styles.row}>
      <TextInput style={styles.textInput} onChangeText={setText} value={text} placeholder="Add / delete chat room" />
      <TouchableOpacity style={[MainScreenStyling.button, styles.button]} onPress={() => handleSubmit("new")}>
        <Text style={MainScreenStyling.darkBtnTxt}>Add</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[MainScreenStyling.button, styles.button]} onPress={() => handleSubmit("delete")}>
        <Text style={MainScreenStyling.darkBtnTxt}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    height: 44,
    backgroundColor: "#FFFFFF",
    marginLeft: 10,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  button: {
    marginLeft: 8,
  },
});

export default AddChatRoom;
