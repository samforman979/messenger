import React, { useState, useEffect } from "react";
import { View, StyleSheet, useCallback } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import Fire from "./Fire";

const Chat = () => {
  Chat.navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || "Chat!",
  });

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    Fire.shared.on((message) =>
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, message)
      )
    );

    return () => {
      Fire.shared.off();
    };
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={Fire.shared.send}
      user={{
        _id: 1,
      }}
    />
  );
};

const styles = StyleSheet.create({});
export default Chat;
