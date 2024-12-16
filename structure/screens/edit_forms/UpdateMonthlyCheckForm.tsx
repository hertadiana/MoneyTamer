import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "react-native-paper";

interface UpdateMonthlyCheckFormProps {
  monthlyCheck: { id: string; item: string; type: "Need" | "Want" };
  onUpdate: (updatedMonthlyCheck: { id: string; item: string; type: "Need" | "Want" }) => void;
  onCancel: () => void;
}

const UpdateMonthlyCheckForm = ({ monthlyCheck, onUpdate, onCancel }: UpdateMonthlyCheckFormProps) => {
  const [formData, setFormData] = useState({ ...monthlyCheck });
  const [error, setError] = useState("");

  const handleUpdate = () => {
    if (formData.item.trim() === "" || !["Need", "Want"].includes(formData.type)) {
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

      <Text style={styles.label}>Type (Need or Want)</Text>
      <TextInput
        style={styles.input}
        value={formData.type}
        onChangeText={(text) => setFormData({ ...formData, type: text as "Need" | "Want" })}
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

export default UpdateMonthlyCheckForm;
