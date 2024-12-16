import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { MonthlyCheck } from "../components/MonthlyCheck";
import { MonthlyCheckData } from "../data/MonthlyCheckData";
import AddMonthlyCheckForm from "./add_forms/AddMonthlyCheckForm";
import UpdateMonthlyCheckForm from "./edit_forms/UpdateMonthlyCheckForm";

const STORAGE_KEY = "monthlyChecks";

const MonthlyChecksScreen = () => {
  const [monthlyChecks, setMonthlyChecks] = useState<MonthlyCheck[]>([]);
  const [editingMonthlyCheck, setEditingMonthlyCheck] = useState<MonthlyCheck | null>(null);

  const loadMonthlyChecks = async () => {
    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      setMonthlyChecks(storedData ? JSON.parse(storedData) : MonthlyCheckData);
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

  const addMonthlyCheck = (newCheck: MonthlyCheck) => {
    const updatedChecks = [...monthlyChecks, newCheck];
    setMonthlyChecks(updatedChecks);
    saveMonthlyChecks(updatedChecks);
  };

  const updateMonthlyCheck = (updatedCheck: MonthlyCheck) => {
    const updatedChecks = monthlyChecks.map((item) =>
      item.id === updatedCheck.id ? updatedCheck : item
    );
    setMonthlyChecks(updatedChecks);
    saveMonthlyChecks(updatedChecks);
    setEditingMonthlyCheck(null);
  };

  const deleteMonthlyCheck = (id: string) => {
    Alert.alert("Delete Monthly Check", "Are you sure you want to delete this check?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          const updatedChecks = monthlyChecks.filter((item) => item.id !== id);
          setMonthlyChecks(updatedChecks);
          saveMonthlyChecks(updatedChecks);
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Monthly Checks</Text>

      {editingMonthlyCheck ? (
        <UpdateMonthlyCheckForm
          monthlyCheck={editingMonthlyCheck}
          onUpdate={updateMonthlyCheck}
          onCancel={() => setEditingMonthlyCheck(null)}
        />
      ) : (
        <AddMonthlyCheckForm onAdd={addMonthlyCheck} />
      )}

      <ScrollView style={styles.list}>
        {monthlyChecks.map((item) => (
          <View key={item.id} style={styles.item}>
            <Text>
              {item.item} - {item.type}
            </Text>
            <View style={styles.actions}>
              <Button mode="text" onPress={() => deleteMonthlyCheck(item.id)}>
                Delete
              </Button>
              <Button mode="text" onPress={() => setEditingMonthlyCheck(item)}>
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

export default MonthlyChecksScreen;
