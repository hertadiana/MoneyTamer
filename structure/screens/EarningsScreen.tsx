import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { Earning } from "../components/Earning"; // Adjust path as needed
import { EarningsData } from "../data/EarningsData"; // Adjust path as needed

const STORAGE_KEY = "earnings";

const EarningsScreen = () => {
  const [earnings, setEarnings] = useState<Earning[]>([]);
  const [earning, setEarning] = useState<Earning>({
    id: "",
    type: "",
    sum: 0,
    date: "",
    mentions: "",
  });

  // Load earnings from storage or use initial hardcoded data
  const loadEarnings = async () => {
    try {
      const storedEarnings = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedEarnings) {
        setEarnings(JSON.parse(storedEarnings));
      } else {
        setEarnings(EarningsData);
      }
    } catch (error) {
      console.error("Failed to load earnings", error);
    }
  };

  // Save earnings to storage
  const saveEarnings = async (updatedEarnings: Earning[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEarnings));
    } catch (error) {
      console.error("Failed to save earnings", error);
    }
  };

  // Reload earnings whenever the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      loadEarnings();
    }, [])
  );

  const addEarning = () => {
    if (earning.type.trim() !== "" && earning.sum > 0) {
      const newEarnings = [...earnings, { ...earning, id: (earnings.length + 1).toString() }];
      setEarnings(newEarnings);
      saveEarnings(newEarnings);
      setEarning({ id: "", type: "", sum: 0, date: "", mentions: "" });
    }
  };

  const deleteEarning = (index: number) => {
    const newEarnings = [...earnings];
    newEarnings.splice(index, 1);
    setEarnings(newEarnings);
    saveEarnings(newEarnings);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Earnings</Text>

      <TextInput
        style={styles.input}
        placeholder="Type (e.g., Job, Allowance)"
        value={earning.type}
        onChangeText={(text) => setEarning({ ...earning, type: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Sum"
        keyboardType="numeric"
        value={earning.sum.toString()}
        onChangeText={(text) => setEarning({ ...earning, sum: parseFloat(text) || 0 })}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (e.g., 2024-01-01)"
        value={earning.date}
        onChangeText={(text) => setEarning({ ...earning, date: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Mentions"
        value={earning.mentions}
        onChangeText={(text) => setEarning({ ...earning, mentions: text })}
      />

      <Button mode="contained" onPress={addEarning}>
        Add Earning
      </Button>

      <ScrollView style={styles.list}>
        {earnings.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text>
              {item.type} - ${item.sum} - {item.date} - {item.mentions}
            </Text>
            <Button mode="text" onPress={() => deleteEarning(index)}>
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

export default EarningsScreen;
