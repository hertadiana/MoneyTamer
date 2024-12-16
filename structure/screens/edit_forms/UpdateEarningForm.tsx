import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "react-native-paper";

interface UpdateEarningFormProps {
  earning: { id: string; type: string; sum: number; date: string; mentions: string };
  onUpdate: (updatedEarning: { id: string; type: string; sum: number; date: string; mentions: string }) => void;
  onCancel: () => void;
}

const UpdateEarningForm = ({ earning, onUpdate, onCancel }: UpdateEarningFormProps) => {
  const [formData, setFormData] = useState({ ...earning });
  const [error, setError] = useState("");

  const handleUpdate = () => {
    if (formData.type.trim() === "" || formData.sum <= 0 || formData.date.trim() === "") {
      setError("Please fill in all fields correctly.");
      return;
    }
    onUpdate(formData);
  };

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Type</Text>
      <TextInput
        style={styles.input}
        value={formData.type}
        onChangeText={(text) => setFormData({ ...formData, type: text })}
      />

      <Text style={styles.label}>Sum</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={formData.sum.toString()}
        onChangeText={(text) => setFormData({ ...formData, sum: parseFloat(text) || 0 })}
      />

      <Text style={styles.label}>Date</Text>
      <TextInput
        style={styles.input}
        value={formData.date}
        onChangeText={(text) => setFormData({ ...formData, date: text })}
      />

      <Text style={styles.label}>Mentions</Text>
      <TextInput
        style={styles.input}
        value={formData.mentions}
        onChangeText={(text) => setFormData({ ...formData, mentions: text })}
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

export default UpdateEarningForm;
