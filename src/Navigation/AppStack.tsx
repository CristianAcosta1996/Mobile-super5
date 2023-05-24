import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens/HomeScreen";
import { AppBarSuper5 } from "../components/AppBarSuper5";
import { CarritoScreen } from "../carrito/screens/CarritoScreen";
import { BuscarScreen } from "../screens/BuscarScreen";
import { LoginScreen } from "../auth/screens/LoginScreen";

const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ header: (props) => <AppBarSuper5 {...props} /> }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Shopping-Cart"
        component={CarritoScreen}
        options={{ title: "Mi Carrito" }}
      />
      <Stack.Screen
        name="Search"
        component={BuscarScreen}
        options={{ title: "Buscar" }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Login" }}
      />
    </Stack.Navigator>
  );
};
