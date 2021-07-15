import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { ChatMessage } from "../components/ChatMessage";
// import chatRoomData from "../data/Chats";
import BG from "../assets/images/BG.png";
import { InputBox } from "./../components/InputBox/index";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { messagesByChatRoom } from "../src/graphql/queries";

type ChatRoomScreenProps = {};

export const ChatRoomScreen = () => {
  const route = useRoute();
 
  const [messages, setMessages] = useState([]);
  const [myId, setMyId] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const messagesData = await API.graphql(
        graphqlOperation(messagesByChatRoom, {
          chatRoomID: route.params.id,
          sortDirection: "DESC",
        })
      );
      setMessages(messagesData.data.messagesByChatRoom.items);
    };
    fetchMessages();
  }, []);

  useEffect(() => {
    const getMyId = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      setMyId(userInfo.attributes.sub);
    };
    getMyId();
  }, []);

  return (
    <ImageBackground style={{ width: "100%", height: "100%" }} source={BG}>
      <FlatList
        data={messages}
        renderItem={({ item }) => <ChatMessage message={item} myId={myId} />}
        keyExtractor={(item) => item.id}
        inverted
      />
      <InputBox chatRoomID={route.params.id} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({});
