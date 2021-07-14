import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { ChatRoom } from "../../types";
import moment from "moment";

export type ChatListItemProps = {
  chatRoom: ChatRoom;
};

export const ChatListItem = (props: ChatListItemProps) => {
  const { chatRoom } = props;
  const user = chatRoom.users[1];
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Image source={{ uri: user.imageUri }} style={styles.avatar} />
        <View style={styles.midContainer}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text
            numberOfLines={1}
            ellipsizeMode={"tail"}
            style={styles.lastMessage}
          >
            {chatRoom.lastMessage.content}
          </Text>
        </View>
      </View>
      <Text style={styles.date}>
        {moment(chatRoom.lastMessage.createdAt).format("DD.MM.YY")}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    marginRight: 15,
    borderRadius: 25,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    width: "100%",
  },
  leftContainer: {
    flexDirection: "row",
  },
  midContainer: {
    justifyContent: "space-around",
  },
  userName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  lastMessage: {
    fontSize: 16,
    color: "grey",
  },
  date: {
    fontSize: 14,
    color: "grey",
  },
});
