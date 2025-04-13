import {
  FlatList,
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import Checkbox from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
type ToDoType = {
  id: number;
  title: string;
  isDone: boolean;
};
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
      isDone: true,
    },
    {
      id: 5,
      title: "todo",
      isDone: true,
    },
    {
      id: 6,
      title: "todo",
      isDone: true,
    },
    {
      id: 7,
      title: "todo",
      isDone: true,
    },
  ];

  const [todos, setToDos] = useState<ToDoType[]>([]);
  const [todoText, setTodoText] = useState<string>("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getTodo = async () => {
      try {
        const todos = await AsyncStorage.getItem("my-todo");
        if (todos != null) {
          setToDos(JSON.parse(todos));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTodo();
  }),
    [];
  const addTodo = async () => {
    try {
      const newTodo = {
        id: Math.random(),
        title: todoText,
        isDone: false,
      };

      todos.push(newTodo);
      setToDos(todos);
      await AsyncStorage.setItem("my-todo", JSON.stringify(todos));
      setTodoText("");
      Keyboard.dismiss();
    } catch (error) {
      console.log(error);
    }
  };
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
        data={[...todos].reverse()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ToDoItem todo={item} />}
      />

      <KeyboardAvoidingView
        style={styles.footer}
        behavior="padding"
        keyboardVerticalOffset={10}
      >
        <TextInput
          placeholder="Add Todo"
          style={styles.newToDoInput}
          value={todoText}
          onChangeText={(text) => setTodoText(text)}
          autoCorrect={false}
        />
        <TouchableOpacity style={styles.addButton} onPress={() => addTodo()}>
          <Ionicons name="add" size={34} color={"#fff"} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const ToDoItem = ({ todo }: { todo: ToDoType }) => (
  <View style={styles.todoContainer}>
    <View style={styles.todoInfoContainer}>
      <Checkbox value={todo.isDone} color={todo.isDone ? "blue" : undefined} />
      <Text
        style={
          (styles.todoText,
          todo.isDone && { textDecorationLine: "line-through" })
        }
      >
        {todo.title}
      </Text>
    </View>

    <TouchableOpacity onPress={() => alert("Deleted " + todo.id)}>
      <Ionicons name="trash" size={24} />
    </TouchableOpacity>
  </View>
);

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
  todoContainer: {
    flexDirection: "row",
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "space-between",
  },
  todoInfoContainer: {
    flexDirection: "row",
    gap: 10,
  },
  todoText: {
    fontSize: 16,
    color: "#333",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  newToDoInput: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    fontSize: 16,
    color: "#333",
  },
  addButton: {
    backgroundColor: "blue",
    padding: 8,
    borderRadius: 10,
    marginLeft: 20,
  },
});
