import React, { useState, useEffect } from "react";
import { View, StyleSheet, useCallback } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import Fire from "./Fire";

const ChatList = () => {

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
        _id: 2,
        name: "React Native",
        avatar: "https://lafeber.com/pet-birds/wp-content/uploads/2018/06/Parakeet-300x300.jpg",
      }}
    />
  );
};

const styles = StyleSheet.create({});
export default ChatList;
