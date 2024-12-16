import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "react-native-paper";
import { RegrettedPurchase } from "../../components/RegrettedPurchase";
const EditRegrettedPurchase = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { regrettedPurchase, updateRegrettedPurchase } = route.params as {
    regrettedPurchase: RegrettedPurchase;
    updateRegrettedPurchase: (updatedRegrettedPurchase: RegrettedPurchase) => void;
  };

  const [editedRegrettedPurchase, setEditedRegrettedPurchase] = useState<RegrettedPurchase>(
    regrettedPurchase
  );

  const handleSave = () => {
    updateRegrettedPurchase(editedRegrettedPurchase);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Regretted Purchase</Text>

      <TextInput
        style={styles.input}
        placeholder="Item"
        value={editedRegrettedPurchase.item}
        onChangeText={(text) =>
          setEditedRegrettedPurchase({ ...editedRegrettedPurchase, item: text })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Cost"
        keyboardType="numeric"
        value={editedRegrettedPurchase.cost.toString()}
        onChangeText={(text) =>
          setEditedRegrettedPurchase({
            ...editedRegrettedPurchase,
            cost: parseFloat(text) || 0,
          })
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

export default EditRegrettedPurchase;
