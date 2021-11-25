import User from "./User";
class Message {
  constructor(
    public messageId: string,
    public messageText: string,
    public messageTimestamp: string,
    public user: User[]
  ) {
    this.messageId = messageId;
    this.messageText = messageText;
    this.messageTimestamp = messageTimestamp;
    this.user = user;
  }
}

export default Message;
