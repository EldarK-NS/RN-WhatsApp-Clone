import * as React from "react";
import { StyleSheet, FlatList, Text, View } from "react-native";
import ChatRooms from "../data/ChatRooms";
import { ChatListItem } from "../components/ChatListItem";
// import {  } from "../components/Themed";

export default function ChatsScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ width: "100%" }}
        data={ChatRooms}
        renderItem={({ item }) => <ChatListItem chatRoom={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
