import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { Earning } from "../components/Earning";
import { EarningsData } from "../data/EarningsData";
import AddEarningForm from "./add_forms/AddEarningForm";
import UpdateEarningForm from "./edit_forms/UpdateEarningForm";
const STORAGE_KEY = "earnings";

const EarningsScreen = () => {
  const [earnings, setEarnings] = useState<Earning[]>([]);
  const [editingEarning, setEditingEarning] = useState<Earning | null>(null);

  const loadEarnings = async () => {
    try {
      const storedEarnings = await AsyncStorage.getItem(STORAGE_KEY);
      setEarnings(storedEarnings ? JSON.parse(storedEarnings) : EarningsData);
    } catch (error) {
      console.error("Failed to load earnings", error);
    }
  };

  const saveEarnings = async (updatedEarnings: Earning[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEarnings));
    } catch (error) {
      console.error("Failed to save earnings", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadEarnings();
    }, [])
  );

  const addEarning = (newEarning: Earning) => {
    const updatedEarnings = [...earnings, newEarning];
    setEarnings(updatedEarnings);
    saveEarnings(updatedEarnings);
  };

  const updateEarning = (updatedEarning: Earning) => {
    const updatedEarnings = earnings.map((item) =>
      item.id === updatedEarning.id ? updatedEarning : item
    );
    setEarnings(updatedEarnings);
    saveEarnings(updatedEarnings);
    setEditingEarning(null);
  };

  const deleteEarning = (id: string) => {
    Alert.alert("Delete Earning", "Are you sure you want to delete this earning?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          const updatedEarnings = earnings.filter((item) => item.id !== id);
          setEarnings(updatedEarnings);
          saveEarnings(updatedEarnings);
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Earnings</Text>

      {editingEarning ? (
        <UpdateEarningForm
          earning={editingEarning}
          onUpdate={updateEarning}
          onCancel={() => setEditingEarning(null)}
        />
      ) : (
        <AddEarningForm onAdd={addEarning} />
      )}

      <ScrollView style={styles.list}>
        {earnings.map((item) => (
          <View key={item.id} style={styles.item}>
            <Text>
              {item.type} - ${item.sum} - {item.date} - {item.mentions}
            </Text>
            <View style={styles.actions}>
              <Button mode="text" onPress={() => deleteEarning(item.id)}>
                Delete
              </Button>
              <Button mode="text" onPress={() => setEditingEarning(item)}>
                Edit
              </Button>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  list: { marginTop: 16 },
  item: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  actions: { flexDirection: "row" },
});

export default EarningsScreen;
