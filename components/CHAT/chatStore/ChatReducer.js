import { DELETE_CHATROOM, NEW_CHATMESSAGE, NEW_CHATROOM, GET_CHATROOMS } from "./ChatAction";

//set initial states as undefined
const initialState = {
  chatRooms: undefined,
};

const ChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHATROOMS:
      return {
        //copy state to prevent mutation
        ...state,
        //set the chatRooms to the payload

        chatRooms: action.payload,
      };

    case NEW_CHATROOM:
      return {
        //copy state to prevent mutation
        ...state,
        chatRooms: [
          //copy state to prevent mutation
          ...state.chatRooms,
          //set the chatRooms to the object
          action.payload,
        ],
      };

    case DELETE_CHATROOM:
      return {
        //copy state to prevent mutation
        ...state,
        //Set chatRooms to the old chatRooms without the one in the payload
        chatRooms: state.chatRooms.filter(room => room.chatRoomName !== action.payload),
      };

    case NEW_CHATMESSAGE:
      //Find the room that matches the payload
      const chatroom = state.chatRooms.find(room => room.chatRoomId === action.payload.chatRoomId);
      //Copy chatRoom messages, and set to payload, save as variable
      const chatmessages = [...chatroom.messages, action.payload.messageObj];

      //Copy chatroom object and attach new chat array that you copied.
      const newChatRoom = { ...chatroom };
      newChatRoom.messages = chatmessages;

      // find the chatRoom that matches the payload
      const index = state.chatRooms.findIndex(room => room.chatRoomId === action.payload.chatRoomId);
      //Copy chatRoom, save as variable
      const chatroomArray = [...state.chatRooms];
      //Replace the old chat room with the new
      chatroomArray.splice(index, 1, newChatRoom);
      return { ...state, chatRooms: chatroomArray };
    
    default:
      return state;
  }
};

export default ChatReducer;
