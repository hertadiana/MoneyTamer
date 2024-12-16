import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { Budget } from "../components/Budget";
import { BudgetData } from "../data/BudgetData";
import AddBudgetForm from "./add_forms/AddBudgetForm";
import UpdateBudgetForm from "./edit_forms/UpdateBudgetScreen";
const STORAGE_KEY = "budget";

const BudgetScreen = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);

  const loadBudgets = async () => {
    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      setBudgets(storedData ? JSON.parse(storedData) : BudgetData);
    } catch (error) {
      console.error("Failed to load budgets", error);
    }
  };

  const saveBudgets = async (data: Budget[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Failed to save budgets", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadBudgets();
    }, [])
  );

  const addBudget = (newBudget: Budget) => {
    const updatedBudgets = [...budgets, newBudget];
    setBudgets(updatedBudgets);
    saveBudgets(updatedBudgets);
  };

  const updateBudget = (updatedBudget: Budget) => {
    const updatedBudgets = budgets.map((item) =>
      item.id === updatedBudget.id ? updatedBudget : item
    );
    setBudgets(updatedBudgets);
    saveBudgets(updatedBudgets);
    setEditingBudget(null);
  };

  const deleteBudget = (id: string) => {
    Alert.alert("Delete Budget", "Are you sure you want to delete this budget?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          const updatedBudgets = budgets.filter((item) => item.id !== id);
          setBudgets(updatedBudgets);
          saveBudgets(updatedBudgets);
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Budgets</Text>

      {editingBudget ? (
        <UpdateBudgetForm
          budget={editingBudget}
          onUpdate={updateBudget}
          onCancel={() => setEditingBudget(null)}
        />
      ) : (
        <AddBudgetForm onAdd={addBudget} />
      )}

      <ScrollView style={styles.list}>
        {budgets.map((item) => (
          <View key={item.id} style={styles.item}>
            <Text>
              {item.type} - ${item.sum}
            </Text>
            <View style={styles.actions}>
              <Button mode="text" onPress={() => deleteBudget(item.id)}>
                Delete
              </Button>
              <Button mode="text" onPress={() => setEditingBudget(item)}>
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

export default BudgetScreen;
