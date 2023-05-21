import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens/HomeScreen";
import { AppBarSuper5 } from "../components/AppBarSuper5";
import { CarritoScreen } from "../carrito/screens/CarritoScreen";
import { BuscarScreen } from "../screens/BuscarScreen";
import LoginScreen from "../screens/LoginScreen";
import AltaUserScreen from "../screens/AltaUserScreen";
import PasswordScreen from "../screens/PasswordScreen";

const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ header: (props) => <AppBarSuper5 {...props} /> }}
    >
      
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={PasswordScreen} />
      <Stack.Screen name="AltaUser" component={AltaUserScreen} />
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
    </Stack.Navigator>
  );
};
