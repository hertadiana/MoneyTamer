import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "react-native-paper";

interface AddBudgetFormProps {
  onAdd: (budget: { id: string; type: string; sum: number }) => void;
}

const AddBudgetForm = ({ onAdd }: AddBudgetFormProps) => {
  const [budget, setBudget] = useState({
    type: "",
    sum: 0,
  });
  const [error, setError] = useState<string>("");

  const handleAdd = () => {
    if (budget.type.trim() === "" || budget.sum <= 0) {
      setError("Please fill in all fields correctly.");
      return;
    }

    onAdd({ ...budget, id: Date.now().toString() });
    setBudget({ type: "", sum: 0 });
    setError("");
  };

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Type</Text>
      <TextInput
        style={styles.input}
        value={budget.type}
        onChangeText={(text) => setBudget({ ...budget, type: text })}
      />

      <Text style={styles.label}>Sum</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={budget.sum.toString()}
        onChangeText={(text) => setBudget({ ...budget, sum: parseFloat(text) || 0 })}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button mode="contained" onPress={handleAdd}>
        Add Budget
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  form: { marginBottom: 16 },
  label: { fontWeight: "bold", marginBottom: 4 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 8, marginBottom: 8, borderRadius: 4 },
  error: { color: "red", marginBottom: 8 },
});

export default AddBudgetForm;
