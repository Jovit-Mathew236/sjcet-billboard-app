import { Pressable, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";

export default function TabOneScreen() {
  const colorScheme = useColorScheme();

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: Colors[colorScheme ?? "light"].background,
        width: "100%",
      }}
    >
      <Link
        href="/form"
        asChild
        style={{
          width: "40%",
        }}
      >
        <Pressable>
          {({ pressed }) => (
            <View
              style={{
                opacity: pressed ? 0.5 : 1,
                backgroundColor: Colors[colorScheme ?? "light"].text,
                borderRadius: 10,
                padding: 10,
                marginTop: 20,
                height: 200,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: Colors[colorScheme ?? "light"].background,
                  textAlign: "center",
                  fontSize: 18,
                }}
              >
                Faculty edit
              </Text>
            </View>
          )}
        </Pressable>
      </Link>

      <Link
        href="/extraform"
        asChild
        style={{
          width: "40%",
        }}
      >
        <Pressable>
          {({ pressed }) => (
            <View
              style={{
                opacity: pressed ? 0.5 : 1,
                backgroundColor: Colors[colorScheme ?? "light"].text,
                borderRadius: 10,
                padding: 10,
                marginTop: 20,
                height: 200,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: Colors[colorScheme ?? "light"].background,
                  textAlign: "center",
                  fontSize: 18,
                }}
              >
                Extra edit
              </Text>
            </View>
          )}
        </Pressable>
      </Link>
    </View>
  );
}
