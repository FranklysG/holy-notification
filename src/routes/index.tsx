import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SignIn } from "../screens/signIn";
import { Home } from "../screens/home";
import { BookProvider } from "../hooks/useBooks";

const { Navigator, Screen } = createStackNavigator();

export function Routes() {
  const singned = true;

  return (
    <NavigationContainer>
      {singned ? (
        <BookProvider>
            <Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Screen name={"Home"} component={Home} />
            </Navigator>
        </BookProvider>
      ) : (
        <SignIn />
      )}
    </NavigationContainer>
  );
}
