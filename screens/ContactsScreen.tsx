import * as React from "react";
import { StyleSheet, FlatList, Text, View } from "react-native";
import Users from "../data/Users";
import { NewMessageButton } from "../components/NewMessageButton/index";
import { ContactListItem } from "../components/ContactListItem";

export default function ContactsScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ width: "100%" }}
        data={Users}
        renderItem={({ item }) => <ContactListItem user={item} />}
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
