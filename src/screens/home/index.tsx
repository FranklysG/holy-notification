import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export function Home() {
  return (
    <View className="flex flex-1 items-center justify-center bg-black">
      <Text className="text-white">
        Home
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}
