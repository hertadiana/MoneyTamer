import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { ActualAmount } from "../../components/ActualAmount";
import { ActualAmountData } from "../../data/ActualAmount";
import { RootStackParamList } from "../../data/types";

type NavigationProps = StackNavigationProp<RootStackParamList, "ActualAmount">;

const STORAGE_KEY = "actualAmount";

const EditActualAmountScreen = () => {
  const [actualAmounts, setActualAmounts] = useState<ActualAmount[]>([]);
  const [actualAmount, setActualAmount] = useState<ActualAmount>({
    id: "",
    type: "",
    sum: 0,
   
  });

  const navigation = useNavigation<NavigationProps>();

  const loadActualAmounts = async () => {
    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedData) {
        setActualAmounts(JSON.parse(storedData));
      } else {
        setActualAmounts(ActualAmountData);
      }
    } catch (error) {
      console.error("Failed to load data", error);
    }
  };

  const saveActualAmounts = async (data: ActualAmount[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Failed to save data", error);
    }
  };

  React.useEffect(() => {
    loadActualAmounts();
  }, []);

  const addActualAmount = () => {
    if (actualAmount.type.trim() !== "" && actualAmount.sum > 0) {
      const newActualAmounts = [
        ...actualAmounts,
        { ...actualAmount, id: (actualAmounts.length + 1).toString() },
      ];
      setActualAmounts(newActualAmounts);
      saveActualAmounts(newActualAmounts);
      setActualAmount({ id: "", type: "", sum: 0});
    }
  };

  const deleteActualAmount = (index: number) => {
    const updatedData = [...actualAmounts];
    updatedData.splice(index, 1);
    setActualAmounts(updatedData);
    saveActualAmounts(updatedData);
  };

  const updateActualAmount = (updatedActualAmount: ActualAmount) => {
    const updatedData = actualAmounts.map((item) =>
      item.id === updatedActualAmount.id ? updatedActualAmount : item
    );
    setActualAmounts(updatedData);
    saveActualAmounts(updatedData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Actual Amounts</Text>

      <TextInput
        style={styles.input}
        placeholder="Type"
        value={actualAmount.type}
        onChangeText={(text) => setActualAmount({ ...actualAmount, type: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Sum"
        keyboardType="numeric"
        value={actualAmount.sum.toString()}
        onChangeText={(text) => setActualAmount({ ...actualAmount, sum: parseFloat(text) || 0 })}
      />
      

      <Button mode="contained" onPress={addActualAmount}>
        Add Actual Amount
      </Button>

      <ScrollView style={styles.list}>
        {actualAmounts.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text>
              {item.type} - ${item.sum}
            </Text>
            <View style={styles.actions}>
              <Button mode="text" onPress={() => deleteActualAmount(index)}>
                Delete
              </Button>
              <Button
                mode="text"
                onPress={() =>
                  navigation.navigate("EditActualAmount", {
                    actualAmounts: item,
                    updateActualAmount: updateActualAmount,
                  })
                }
              >
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
  actions: {
    flexDirection: "row",
  },
});

export default EditActualAmountScreen;
