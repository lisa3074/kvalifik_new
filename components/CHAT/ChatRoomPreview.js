//INSTALLED PACKAGES
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

//APP COMPONENTS
import golf from "./../../static/images/golf.png";

const ChatRoomPreview = props => {
  const navigation = useNavigation();

  //are there any massages in the chat room
  const lastPos = props.chatroom.messages.length - 1;
  let lastMessageText,
    displayTime = "";

  //If there are messages in the room, set message text and time for that message to preview
  if (lastPos > -1) {
    lastMessageText = props.chatroom.messages[lastPos].messageText;
    const lastTime = props.chatroom.messages[lastPos].messageTimestamp;
    const namesMonths = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let year = lastTime.getFullYear();
    let month = lastTime.getMonth();
    let day = lastTime.getDate();
    let hours = lastTime.getHours();
    let minutes = lastTime.getMinutes();
    let yearNow = new Date().getFullYear();
    let monthNow = new Date().getMonth();
    let dayNow = new Date().getDate();

    //Chec if message time is the same as today
    if (year === yearNow && month === monthNow && day === dayNow) {
      displayTime = hours + ":" + minutes;
    } else {
      displayTime = `${day} ${namesMonths[month]}`;
    }
  }

  return (
    <>
    <TouchableOpacity
      style={styles.chatThread}
      //Navigate to the clicked chatroom
      onPress={() => {
        navigation.navigate("ChatRoom", { id: props.chatroom.chatRoomId });
        props.setChatRoomTitle(props.chatroom.chatRoomName);
      }}>
      <View style={styles.flexRow}>
        <Image
          style={styles.profileImage}
          source={props.chatroom.imageUrl === undefined ? golf : props.chatroom.imageUrl}
          />
        <View style={styles.chatPreview}>
          <View style={styles.flexRowSpaceBetween}>
            <Text style={styles.text}>{props.chatroom.chatRoomName}</Text>
            <View style={props.chatroom.read ? "" : styles.circle}></View>
          </View>
          <View style={styles.flexRowSpaceBetween}>
            <Text
              style={[props.chatroom.read ? styles.paragraph : styles.text, styles.message]}
              ellipsizeMode="tail"
              numberOfLines={1}>
              {lastMessageText ? lastMessageText : "Go write the first message!"}
            </Text>
            <Text style={[props.chatroom.read ? styles.paragraph : styles.text, styles.time]}>{displayTime}</Text>
          </View>
        </View>
      </View>
      </TouchableOpacity>
      </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: "800",
    fontFamily: "OpenSans_700Bold",
    lineHeight: 25,
  },
  chatThread: {
    height: 85,
    justifyContent: "center",
    padding: 16,
  },
  chatPreview: {
    paddingLeft: 16,
    flex: 1,
  },
  container: {
    flexDirection: "column",
    flex: 10,
    justifyContent: "flex-start",
    alignItems: "stretch",
    height: 300,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  flexRowSpaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    alignContent: "stretch",
  },
  circle: {
    backgroundColor: "blue",
    width: 10,
    height: 10,
    borderRadius: 100,
    alignSelf: "center",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },

  spacious: {
    flex: 10,
  },
  message: {
    flex: 20,
  },
  time: {
    flex: 5,
    textAlign: "right",
  },
});
export default ChatRoomPreview;
