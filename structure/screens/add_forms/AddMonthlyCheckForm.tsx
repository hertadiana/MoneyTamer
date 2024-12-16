import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Button, Menu } from "react-native-paper";

interface AddMonthlyCheckFormProps {
  onAdd: (monthlyCheck: { id: string; item: string; type: "Need" | "Want" }) => void;
}

const AddMonthlyCheckForm = ({ onAdd }: AddMonthlyCheckFormProps) => {
  const [monthlyCheck, setMonthlyCheck] = useState<{
    item: string;
    type: "Need" | "Want"; // Explicit type constraint
  }>({
    item: "",
    type: "Need", // Default value
  });

  const [error, setError] = useState<string>("");
  const [menuVisible, setMenuVisible] = useState(false); // For dropdown visibility

  const handleAdd = () => {
    if (monthlyCheck.item.trim() === "") {
      setError("Please fill in all fields correctly.");
      return;
    }

    onAdd({ ...monthlyCheck, id: Date.now().toString() }); // Pass valid object
    setMonthlyCheck({ item: "", type: "Need" }); // Reset fields
    setError("");
  };
  return (
    <View style={styles.form}>
      <Text style={styles.label}>Item</Text>
      <TextInput
        style={styles.input}
        value={monthlyCheck.item}
        onChangeText={(text) => setMonthlyCheck({ ...monthlyCheck, item: text })}
      />

      <Text style={styles.label}>Type</Text>
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <Button
            mode="outlined"
            onPress={() => setMenuVisible(true)}
            style={styles.dropdownButton}
          >
            {monthlyCheck.type}
          </Button>
        }
      >
        <Menu.Item
          onPress={() => {
            setMonthlyCheck({ ...monthlyCheck, type: "Need" });
            setMenuVisible(false);
          }}
          title="Need"
        />
        <Menu.Item
          onPress={() => {
            setMonthlyCheck({ ...monthlyCheck, type: "Want" });
            setMenuVisible(false);
          }}
          title="Want"
        />
      </Menu>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button mode="contained" onPress={handleAdd}>
        Add Monthly Check
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
  dropdownButton: {
    marginBottom: 8,
  },
  error: {
    color: "red",
    marginBottom: 8,
  },
});

export default AddMonthlyCheckForm;
