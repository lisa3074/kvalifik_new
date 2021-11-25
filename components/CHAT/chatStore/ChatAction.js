import Message from "../../../classModels/Message";
import ChatRoom from "../../../classModels/ChatRoom";

//export cases for the reducer
export const NEW_CHATROOM = "NEW_CHATROOM";
export const DELETE_CHATROOM = "DELETE_CHATROOM";
export const NEW_CHATMESSAGE = "NEW_CHATMESSAGE";
export const GET_CHATROOMS = "GET_CHATROOMS";

//variables
const endpointChatRooms = "https://kvalifik-bf2c3-default-rtdb.europe-west1.firebasedatabase.app/chatrooms.json?auth=";
const endpointMessages = "https://kvalifik-bf2c3-default-rtdb.europe-west1.firebasedatabase.app/chatrooms/";

//create new chatroom
export const newChatRoom = chatroomName => {
    //use redux thunk to make asyncrounous calls
  return async (dispatch, getState) => {
     //get token to authenticate the request
    const token = getState().user.token;
    const response = await fetch(`${endpointChatRooms}${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatroomName: chatroomName,
        messages: [],
        image: undefined,
        read: false,
      }),
    });

    const data = await response.json(); // json to javascript
    if (!response.ok) {
      //There was a problem..
      console.error("ERROR in response, ", response);
    } else {
      //create new object //data.name === id
      const newChatRoom = new ChatRoom(data.name, data.image, chatroomName, [], data.read);
        //Make sure a dispacth is called, otherwise function won't work => send to reducer
      dispatch({ type: NEW_CHATROOM, payload: newChatRoom });
    }
  };
};

//Get all chat rooms
export const getChatRooms = () => {
  //use redux thunk to make asyncrounous calls
  return async (dispatch, getState) => {
    //get token to authenticate the request
    const token = getState().user.token;
    const response = await fetch(`${endpointChatRooms}${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json(); // json to javascript

    if (!response.ok) {
      //There was a problem..
      console.error("ERROR in response, ", response);
    } else {
      const chatArray = [];
      //For each chat room
      for (const key in data) {
        let messages = [];
        //for each message in taht chatroom
        for (const key2 in data[key].messages) {
          const msg = data[key].messages[key2];
          //Push message object to message array
          messages.push(new Message(key2, msg.messageText, new Date(msg.messageTimestamp), msg.user));
        }
        //Create chat room object
        const oldChatRooms = new ChatRoom(
          key,
          data[key].imageURL,
          data[key].chatroomName,
          data[key].messages ? messages : [],
          data[key].read
        );
        //Push chat room object into chat array
        chatArray.push(oldChatRooms);
      }
      //Make sure a dispacth is called, otherwise function won't w => send to reducer
      dispatch({ type: GET_CHATROOMS, payload: chatArray });
    }
  };
};

export const deleteChatRoom = chatroomName => {
  //Send to reducer
  return { type: DELETE_CHATROOM, payload: chatroomName };
};

export const newChatMessage = (chatRoomId, message, loggedInUser) => {
  //use redux thunk to make asyncrounous calls
  return async (dispatch, getState) => {
    //get token to authenticate the request
    const token = getState().user.token;
    const response = await fetch(`${endpointMessages}${chatRoomId}/messages.json?auth=${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messageText: message,
        messageTimestamp: new Date(),
        user: loggedInUser,
      }),
    });

    const data = await response.json(); // json to javascript
    if (!response.ok) {
      //There was a problem..
      console.error("ERROR in response " , response);
    } else {
      //Create message object
      const messageObj = new Message(data.name, message, new Date(), loggedInUser);
      //Make sure a dispacth is called, otherwise function won't work => send to reducer
      dispatch({ type: NEW_CHATMESSAGE, payload: { chatRoomId, messageObj } });
    }
  };
};
