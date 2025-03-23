import {
  FlatList,
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";

export default function Index() {
  const todoData = [
    {
      id: 1,
      title: "todo",
      isDone: false,
    },
    {
      id: 2,
      title: "todo",
      isDone: false,
    },
    {
      id: 3,
      title: "todo",
      isDone: false,
    },
    {
      id: 4,
      title: "todo",
      isDone: false,
    },
  ];

  const [search, setSearch] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="menu" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="person-circle" size={36} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="black" />
        <TextInput
          placeholder="Search"
          placeholderTextColor={"black"}
          style={styles.searchTextInput}
          onChangeText={(e) => setSearch(e)}
          clearButtonMode="always"
        />
      </View>
      <FlatList
        data={todoData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchContainer: {
    marginBottom: 10,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    padding: 16,
    flexDirection: "row",
    gap: 10,
  },
  searchTextInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
});
