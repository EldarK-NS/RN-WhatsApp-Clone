import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { User } from "../../types";
import { useNavigation } from "@react-navigation/native";

export type ContactListItemProps = {
  user: User;
};

export const ContactListItem = (props: ContactListItemProps) => {
  const { user } = props;
  const navigation = useNavigation();

  const onClick = () => {
    // navigate to chat room with this user
  };

  return (
    <TouchableWithoutFeedback onPress={onClick}>
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
              {user.status}
            </Text>
          </View>
        </View>
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
});
