//INSTALLED PACKAGES
import React, { useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";

//APP COMPONENTS
import MainScreenStyling from "../../styling/MainScreenStyling";
import ChatRoomPreview from "./ChatRoomPreview";
import AddChatRoom from "./AddChatRoom";
import { getChatRooms } from "./chatStore/ChatAction";

//Each screen component in the app is provided with the navigation prop automatically.
const ChatRoomList = props => {
  const dispatch = useDispatch();

  //get redux state
  const chatRooms = useSelector(state => state.chat.chatRooms);

  //Call getChatRooms only on first render (Redux action)
  useEffect(
    function GetChatRooms(){
    dispatch(getChatRooms());
  }, []);

  return (
    <>
      <View style={[MainScreenStyling.center, styles.container]}>
        <FlatList
          //Get data frm redux store
          data={chatRooms}
          //For each item render a ChatRoomPreview component
          renderItem={itemData => (
            <ChatRoomPreview chatroom={itemData.item} setChatRoomTitle={props.setChatRoomTitle}></ChatRoomPreview>
          )}
          //All items needs a unique key to be identified
          keyExtractor={item => item.chatRoomId}
        />
        <AddChatRoom />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 10,
    justifyContent: "flex-start",
    alignItems: "stretch",
    height: 300,
  },
});

export default ChatRoomList;
