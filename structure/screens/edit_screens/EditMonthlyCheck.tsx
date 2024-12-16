import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "react-native-paper";
import { MonthlyCheck } from "../../components/MonthlyCheck";

const EditMonthlyCheck = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { monthlyCheck, updateMonthlyCheck } = route.params as {
    monthlyCheck: MonthlyCheck;
    updateMonthlyCheck: (updatedMonthlyCheck: MonthlyCheck) => void;
  };

  const [editedMonthlyCheck, setEditedMonthlyCheck] = useState<MonthlyCheck>(monthlyCheck);

  const handleSave = () => {
    updateMonthlyCheck(editedMonthlyCheck);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Monthly Check</Text>

      <TextInput
        style={styles.input}
        placeholder="Item"
        value={editedMonthlyCheck.item}
        onChangeText={(text) => setEditedMonthlyCheck({ ...editedMonthlyCheck, item: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Type (Need or Want)"
        value={editedMonthlyCheck.type}
        onChangeText={(text) =>
          setEditedMonthlyCheck({ ...editedMonthlyCheck, type: text as "Need" | "Want" })
        }
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

export default EditMonthlyCheck;
