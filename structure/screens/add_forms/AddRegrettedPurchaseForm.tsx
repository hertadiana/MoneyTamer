import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "react-native-paper";

interface AddRegrettedPurchaseFormProps {
  onAdd: (purchase: { id: string; item: string; cost: number }) => void;
}

const AddRegrettedPurchaseForm = ({ onAdd }: AddRegrettedPurchaseFormProps) => {
  const [purchase, setPurchase] = useState({
    item: "",
    cost: 0,
  });
  const [error, setError] = useState<string>("");

  const handleAdd = () => {
    if (purchase.item.trim() === "" || purchase.cost <= 0) {
      setError("Please fill in all fields correctly.");
      return;
    }

    onAdd({ ...purchase, id: Date.now().toString() });
    setPurchase({ item: "", cost: 0 });
    setError("");
  };

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Item</Text>
      <TextInput
        style={styles.input}
        value={purchase.item}
        onChangeText={(text) => setPurchase({ ...purchase, item: text })}
      />

      <Text style={styles.label}>Cost</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={purchase.cost.toString()}
        onChangeText={(text) => setPurchase({ ...purchase, cost: parseFloat(text) || 0 })}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button mode="contained" onPress={handleAdd}>
        Add Regretted Purchase
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

export default AddRegrettedPurchaseForm;
