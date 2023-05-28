import React from "react";
import { Appbar } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";
import { Image, View } from "react-native";
import { AntDesign } from '@expo/vector-icons'; 
import { AuthContext } from '.././AuthContext';
export const AppBarSuper5 = ({ navigation, route, options, back }: any) => {
  const titulo = getHeaderTitle(options, route.name);
  const { isLoggedIn, setIsLoggedIn } = React.useContext(AuthContext);
  setIsLoggedIn(true);
  return (
    <Appbar.Header>
      {titulo === "Home" && (
        <Appbar.Action
          icon="menu"
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
      )}
      {back && (
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
      )}
      {/* <Appbar.Content
        title={titulo !== "Home" ? titulo : ""}
        style={{ alignItems: "center" }}
      /> */}
      {titulo !== "Home" ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Image
            source={require("../../assets/imagenSinFondo.png")}
            style={{ width: 180, height: 60 }}
          />
        </View>
      ) : (
        <Appbar.Content
          title={titulo !== "Home" ? titulo : ""}
          style={{ alignItems: "center" }}
        />
      )}
      {route.name !== "Search" && (
        <AntDesign 
          name="user" 
          size={24} 
          color="black" 
          onPress={() => {
            navigation.navigate(isLoggedIn?"Profile" : "Login");
          }}
          visible={false}
        />
      )}
      {titulo !== "Mi Carrito" && (
        <Appbar.Action
          icon="cart"
          onPress={() => {
            navigation.navigate("Shopping-Cart");
          }}
        />
      )}
    </Appbar.Header>
  );
};
