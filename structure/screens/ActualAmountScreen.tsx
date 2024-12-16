import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { ActualAmount } from "../components/ActualAmount";
import { ActualAmountData } from "../data/ActualAmount";
import AddActualAmountForm from "./add_forms/AddActualAmountForm";
import UpdateActualAmountForm from "./edit_forms/UpdateActualAmountForm";

const STORAGE_KEY = "actualAmounts";

const ActualAmountScreen = () => {
  const [actualAmounts, setActualAmounts] = useState<ActualAmount[]>([]);
  const [editingAmount, setEditingAmount] = useState<ActualAmount | null>(null);

  const loadActualAmounts = async () => {
    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      setActualAmounts(storedData ? JSON.parse(storedData) : ActualAmountData);
    } catch (error) {
      console.error("Failed to load actual amounts", error);
    }
  };

  const saveActualAmounts = async (data: ActualAmount[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Failed to save actual amounts", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadActualAmounts();
    }, [])
  );

  const addActualAmount = (newAmount: ActualAmount) => {
    const updatedAmounts = [...actualAmounts, newAmount];
    setActualAmounts(updatedAmounts);
    saveActualAmounts(updatedAmounts);
  };

  const updateActualAmount = (updatedAmount: ActualAmount) => {
    const updatedAmounts = actualAmounts.map((item) =>
      item.id === updatedAmount.id ? updatedAmount : item
    );
    setActualAmounts(updatedAmounts);
    saveActualAmounts(updatedAmounts);
    setEditingAmount(null);
  };

  const deleteActualAmount = (id: string) => {
    Alert.alert("Delete Actual Amount", "Are you sure you want to delete this amount?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          const updatedAmounts = actualAmounts.filter((item) => item.id !== id);
          setActualAmounts(updatedAmounts);
          saveActualAmounts(updatedAmounts);
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Actual Amounts</Text>

      {editingAmount ? (
        <UpdateActualAmountForm
          actualAmount={editingAmount}
          onUpdate={updateActualAmount}
          onCancel={() => setEditingAmount(null)}
        />
      ) : (
        <AddActualAmountForm onAdd={addActualAmount} />
      )}

      <ScrollView style={styles.list}>
        {actualAmounts.map((item) => (
          <View key={item.id} style={styles.item}>
            <Text>
              {item.type} - ${item.sum}
            </Text>
            <View style={styles.actions}>
              <Button mode="text" onPress={() => deleteActualAmount(item.id)}>
                Delete
              </Button>
              <Button mode="text" onPress={() => setEditingAmount(item)}>
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

export default ActualAmountScreen;
