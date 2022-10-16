import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { ActivityIndicator, SafeAreaView, StatusBar, View } from "react-native";
import { useFonts } from 'expo-font';
import { Routes } from "./src/routes";

export default function App() {
  const [fontsLoaded] = useFonts({
    'passenger-display-regular': require('./src/assets/fonts/passenger-display-regular.ttf'),
    'passenger-display-light': require('./src/assets/fonts/passenger-display-light.ttf'),
    'passenger-display-medium': require('./src/assets/fonts/passenger-display-medium.ttf'),
    'passenger-display-semibold': require('./src/assets/fonts/passenger-display-semibold.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View className="flex flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#60461f"/>
      </View>
    );
  }

  return (
    <>
      <Routes />
      <ExpoStatusBar style="light"/>
    </>
  );
}
