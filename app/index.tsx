import { View, Text } from "@/components/Themed";
import { Link } from "expo-router";
import React, { useState, useEffect } from "react";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import auth from "@react-native-firebase/auth";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Alert,
  Button,
  Image,
  Pressable,
  TextInput,
  Touchable,
} from "react-native";

type Props = {};

const Login = (props: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme == "dark";

  const titleImageUrl = isDarkMode
    ? require("../assets/images/titlelogo_dark.png")
    : require("../assets/images/titlelogo_light.png");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setUser(user); // Update user state when authentication state changes
    });

    return unsubscribe; // Cleanup function to unsubscribe from the listener
  }, []);

  const handleLogin = async () => {
    try {
      const response = await auth().signInWithEmailAndPassword(email, password);
      // console.log("User logged in successfully:", response.user);
      setUser(response.user); // Set the user in the state
      // Navigate to the dashboard or home screen upon successful login
      // Replace '/dashboard' with the appropriate route name
      navigation.navigate("(tabs)");
    } catch (error: any) {
      console.error("Error logging in:", error.message);
      // Show an alert or error message to the user
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        paddingLeft: 20,
        paddingRight: 20,
        width: "100%",
      }}
    >
      <View
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Image
          source={require("../assets/images/home.png")}
          style={{
            alignSelf: "center",
            width: "100%",
            // marginTop: 50,
            height: "85%",
            resizeMode: "contain",
            backgroundColor: Colors[colorScheme ?? "light"].background,
            borderRadius: 20,
          }}
        />
        <View
          style={{
            position: "absolute",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 90,
          }}
        >
          <Image
            source={titleImageUrl}
            style={{
              alignSelf: "center",
              width: "100%",
              height: 40,
              // marginTop: 50,
              alignContent: "flex-end",
              resizeMode: "contain",
              backgroundColor: Colors[colorScheme ?? "light"].background,
            }}
          />
        </View>
      </View>
      <Text
        style={{
          textAlign: "center",
          fontSize: 22,
          color: Colors[colorScheme ?? "light"].text,
          marginTop: -20,
        }}
      >
        Start your journey now
      </Text>
      <Link href="/login" asChild>
        <Pressable>
          {({ pressed }) => (
            <Text
              style={{
                color: Colors[colorScheme ?? "light"].background,
                backgroundColor: Colors[colorScheme ?? "light"].text,
                padding: 15,
                marginTop: 20,
                fontSize: 18,
                borderRadius: 15,
                textAlign: "center",
                opacity: pressed ? 0.5 : 1,
              }}
            >
              Sign in
            </Text>
          )}
        </Pressable>
      </Link>
    </View>
  );
};

export default Login;
