//INSTALLED PACKAGES
import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//APP COMPONENTS
import ChatRoomsList from "../CHAT/ChatRoomsList";
import ChatRoom from "../CHAT/ChatRoom";

const Stack = createNativeStackNavigator();

const ChatScreen = props => {
  //State variable
  const [chatRoomTitle, setChatRoomTitle] = useState("");

  return (
    /* Stack navigation */
    <Stack.Navigator
      setChatRoomTitle={setChatRoomTitle}
      chatRoomTitle={chatRoomTitle}
      screenOptions={{
        headerStyle: {
          backgroundColor: "#ffffff",
        },
        headerTintColor: "#5050A5",
        headerTitleStyle: {
          fontWeight: "bold",
          fontFamily: "Teko_500Medium",
          fontSize: 26,
        },
        headerBackTitleVisible: false,
        headerBackTitleStyle: {
          fontSize: 0,
        },
        headerShadowVisible: true,
      }}>
      {/* Components in navigator, top component is default */}
      <Stack.Screen name="CHAT">
        {/*  Pass props through stack navigator to component */}
        {props => <ChatRoomsList {...props} setChatRoomTitle={setChatRoomTitle} />}
      </Stack.Screen>
      <Stack.Screen name="ChatRoom" component={ChatRoom} options={{ title: chatRoomTitle.toUpperCase() }} />
    </Stack.Navigator>
  );
};

export default ChatScreen;
