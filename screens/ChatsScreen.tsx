import * as React from "react";
import { StyleSheet, FlatList, Text, View } from "react-native";
import ChatRooms from "../data/ChatRooms";
import { ChatListItem } from "../components/ChatListItem";
import { NewMessageButton } from "./../components/NewMessageButton/index";

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
      <NewMessageButton />
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
