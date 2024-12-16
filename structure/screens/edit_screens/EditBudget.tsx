import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "react-native-paper";
import { Budget } from "../../components/Budget";

const EditBudget = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { budget, updateBudget } = route.params as {
    budget: Budget;
    updateBudget: (updatedBudget: Budget) => void;
  };

  const [editedBudget, setEditedBudget] = useState<Budget>(budget);

  const handleSave = () => {
    updateBudget(editedBudget);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Budget</Text>

      <TextInput
        style={styles.input}
        placeholder="Type"
        value={editedBudget.type}
        onChangeText={(text) => setEditedBudget({ ...editedBudget, type: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Sum"
        keyboardType="numeric"
        value={editedBudget.sum.toString()}
        onChangeText={(text) => setEditedBudget({ ...editedBudget, sum: parseFloat(text) || 0 })}
      />

      <Button mode="contained" onPress={handleSave}>
        Save Changes
      </Button>
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
});

export default EditBudget;
