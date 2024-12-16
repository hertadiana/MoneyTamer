import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "react-native-paper";

interface AddActualAmountFormProps {
  onAdd: (actualAmount: { id: string; type: string; sum: number }) => void;
}

const AddActualAmountForm = ({ onAdd }: AddActualAmountFormProps) => {
  const [actualAmount, setActualAmount] = useState({
    type: "",
    sum: 0,
  });
  const [error, setError] = useState<string>("");

  const handleAdd = () => {
    if (actualAmount.type.trim() === "" || actualAmount.sum <= 0) {
      setError("Please fill in all fields correctly.");
      return;
    }

    onAdd({ ...actualAmount, id: Date.now().toString() });
    setActualAmount({ type: "", sum: 0 });
    setError("");
  };

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Type</Text>
      <TextInput
        style={styles.input}
        value={actualAmount.type}
        onChangeText={(text) => setActualAmount({ ...actualAmount, type: text })}
      />

      <Text style={styles.label}>Sum</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={actualAmount.sum.toString()}
        onChangeText={(text) => setActualAmount({ ...actualAmount, sum: parseFloat(text) || 0 })}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button mode="contained" onPress={handleAdd}>
        Add Actual Amount
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

export default AddActualAmountForm;
