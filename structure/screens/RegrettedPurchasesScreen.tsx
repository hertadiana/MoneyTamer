import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { RegrettedPurchase } from "../components/RegrettedPurchase";
import { RegrettedPurchaseData } from "../data/RegrettedPurchaseData";
import AddRegrettedPurchaseForm from "./add_forms/AddRegrettedPurchaseForm";
import UpdateRegrettedPurchaseForm from "./edit_forms/UpdateRegrettedPurchaseForm";

const STORAGE_KEY = "regrettedPurchases";

const RegrettedPurchasesScreen = () => {
  const [regrettedPurchases, setRegrettedPurchases] = useState<RegrettedPurchase[]>([]);
  const [editingPurchase, setEditingPurchase] = useState<RegrettedPurchase | null>(null);

  const loadRegrettedPurchases = async () => {
    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      setRegrettedPurchases(storedData ? JSON.parse(storedData) : RegrettedPurchaseData);
    } catch (error) {
      console.error("Failed to load regretted purchases", error);
    }
  };

  const saveRegrettedPurchases = async (data: RegrettedPurchase[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Failed to save regretted purchases", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadRegrettedPurchases();
    }, [])
  );

  const addRegrettedPurchase = (newPurchase: RegrettedPurchase) => {
    const updatedPurchases = [...regrettedPurchases, newPurchase];
    setRegrettedPurchases(updatedPurchases);
    saveRegrettedPurchases(updatedPurchases);
  };

  const updateRegrettedPurchase = (updatedPurchase: RegrettedPurchase) => {
    const updatedPurchases = regrettedPurchases.map((item) =>
      item.id === updatedPurchase.id ? updatedPurchase : item
    );
    setRegrettedPurchases(updatedPurchases);
    saveRegrettedPurchases(updatedPurchases);
    setEditingPurchase(null);
  };

  const deleteRegrettedPurchase = (id: string) => {
    Alert.alert(
      "Delete Regretted Purchase",
      "Are you sure you want to delete this regretted purchase?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            const updatedPurchases = regrettedPurchases.filter((item) => item.id !== id);
            setRegrettedPurchases(updatedPurchases);
            saveRegrettedPurchases(updatedPurchases);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Regretted Purchases</Text>

      {editingPurchase ? (
        <UpdateRegrettedPurchaseForm
          purchase={editingPurchase}
          onUpdate={updateRegrettedPurchase}
          onCancel={() => setEditingPurchase(null)}
        />
      ) : (
        <AddRegrettedPurchaseForm onAdd={addRegrettedPurchase} />
      )}

      <ScrollView style={styles.list}>
        {regrettedPurchases.map((item) => (
          <View key={item.id} style={styles.item}>
            <Text>
              {item.item} - ${item.cost}
            </Text>
            <View style={styles.actions}>
              <Button mode="text" onPress={() => deleteRegrettedPurchase(item.id)}>
                Delete
              </Button>
              <Button mode="text" onPress={() => setEditingPurchase(item)}>
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

export default RegrettedPurchasesScreen;
