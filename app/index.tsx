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
        height: "100%",
      }}
    >
      <Image
        source={require("../assets/images/login.png")}
        style={{
          width: "100%",
          height: 290,
          backgroundColor: Colors[colorScheme ?? "light"].background,
        }}
      />

      <View
        style={{
          padding: 20,
          height: "100%",
          backgroundColor: Colors[colorScheme ?? "light"].background,
          display: "flex",
          gap: 50,
          alignContent: "space-around",
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              marginVertical: 0,
              color: Colors[colorScheme ?? "light"].text,
            }}
          >
            Login
          </Text>
          <Text
            style={{
              fontSize: 19,
              fontWeight: "normal",
              marginVertical: 0,
              color: Colors[colorScheme ?? "light"].text,
              opacity: 0.4,
            }}
          >
            Login to continue using the app{" "}
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "unset",
            display: "flex",
            gap: 15,
          }}
        >
          <TextInput
            style={{
              width: "100%",
              height: 50,
              backgroundColor: Colors[colorScheme ?? "light"].lightText,
              borderRadius: 10,
              padding: 10,
              color: Colors[colorScheme ?? "light"].text,
            }}
            placeholderTextColor={Colors[colorScheme ?? "light"].lightText}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <View
            style={{
              backgroundColor: "unset",
            }}
          >
            <TextInput
              style={{
                width: "100%",
                height: 50,
                backgroundColor: Colors[colorScheme ?? "light"].lightText,
                borderRadius: 10,
                padding: 10,
                color: Colors[colorScheme ?? "light"].text,
              }}
              placeholderTextColor={Colors[colorScheme ?? "light"].lightText}
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Text
                    style={{
                      color: Colors[colorScheme ?? "light"].text,
                      backgroundColor:
                        Colors[colorScheme ?? "light"].background,
                      textAlign: "right",
                      opacity: pressed ? 0.5 : 1,
                    }}
                  >
                    Forget Password?
                  </Text>
                )}
              </Pressable>
            </Link>
          </View>
          <Pressable
            onPress={handleLogin}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.5 : 1,
                backgroundColor: "#B2255D",
                borderRadius: 10,
                padding: 10,
                marginTop: 20,
              },
            ]}
          >
            <Text
              style={{
                color: Colors[colorScheme ?? "light"].background,
                textAlign: "center",
              }}
            >
              Login
            </Text>
          </Pressable>
        </View>
        <Image
          source={require("../assets/images/titlelogo_dark.png")}
          style={{
            width: "90%",
            alignSelf: "center",
            marginTop: 50,
            height: 50,
            backgroundColor: Colors[colorScheme ?? "light"].background,
          }}
        />
      </View>
    </View>
  );
};

export default Login;
