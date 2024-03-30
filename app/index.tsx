import { View, Text } from "@/components/Themed";
import { Link } from "expo-router";
import React from "react";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import {
  Alert,
  Button,
  Image,
  Pressable,
  TextInput,
  Touchable,
} from "react-native";

type Props = {};

const login = (props: Props) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme == "dark";

  const titleImageUrl = !isDarkMode
    ? require("../assets/images/titlelogo_dark.png")
    : require("../assets/images/titlelogo_light.png");

  return (
    <View>
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
          <Link href="./(tabs)/" asChild>
            <Pressable>
              {({ pressed }) => (
                <Text
                  style={{
                    color: Colors[colorScheme ?? "light"].background,
                    backgroundColor: "#B2255D",
                    padding: 10,
                    borderRadius: 10,
                    textAlign: "center",
                    marginTop: 20,
                    opacity: pressed ? 0.5 : 1,
                  }}
                >
                  Login
                </Text>
              )}
            </Pressable>
          </Link>
        </View>
        {titleImageUrl && (
          <Image
            source={titleImageUrl}
            style={{
              width: "90%",
              alignSelf: "center",
              marginTop: 50,
              height: 50,
              backgroundColor: Colors[colorScheme ?? "light"].background,
            }}
          />
        )}
      </View>
    </View>
  );
};

export default login;
