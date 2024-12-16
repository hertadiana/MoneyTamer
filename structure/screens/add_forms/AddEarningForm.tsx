import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "react-native-paper";

interface AddEarningFormProps {
  onAdd: (earning: { id: string; type: string; sum: number; date: string; mentions: string }) => void;
}

const AddEarningForm = ({ onAdd }: AddEarningFormProps) => {
  const [earning, setEarning] = useState({
    type: "",
    sum: 0,
    date: "",
    mentions: "",
  });
  const [error, setError] = useState<string>("");

  const handleAdd = () => {
    if (earning.type.trim() === "" || earning.sum <= 0 || earning.date.trim() === "") {
      setError("Please fill in all fields correctly.");
      return;
    }

    onAdd({ ...earning, id: Date.now().toString() });
    setEarning({ type: "", sum: 0, date: "", mentions: "" });
    setError("");
  };

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Type</Text>
      <TextInput
        style={styles.input}
        value={earning.type}
        onChangeText={(text) => setEarning({ ...earning, type: text })}
      />

      <Text style={styles.label}>Sum</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={earning.sum.toString()}
        onChangeText={(text) => setEarning({ ...earning, sum: parseFloat(text) || 0 })}
      />

      <Text style={styles.label}>Date</Text>
      <TextInput
        style={styles.input}
        value={earning.date}
        onChangeText={(text) => setEarning({ ...earning, date: text })}
      />

      <Text style={styles.label}>Mentions</Text>
      <TextInput
        style={styles.input}
        value={earning.mentions}
        onChangeText={(text) => setEarning({ ...earning, mentions: text })}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button mode="contained" onPress={handleAdd}>
        Add Earning
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginBottom: 16,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 8,
    borderRadius: 4,
  },
  error: {
    color: "red",
    marginBottom: 8,
  },
});

export default AddEarningForm;
