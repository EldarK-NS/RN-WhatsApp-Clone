import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { ChatRoom } from "../../types";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { Auth } from "aws-amplify";

export type ChatListItemProps = {
  chatRoom: ChatRoom;
};

export const ChatListItem = (props: ChatListItemProps) => {
  const [otherUser, setOtherUser] = useState(null);
  const { chatRoom } = props;
  const navigation = useNavigation();

  useEffect(() => {
    const getOtherUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      if (chatRoom.chatRoomUsers.items[0].user.id === userInfo.attributes.sub) {
        setOtherUser(chatRoom.chatRoomUsers.items[1].user);
      } else {
        setOtherUser(chatRoom.chatRoomUsers.items[0].user);
      }
   };
   getOtherUser();
  }, []);

  const onClick = () => {
    navigation.navigate("ChatRoom", {
      id: chatRoom.id,
      name: otherUser.name,
    });
  };
  if (!otherUser) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image source={{ uri: otherUser.imageUri }} style={styles.avatar} />
          <View style={styles.midContainer}>
            <Text style={styles.userName}>{otherUser.name}</Text>
            <Text
              numberOfLines={1}
              ellipsizeMode={"tail"}
              style={styles.lastMessage}
            >
              {chatRoom.lastMessage ? chatRoom.lastMessage.content : ""}
            </Text>
          </View>
        </View>
        <Text style={styles.date}>
          {chatRoom.lastMessage &&
            moment(chatRoom.lastMessage.createdAt).format("DD.MM.YY")}
        </Text>
      </View>
    </TouchableWithoutFeedback>
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
