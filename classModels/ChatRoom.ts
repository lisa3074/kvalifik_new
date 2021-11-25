import Message from "./Message";

class ChatRoom {
  constructor(
    public chatRoomId: string,
    public imageUrl: string,
    public chatRoomName: string,
    public messages: Message[],
    public read: boolean
  ) {
    this.chatRoomId = chatRoomId;
    this.imageUrl = imageUrl;
    this.chatRoomName = chatRoomName;
    this.messages = messages;
    this.read = read;
  }
}

export default ChatRoom;
