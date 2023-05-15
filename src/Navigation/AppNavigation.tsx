import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import { MenuLateralIzquierdo } from "./MenuLateralIzquierdo";

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <MenuLateralIzquierdo />
    </NavigationContainer>
  );
};
