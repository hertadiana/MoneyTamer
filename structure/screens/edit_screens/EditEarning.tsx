import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "react-native-paper";
import { Earning } from "../../components/Earning";

const EditEarning = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { earning, updateEarning } = route.params as {
    earning: Earning;
    updateEarning: (updatedEarning: Earning) => void;
  };

  const [editedEarning, setEditedEarning] = useState<Earning>(earning);

  const handleSave = () => {
    updateEarning(editedEarning);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Earning</Text>

      <TextInput
        style={styles.input}
        placeholder="Type"
        value={editedEarning.type}
        onChangeText={(text) => setEditedEarning({ ...editedEarning, type: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Sum"
        keyboardType="numeric"
        value={editedEarning.sum.toString()}
        onChangeText={(text) => setEditedEarning({ ...editedEarning, sum: parseFloat(text) || 0 })}
      />
      <TextInput
        style={styles.input}
        placeholder="Date"
        value={editedEarning.date}
        onChangeText={(text) => setEditedEarning({ ...editedEarning, date: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Mentions"
        value={editedEarning.mentions}
        onChangeText={(text) => setEditedEarning({ ...editedEarning, mentions: text })}
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

export default EditEarning;
