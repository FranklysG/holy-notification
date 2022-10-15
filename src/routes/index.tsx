import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SignIn } from "../screens/signIn";
import { Home } from "../screens/home";

const { Navigator, Screen } = createStackNavigator();

export function Routes() {
  const singned = true;

  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {singned ? (
          <Screen name={"Home"} component={Home} />
        ) : (
          <Screen name="SignIn" component={SignIn} />
        )}
      </Navigator>
    </NavigationContainer>
  );
}
