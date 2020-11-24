import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";

import Chat from "./Chat";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.navigation.navigate("Chat", { name: this.state.name });
  }

  render() {
    return (
      <View>
        <Chat />
        <TextInput
          style={styles.nameInput}
          placeHolder="Varun Jindal"
          value={this.state.name}
          onChangeText={(text) => {
            this.setState({ name: text });
          }}
        />
        <TouchableOpacity onPress={this.onPress}>
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const offset = 24;
const styles = StyleSheet.create({
  nameInput: {
    height: offset * 2,
    margin: offset,
    paddingHorizontal: offset,
    borderColor: "#111111",
    borderWidth: 1,
  },
});
export default Main;
