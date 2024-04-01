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
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setUser(user); // Update user state when authentication state changes
    });

    return unsubscribe; // Cleanup function to unsubscribe from the listener
  }, []);

  const handleLogin = async () => {
    // Check if email or password is empty
    if (!email || !password) {
      setError("Email and password cannot be empty.");
      Alert.alert("Error", error);
      return;
    }

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
      }}
    >
      <Image
        source={require("../assets/images/home.png")}
        style={{
          width: "100%",
          maxHeight: 290,
          resizeMode: "cover",
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
              textAlign: "center",
            }}
          >
            Hello
          </Text>
          <Text
            style={{
              fontSize: 19,
              fontWeight: "normal",
              marginVertical: 0,
              color: Colors[colorScheme ?? "light"].text,
              opacity: 0.4,
              textAlign: "center",
            }}
          >
            Welcome to Billboards
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
              backgroundColor: Colors[colorScheme ?? "light"].lightBackground,
              borderRadius: 10,
              padding: 10,
              fontSize: 18,
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
                backgroundColor: Colors[colorScheme ?? "light"].lightBackground,
                borderRadius: 10,
                padding: 10,
                fontSize: 18,
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
              Sign in
            </Text>
          </Pressable>
        </View>
        <Image
          source={titleImageUrl}
          style={{
            width: "90%",
            alignSelf: "center",
            // marginTop: 50,
            alignContent: "flex-end",
            height: 50,
            backgroundColor: Colors[colorScheme ?? "light"].background,
          }}
        />
      </View>
    </View>
  );
};

export default Login;
