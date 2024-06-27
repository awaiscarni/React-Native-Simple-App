import React, { useState } from "react";
import { Alert } from "react-native";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Switch,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [selectedYear, setSelectedYear] = useState("2024");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [itemList, setItemList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const addItem = () => {
    // Trim the title to remove leading and trailing spaces
    const trimmedTitle = title.trim();

    // Check if price input starts with 0
    if (price && price.charAt(0) !== "0") {
      if (trimmedTitle && price) {
        if (editingIndex !== null) {
          // If editing, update the existing item
          const updatedList = [...itemList];
          updatedList[editingIndex] = {
            title: trimmedTitle,
            price,
            date: new Date(),
            month: selectedMonth,
            year: selectedYear,
          };
          setItemList(updatedList);
          setEditingIndex(null); // Reset editing index after update
        } else {
          // Check if the title already exists in the list
          const exists = itemList.some((item) => item.title === trimmedTitle);
          if (exists) {
            alert("Item already exists in the list.");
          } else {
            // If adding new item and it doesn't exist in the list, create a new one
            const newItem = {
              title: trimmedTitle,
              price,
              date: new Date(),
              month: selectedMonth,
              year: selectedYear,
            };
            setItemList([...itemList, newItem]);
          }
        }
        setTitle("");
        setPrice("");
      } else {
        alert("Enter a Valid Item name!");
      }
    } else {
      // Display an alert or handle the case where price starts with 0
      alert("Price cannot start with 0.");
    }
  };

  const cancelEdit = () => {
    setTitle("");
    setPrice("");
    setEditingIndex(null);
  };

  const toggleSwitch = () => {
    setIsDark((previousState) => !previousState);
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = ["2022", "2023", "2024", "2025", "2026", "2027", "2028"];

  const toggleMonthDropdown = () => {
    setShowMonthDropdown(!showMonthDropdown);
  };

  const toggleYearDropdown = () => {
    setShowYearDropdown(!showYearDropdown);
  };

  const selectMonth = (month) => {
    setSelectedMonth(month);
    setShowMonthDropdown(false);
  };

  const selectYear = (year) => {
    setSelectedYear(year);
    setShowYearDropdown(false);
  };

  const editItem = (index) => {
    const item = itemList[index];
    setTitle(item.title);
    setPrice(item.price);
    setEditingIndex(index);
    // Set the selected month and year to the states
    setSelectedMonth(item.month);
    setSelectedYear(item.year);
  };

  const updateItem = () => {
    // Trim the title to remove leading and trailing spaces
    const trimmedTitle = title.trim();

    // Check if price input starts with 0
    if (price && price.charAt(0) !== "0") {
      if (trimmedTitle && price) {
        // Check if the edited title already exists in the list
        const exists = itemList.some(
          (item, index) => index !== editingIndex && item.title === trimmedTitle
        );
        if (exists) {
          alert("Item already exists in the list.");
        } else {
          // If the title doesn't exist or is edited to the same title, update the item
          const updatedList = [...itemList];
          updatedList[editingIndex] = {
            title: trimmedTitle,
            price,
            date: new Date(),
            month: selectedMonth,
            year: selectedYear,
          };
          setItemList(updatedList);
          setEditingIndex(null); // Reset editing index after update
          setTitle("");
          setPrice("");
        }
      } else {
        alert("Enter a Valid Item name!");
      }
    } else {
      // Display an alert or handle the case where price starts with 0
      alert("Price cannot start with 0.");
    }
  };

  const deleteItem = (index) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this item?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            const updatedList = [...itemList];
            updatedList.splice(index, 1);
            setItemList(updatedList);
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.darkBackground]}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Text style={[styles.h1, isDark && styles.darkText]}>Expenses Log</Text>
      <View style={{ flexDirection: "row" }}>
        <Text
          style={[
            { fontSize: 20, paddingRight: 10 },
            isDark && styles.darkText,
          ]}
        >
          Dark Mode
        </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isDark ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isDark}
        />
      </View>
      <View style={styles.dropdownContainer}>
        <TouchableOpacity
          onPress={toggleMonthDropdown}
          style={[styles.dropdown, isDark && styles.darkDropdown]}
        >
          <Text style={[styles.dropdownText, isDark && styles.darkText]}>
            {selectedMonth}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={toggleYearDropdown}
          style={[styles.dropdown, isDark && styles.darkDropdown]}
        >
          <Text style={[styles.dropdownText, isDark && styles.darkText]}>
            {selectedYear}
          </Text>
        </TouchableOpacity>
      </View>
      <Modal visible={showMonthDropdown} animationType="slide">
        <View style={[styles.modal, isDark && styles.darkModal]}>
          {months.map((month, index) => (
            <TouchableOpacity
              key={index}
              style={styles.modalItem}
              onPress={() => selectMonth(month)}
            >
              <Text style={styles.modalItemText}>{month}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
      <Modal visible={showYearDropdown} animationType="slide">
        <View style={[styles.modal, isDark && styles.darkModal]}>
          {years.map((year, index) => (
            <TouchableOpacity
              key={index}
              style={styles.modalItem}
              onPress={() => selectYear(year)}
            >
              <Text style={styles.modalItemText}>{year}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
      <View style={{ flexDirection: "row", width: "100%" }}>
        <TextInput
          style={[
            styles.input,
            isDark && {
              borderColor: "#D8D9DA",
              color: "#D8D9DA",
            },
          ]}
          onChangeText={(t) => setTitle(t)}
          value={title}
          placeholder="Title"
          placeholderTextColor="#5C8374"
        />
        <TextInput
          style={[
            styles.input,
            { width: 85 },
            isDark && { borderColor: "#D8D9DA", color: "#D8D9DA" },
          ]}
          onChangeText={(p) => setPrice(p)}
          value={price}
          placeholder="00"
          placeholderTextColor="#5C8374"
          keyboardType="numeric"
        />
      </View>
      {editingIndex !== null ? (
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Button onPress={cancelEdit} title="Cancel" color="#FF6347" />
          <Button onPress={updateItem} title="Update" color="#4169E1" />
        </View>
      ) : (
        <Button
          onPress={addItem}
          title="ADD EXPENSE"
          color="#8062D6"
          disabled={!title || !price}
        />
      )}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={[
            { flex: 1, textAlign: "left", fontWeight: "bold" },
            isDark && styles.darkText,
          ]}
        >
          Total Expenditures:
        </Text>
        <Text
          style={[
            { flex: 1, textAlign: "right", fontWeight: "bold" },
            isDark && styles.darkText,
          ]}
        >
          ${itemList.reduce((total, item) => total + parseInt(item.price), 0)}
        </Text>
      </View>

      <View
        style={[styles.line, isDark && { backgroundColor: "#272829" }]}
      ></View>
      <ScrollView
        style={[
          {
            flex: 1,
            width: "90%",
            borderRadius: 10,
            backgroundColor: "#D8D9DA",
            marginTop: 3,
          },
          isDark && styles.darkColor,
        ]}
      >
        {itemList.length === 0 && (
          <Text
            style={[
              {
                fontWeight: "bold",
                fontSize: 15,
                alignSelf: "center",
                marginTop: 10,
              },
              isDark && styles.darkText,
            ]}
          >
            No Item in the List
          </Text>
        )}
        {itemList.map((item, index) => (
          <View key={index}>
            <View style={styles.item}>
              <Text style={[styles.itemTitle, isDark && styles.darkText]}>
                {index + 1}: {item.title}
              </Text>
              <View style={styles.smolline1}></View>
              <Text style={[styles.itemPrice, isDark && styles.darkText]}>
                ${item.price}
              </Text>
              <View style={styles.smolline}></View>

              <TouchableOpacity onPress={() => editItem(index)}>
                <Feather name="edit" size={24} color="blue" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteItem(index)}>
                <Feather name="trash" size={24} color="red" />
              </TouchableOpacity>
            </View>
            <Text style={[styles.itemDateTime, isDark && styles.darkText]}>
              {item.month} {item.date.getDate()}, {item.year}-
              {item.date.toLocaleTimeString()}
            </Text>
            <View style={styles.underline}></View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  darkBackground: {
    backgroundColor: "#000",
  },
  h1: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#000", // Default text color
    marginTop: 20,
  },
  darkText: {
    color: "#fff", // Text color for dark mode
  },
  dropdownContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: "#000", // Default text color
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
  },
  input: {
    height: 40,
    width: 230,
    margin: 12,
    borderBottomWidth: 1,
    padding: 10,
    color: "#272829",
    borderColor: "#272829",
  },
  line: {
    height: 2, // Height of the line
    backgroundColor: "#D8D9DA", // Color of the line
    width: "90%", // Width of the line, adjust as needed
    marginTop: 10,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 10,
    alignItems: "center",
  },
  itemTitle: {
    flex: 1,
    textAlign: "left",
  },
  itemPrice: {
    flex: 1,
    textAlign: "right",
    marginRight: 10,
  },
  itemDateTime: {
    //flex: 1,
    marginRight: 15,
    textAlign: "right",
    //color: "#808080",
    fontSize: 12,
  },
  smolline: {
    marginRight: 10,
    height: 15,
    width: 1,
    backgroundColor: "#808080",
  },
  smolline1: {
    marginLeft: 40,
    height: 15,
    width: 1,
    backgroundColor: "#808080",
  },
  darkColor: {
    backgroundColor: "#272829",
  },
  underline: {
    height: 1,
    width: "100%",
    backgroundColor: "#808080",
  },
});
