import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { MonthlyCheck } from "../components/MonthlyCheck";
import { MonthlyCheckData } from "../data/MonthlyCheckData";

const STORAGE_KEY = "monthlyChecks";

const MonthlyChecksScreen = () => {
  const [monthlyChecks, setMonthlyChecks] = useState<MonthlyCheck[]>([]);
  const [monthlyCheck, setMonthlyCheck] = useState<MonthlyCheck>({
    id: "",
    item: "",
    type: "Need",
  });

  const loadMonthlyChecks = async () => {
    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedData) {
        setMonthlyChecks(JSON.parse(storedData));
      } else {
        setMonthlyChecks(MonthlyCheckData);
      }
    } catch (error) {
      console.error("Failed to load monthly checks", error);
    }
  };

  const saveMonthlyChecks = async (data: MonthlyCheck[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Failed to save monthly checks", error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      loadMonthlyChecks();
    }, [])
  );

  const addMonthlyCheck = () => {
    if (monthlyCheck.item.trim() !== "") {
      const newMonthlyChecks = [
        ...monthlyChecks,
        { ...monthlyCheck, id: (monthlyChecks.length + 1).toString() },
      ];
      setMonthlyChecks(newMonthlyChecks);
      saveMonthlyChecks(newMonthlyChecks);
      setMonthlyCheck({ id: "", item: "", type: "Need" });
    }
  };

  const deleteMonthlyCheck = (index: number) => {
    Alert.alert(
      "Delete Monthly Check",
      "Are you sure you want to delete this monthly check?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Delete cancelled"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            const updatedData = [...monthlyChecks];
            updatedData.splice(index, 1);
            setMonthlyChecks(updatedData);
            saveMonthlyChecks(updatedData);
          },
          style: "destructive",
        },
      ]
    );
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Monthly Checks</Text>

      <TextInput
        style={styles.input}
        placeholder="Item"
        value={monthlyCheck.item}
        onChangeText={(text) => setMonthlyCheck({ ...monthlyCheck, item: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Type (Need or Want)"
        value={monthlyCheck.type}
        onChangeText={(text) => setMonthlyCheck({ ...monthlyCheck, type: text as "Need" | "Want" })}
      />

      <Button mode="contained" onPress={addMonthlyCheck}>
        Add Monthly Check
      </Button>

      <ScrollView style={styles.list}>
        {monthlyChecks.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text>
              {item.item} - {item.type}
            </Text>
            <Button mode="text" onPress={() => deleteMonthlyCheck(index)}>
              Delete
            </Button>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 8,
    borderRadius: 4,
  },
  list: {
    marginTop: 16,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
  },
});

export default MonthlyChecksScreen;
