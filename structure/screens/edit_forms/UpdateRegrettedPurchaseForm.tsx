import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "react-native-paper";

interface UpdateRegrettedPurchaseFormProps {
  purchase: { id: string; item: string; cost: number };
  onUpdate: (updatedPurchase: { id: string; item: string; cost: number }) => void;
  onCancel: () => void;
}

const UpdateRegrettedPurchaseForm = ({ purchase, onUpdate, onCancel }: UpdateRegrettedPurchaseFormProps) => {
  const [formData, setFormData] = useState({ ...purchase });
  const [error, setError] = useState("");

  const handleUpdate = () => {
    if (formData.item.trim() === "" || formData.cost <= 0) {
      setError("Please fill in all fields correctly.");
      return;
    }
    onUpdate(formData);
  };

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Item</Text>
      <TextInput
        style={styles.input}
        value={formData.item}
        onChangeText={(text) => setFormData({ ...formData, item: text })}
      />

      <Text style={styles.label}>Cost</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={formData.cost.toString()}
        onChangeText={(text) => setFormData({ ...formData, cost: parseFloat(text) || 0 })}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.actions}>
        <Button mode="contained" onPress={handleUpdate}>
          Update
        </Button>
        <Button mode="text" onPress={onCancel}>
          Cancel
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: { marginBottom: 16 },
  label: { fontWeight: "bold", marginBottom: 4 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 8, marginBottom: 8, borderRadius: 4 },
  error: { color: "red", marginBottom: 8 },
  actions: { flexDirection: "row", justifyContent: "space-between" },
});

export default UpdateRegrettedPurchaseForm;
