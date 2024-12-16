import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { RegrettedPurchase } from "../components/RegrettedPurchase";
import { RegrettedPurchaseData } from "../data/RegrettedPurchaseData";

const STORAGE_KEY = "regrettedPurchase";

const RegrettedPurchasesScreen = () => {
  const [regrettedPurchases, setRegrettedPurchases] = useState<RegrettedPurchase[]>([]);
  const [regrettedPurchase, setRegrettedPurchase] = useState<RegrettedPurchase>({
    id: "",
    item: "",
    cost: 0,
  });

  const loadRegrettedPurchases = async () => {
    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedData) {
        setRegrettedPurchases(JSON.parse(storedData));
      } else {
        setRegrettedPurchases(RegrettedPurchaseData);
      }
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

  const addRegrettedPurchase = () => {
    if (regrettedPurchase.item.trim() !== "" && regrettedPurchase.cost > 0) {
      const newRegrettedPurchases = [
        ...regrettedPurchases,
        { ...regrettedPurchase, id: (regrettedPurchases.length + 1).toString() },
      ];
      setRegrettedPurchases(newRegrettedPurchases);
      saveRegrettedPurchases(newRegrettedPurchases);
      setRegrettedPurchase({ id: "", item: "", cost: 0 });
    }
  };

  const deleteRegrettedPurchase = (index: number) => {
    Alert.alert(
      "Delete Regretted Purchase",
      "Are you sure you want to delete this regretted purchase?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Delete cancelled"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            const updatedData = [...regrettedPurchases];
            updatedData.splice(index, 1);
            setRegrettedPurchases(updatedData);
            saveRegrettedPurchases(updatedData);
          },
          style: "destructive",
        },
      ]
    );
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Regretted Purchases</Text>

      <TextInput
        style={styles.input}
        placeholder="Item"
        value={regrettedPurchase.item}
        onChangeText={(text) => setRegrettedPurchase({ ...regrettedPurchase, item: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Cost"
        keyboardType="numeric"
        value={regrettedPurchase.cost.toString()}
        onChangeText={(text) =>
          setRegrettedPurchase({ ...regrettedPurchase, cost: parseFloat(text) || 0 })
        }
      />

      <Button mode="contained" onPress={addRegrettedPurchase}>
        Add Regretted Purchase
      </Button>

      <ScrollView style={styles.list}>
        {regrettedPurchases.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text>
              {item.item} - ${item.cost}
            </Text>
            <Button mode="text" onPress={() => deleteRegrettedPurchase(index)}>
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

export default RegrettedPurchasesScreen;
