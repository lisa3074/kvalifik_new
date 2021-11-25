//INSTALLED PACKAGES
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Button } from "react-native";
import { useSelector } from "react-redux";

//APP COMPONENTS
import surf from "../../static/images/surf.png";

const ChatMessage = props => {
  //Descructure props
  const { chatmessage } = props;

  const [me, setMe] = useState(false);

  //Get redux state
  const loggedInUser = useSelector(state => state.user.loggedInUser);

  //Set state if chatmessage changes
  useEffect(
    function isMe() {
      if (loggedInUser.id === chatmessage.user.id) {
        setMe(true);
      }
    },
    [chatmessage]
  );

  //variables that does not change
  const time = chatmessage.messageTimestamp;
  const hours = time.getHours();
  const minutes = time.getMinutes();

  return (
    <View style={styles.chatContainer}>
      <ScrollView style={styles.scroll}>
        <View style={me ? styles.meMessageStyle : styles.youMessageStyle} key={chatmessage.messageId}>
          <Image style={[me ? styles.hide : "", styles.profileImage, styles.messageImage]} source={surf} />
          <View>
            <View style={[styles.messageBg, me ? styles.meBgColor : styles.youBgColor]}>
              <Text style={[me ? styles.meBgColor : styles.youBgColor]}>{chatmessage.messageText}</Text>
            </View>
            <Text style={[styles.from, me ? styles.meAlignName : ""]}>
              {/* Only show if not me */}
              {!me ? (
                <Text>
                  From {chatmessage.user.firstname} {chatmessage.user.lastname}
                  {"・"}
                </Text>
              ) : (
                ""
              )}
              <Text>
                {/* add a 0 to numbers below 10 */}
                {hours <= 9 ? "0" + hours : hours}:{minutes <= 9 ? 0 + minutes : minutes}
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 16,
    shadowColor: "#ccc",
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10.22,
    elevation: 3,
  },
  flex: {
    flexDirection: "row",
  },
  hide: {
    display: "none",
  },

  button: {
    flex: 1,
    marginLeft: 8,
  },
  chatContainer: {
    paddingTop: 16,
    flexDirection: "column",
    flex: 1,
    backgroundColor: "white",
  },
  inputContainer: {
    paddingLeft: 16,
    flex: 1,
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 100,
    marginRight: 8,
  },
  messageImage: {
    marginRight: 8,
  },

  textarea: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: "#EEEEEE",
    borderRadius: 5,
    height: 44,
    flex: 3,
  },
  messageBg: {
    padding: 8,
    borderRadius: 12,
  },
  from: {
    color: "#707070",
    fontSize: 12,
    padding: 5,
  },

  scroll: {
    overflow: "scroll",
  },

  meMessageStyle: {
    alignItems: "flex-end",
    marginLeft: 46,
  },
  meBgColor: {
    backgroundColor: "#5050A5",
    borderBottomRightRadius: 2,
    color: "#ffffff",
  },
  meAlignName: {
    textAlign: "right",
  },
  youMessageStyle: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
    marginRight: 42,
  },
  youBgColor: {
    backgroundColor: "#EEEEEE",
    borderBottomLeftRadius: 2,
    color: "#333333",
  },
});

export default ChatMessage;
