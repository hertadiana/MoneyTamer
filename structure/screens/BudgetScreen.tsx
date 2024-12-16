import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { Budget } from "../components/Budget";
import { BudgetData } from "../data/BudgetData";

const STORAGE_KEY = "budget";

const BudgetScreen = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [budget, setBudget] = useState<Budget>({
    id: "",
    type: "",
    sum: 0,
  });
 
  const loadBudgets = async () => {
    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedData) {
        setBudgets(JSON.parse(storedData));
      } else {
        setBudgets(BudgetData);
      }
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
  const addBudget = () => {
    if (budget.type.trim() !== "" && budget.sum > 0) {
      const newBudgets = [
        ...budgets,
        { ...budget, id: (budgets.length + 1).toString() },
      ];
      setBudgets(newBudgets);
      saveBudgets(newBudgets);
      setBudget({ id: "", type: "", sum: 0 });
    }
  };

  const deleteBudget = (index: number) => {
    Alert.alert(
      "Delete Budget",
      "Are you sure you want to delete this budget?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Delete cancelled"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            const updatedData = [...budgets];
            updatedData.splice(index, 1);
            setBudgets(updatedData);
            saveBudgets(updatedData);
          },
          style: "destructive",
        },
      ]
    );
  };
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Budgets</Text>

      <TextInput
        style={styles.input}
        placeholder="Type (e.g., Food, Savings)"
        value={budget.type}
        onChangeText={(text) => setBudget({ ...budget, type: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Sum"
        keyboardType="numeric"
        value={budget.sum.toString()}
        onChangeText={(text) => setBudget({ ...budget, sum: parseFloat(text) || 0 })}
      />

      <Button mode="contained" onPress={addBudget}>
        Add Budget
      </Button>

      <ScrollView style={styles.list}>
        {budgets.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text>
              {item.type} - ${item.sum}
            </Text>
            <Button mode="text" onPress={() => deleteBudget(index)}>
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

export default BudgetScreen;
