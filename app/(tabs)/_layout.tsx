// Import necessary modules
import React, { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, ActivityIndicator } from "react-native"; // Import ActivityIndicator
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import auth from "@react-native-firebase/auth";

import Colors from "@/constants/Colors";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

const TabLayout: React.FC = () => {
  const colorScheme = useColorScheme();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false); // Set loading to false once user state is updated
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log("User:", user);

    if (!user && !loading) {
      navigation.navigate("index"); // Redirect to login page if user is not logged in
    }
  }, [user, loading, navigation]);

  const handleLogout = async () => {
    try {
      await auth().signOut();
      // console.log("User logged out successfully");
      // Redirect to login page after logout
      // navigation.navigate("index");
    } catch (error: any) {
      console.error("Error logging out:", error.message);
    }
  };

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color={Colors[colorScheme ?? "light"].text}
      />
    ); // Render ActivityIndicator while checking user authentication state
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: true, // Assuming you want to hide the header
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Edit",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="pencil-square" color={color} />
          ),
          headerRight: () => (
            <Pressable onPress={handleLogout}>
              {({ pressed }) => (
                <FontAwesome
                  name="sign-out"
                  size={25}
                  color={Colors[colorScheme ?? "light"].text}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Preview",
          tabBarIcon: ({ color }) => <TabBarIcon name="eye" color={color} />,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
