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
  return (
    <View>
      <Image
        source={require("../assets/images/login.png")}
        style={{
          width: "100%",
          height: 290,
          backgroundColor: "rgb(242, 242, 242)",
        }}
      />

      <View
        style={{
          padding: 20,
          height: "100%",
          backgroundColor: "rgb(242, 242, 242)",
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
              color: "#B2255D",
            }}
          >
            Login
          </Text>
          <Text
            style={{
              fontSize: 19,
              fontWeight: "normal",
              marginVertical: 0,
              color: "#B2255D",
              opacity: 0.4,
            }}
          >
            Login to continue using the app{" "}
          </Text>
        </View>

        <View
          style={{
            // marginTop: 50,
            backgroundColor: "unset",
            display: "flex",
            gap: 15,
          }}
        >
          <TextInput
            style={{
              width: "100%",
              height: 50,
              backgroundColor: "rgba(178, 37, 93, 0.3)",
              borderRadius: 10,
              padding: 10,
              color: "#fff",
            }}
          />
          <View>
            <TextInput
              style={{
                width: "100%",
                height: 50,
                backgroundColor: "rgba(178, 37, 93, 0.3)",
                borderRadius: 10,
                padding: 10,
                color: "#fff",
              }}
            />
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Text
                    style={{
                      color: "rgba(178, 37, 93, 0.3)",
                      backgroundColor: `${
                        Colors[colorScheme ?? "light"].background
                      }`,
                      // padding: 10,
                      // borderRadius: 10,
                      textAlign: "right",
                      // marginTop: 20,
                      opacity: pressed ? 0.5 : 1,
                    }}
                  >
                    Forget Password?
                  </Text>
                )}
              </Pressable>
            </Link>
          </View>
          <Link href="/(tabs)" asChild>
            <Pressable>
              {({ pressed }) => (
                <Text
                  style={{
                    color: "#fff",
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
        <Image
          source={require("../assets/images/titlelogo.png")}
          style={{
            width: "90%",
            alignSelf: "center",
            marginTop: 50,
            height: 50,
            backgroundColor: "rgb(242, 242, 242)",
          }}
        />
      </View>
    </View>
  );
};

export default login;
