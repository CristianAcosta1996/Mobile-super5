import React from "react";
import { Appbar, Badge } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";
import { Image, TouchableOpacity, View , Text} from "react-native";
import { AntDesign, Feather } from '@expo/vector-icons'; 
import { useAppSelector } from "../hooks/hooks";

export const AppBarSuper5 = ({ navigation, route, options, back }: any) => {
  const { status } = useAppSelector(state => state.auth);
  const {
    carrito,
  } = useAppSelector((state) => ({ ...state.super5 }));
  const titulo = getHeaderTitle(options, route.name);
  return (
    <Appbar.Header>
      {titulo === "Home" && (
        
        <>
        <Appbar.Action
          icon="menu"
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Image
            source={require("../../assets/imagenSinFondo.png")}
            style={{ width: 180, height: 60 }}
          />
        </View>
        </>
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
          size={30} 
          color="black" 
          onPress={() => {
            navigation.navigate(status === "authenticated" ? "Profile" : "Login");
            //navigation.navigate("Profile");
          }}
          visible={false}
          style={{ position: 'relative', right: -24, left:-48 }}
        />
      )}
      {titulo !== "Mi Carrito" && (
         <TouchableOpacity
          onPress={() => {
            navigation.navigate("Shopping-Cart");
          }}
          style={{ position: 'relative', left: -24, }}
        >
          <Feather name="shopping-cart" size={30} color="black" />
          <Badge
              size={18}
              style={{
                position: 'absolute',
                top: -6,
                right: -6,
                backgroundColor: 'red',
                justifyContent: 'center',
                alignItems: 'center',
                minWidth: 20,
                height: 20,
                borderRadius: 10
              }}
            >
            {(carrito?.length >= 1 &&
                  carrito
                    .map((item: { cantidad: any }) => item.cantidad)
                    .reduce((prev: any, current: any) => prev + current)) || 0
            }
            </Badge>

             
       </TouchableOpacity>
      )}
    </Appbar.Header>
  );
};
