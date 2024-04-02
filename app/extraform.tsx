import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import firebase from "@react-native-firebase/app";
import database from "@react-native-firebase/database";
import firestore from "@react-native-firebase/firestore";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";

interface Field {
  name: string;
  specializedIn: string;
}

const EditFormExtra: React.FC = () => {
  const colorScheme = useColorScheme();
  const [fields, setFields] = useState<Field[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // try {
    //   const dataSnapshot = await database().ref("fields").once("value");
    //   const data = dataSnapshot.val();
    //   if (data) {
    //     const fieldsArray: Field[] = Object.values(data);
    //     setFields(fieldsArray);
    //   }
    // } catch (error) {
    //   console.error("Error fetching data from Realtime Database:", error);
    // }

    try {
      const firestoreSnapshot = await firestore().collection("position").get();
      const firestoreData = firestoreSnapshot.docs.map(
        (doc) => doc.data() as Field
      );
      if (firestoreData.length > 0) {
        setFields(firestoreData);
      }
    } catch (error) {
      console.error("Error fetching data from Firestore:", error);
    }
  };

  const handleAddField = () => {
    setFields([...fields, { name: "", specializedIn: "" }]);
  };

  const handleInputChange = (
    text: string,
    index: number,
    field: keyof Field
  ) => {
    // Create a copy of the fields array
    const updatedFields = [...fields];
    // Update the specific field in the copied array
    updatedFields[index] = {
      ...updatedFields[index], // Spread the existing field object
      [field]: text, // Update the specific field
    };
    // Update the state with the new array
    setFields(updatedFields);
  };

  const saveToDatabase = () => {
    // Filter out fields where both name and specializedIn are empty except for the first one
    const filteredFields = fields.filter((field, index) => {
      if (index === 0) {
        return true; // Keep the first field
      }
      return field.name.trim() !== "" || field.specializedIn.trim() !== "";
    });

    const ref = database().ref("position");
    filteredFields.forEach((field, index) => {
      ref.child(index.toString()).set(field); // Save data to Realtime Database
    });
    updateFirestore(); // Call function to update Firestore
  };

  const updateFirestore = async () => {
    const firestoreRef = firestore().collection("position");
    fields.forEach(async (field, index) => {
      await firestoreRef.doc(index.toString()).set(field); // Update Firestore with data from Realtime Database
    });
    Alert.alert("Success", "Data saved to Firebase");
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <ScrollView>
        {fields.map((field, index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <TextInput
              style={{
                width: "100%",
                height: 50,
                backgroundColor: Colors[colorScheme ?? "light"].lightBackground,
                borderRadius: 10,
                padding: 10,
                fontSize: 18,
                color: Colors[colorScheme ?? "light"].text,
                borderWidth: 1,
                borderColor: Colors[colorScheme ?? "light"].lightText,
                marginTop: 10,
              }}
              placeholderTextColor={Colors[colorScheme ?? "light"].lightText}
              placeholder="Position"
              value={field.name}
              onChangeText={(text) => handleInputChange(text, index, "name")}
            />
            <TextInput
              style={{
                width: "100%",
                height: 50,
                backgroundColor: Colors[colorScheme ?? "light"].lightBackground,
                borderRadius: 10,
                padding: 10,
                fontSize: 18,
                color: Colors[colorScheme ?? "light"].text,
                borderWidth: 1,
                borderColor: Colors[colorScheme ?? "light"].lightText,
                marginTop: 10,
              }}
              placeholderTextColor={Colors[colorScheme ?? "light"].lightText}
              placeholder="Count"
              value={field.specializedIn}
              onChangeText={(text) =>
                handleInputChange(text, index, "specializedIn")
              }
            />
          </View>
        ))}
      </ScrollView>
      <Pressable
        onPress={handleAddField}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.5 : 1,
            backgroundColor: Colors[colorScheme ?? "light"].text,
            borderRadius: 10,
            padding: 10,
            marginTop: 20,
            height: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <Text
          style={{
            color: Colors[colorScheme ?? "light"].background,
            textAlign: "center",
            fontSize: 18,
          }}
        >
          Add New
        </Text>
      </Pressable>
      <Pressable
        onPress={saveToDatabase}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.5 : 1,
            backgroundColor: Colors[colorScheme ?? "light"].text,
            borderRadius: 10,
            padding: 10,
            marginTop: 10,
            height: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <Text
          style={{
            color: Colors[colorScheme ?? "light"].background,
            textAlign: "center",
            fontSize: 18,
          }}
        >
          Save
        </Text>
      </Pressable>
    </View>
  );
};

export default EditFormExtra;
