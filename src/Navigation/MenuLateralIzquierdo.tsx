import React from "react";
import { StyleSheet, View, Image, StyleProp, ViewStyle } from "react-native";

import {
  DrawerContentScrollView,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { Button, Divider, Text } from "react-native-paper";

import { AppStack } from "./AppStack";
import { CustomDivider, CustomDividerProps } from "../components/CustomDivider";
import { AuthContext } from "../AuthContext";

const DrawerRoot = createDrawerNavigator();

const customDividerProps: CustomDividerProps = {
  style: {
    width: 250,
  },
  bold: true,
};

export const MenuLateralIzquierdo = () => {
  return (
    <DrawerRoot.Navigator
      screenOptions={{ headerShown: false }}
      id="menu-left"
      drawerContent={(props) => <ContenidoDrawer {...props} />}
    >
      <DrawerRoot.Screen component={AppStack} name="Inicio" />
    </DrawerRoot.Navigator>
  );
};

const ContenidoDrawer = (props: any) => {
  return (
    <DrawerContentScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={styles.container}>
        <PrimeraSeccion props = {props}/>
        <CustomDivider
          style={customDividerProps.style}
          bold={customDividerProps.bold}
        />
        <Button
          icon="view-list"
          style={{ width: 250, marginVertical: 25 }}
          mode="contained-tonal"
        >
          Categorias
        </Button>
        <Button
          icon="magnify"
          style={{ width: 250, marginBottom: 25 }}
          mode="contained-tonal"
          onPress={() => {
            props.navigation.navigate("Search");
          }}
        >
          Busqueda
        </Button>

        <CustomDivider
          style={customDividerProps.style}
          bold={customDividerProps.bold}
        />
        <SegundaSeccion />
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            paddingVertical: 10,
            paddingLeft: 5,
          }}
        >
          <Text variant="bodySmall">
            Todos los derechos reservados. Supermercado Super5 2023 / Montevideo
            - Uruguay
          </Text>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const PrimeraSeccion = (props: any) => {
  const { isLoggedIn, setIsLoggedIn } = React.useContext(AuthContext);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  return(
    <View>
    <Image
      source={require("../../assets/imagenSinFondo.png")}
      style={styles.brandLogo}
    />
    {isLoggedIn ? ( // Verificar si el usuario ha iniciado sesión
      <Button
        mode="contained"
        style={{ width: 250, marginVertical: 25 }}
        onPress={() => {
          setIsLoggedIn(false); // Establecer isLoggedIn en false para cerrar sesión
        }}
      >
        Cerrar Sesión
      </Button>
    ) : (
      <Button
        mode="contained"
        style={{ width: 250, marginVertical: 25 }}
        onPress={() => {
          props.props.navigation.navigate("Login");
        }}
      >
        Iniciar Sesión
      </Button>
    )}
  </View>
  )
}




interface BtnPropertiesProps {
  icon?: string;
  style: {
    width: number;
    marginVertical: number;
  };
  contentStyle: StyleProp<ViewStyle>;
  handleOnPress: () => void;
  title?: string;
}
const commonBtnProperties: BtnPropertiesProps = {
  style: {
    width: 200,
    marginVertical: 10,
  },
  contentStyle: {
    justifyContent: "flex-start",
    gap: 8,
  },
  handleOnPress: () => console.log("click"),
};

const buttons: BtnPropertiesProps[] = [
  {
    ...commonBtnProperties,
    icon: "shopping",
    title: "Mis Pedidos",
  },
  {
    ...commonBtnProperties,
    icon: "cards-heart",
    title: "Mis Favoritos",
  },
  {
    ...commonBtnProperties,
    icon: "headset",
    title: "Ayuda",
  },
  {
    ...commonBtnProperties,
    icon: "information",
    title: "Terminos y condiciones",
  },
];

const SegundaSeccion = () => {
  return (
    <View>
      {buttons.map((btn, index) => {
        return (
          <Button
            key={index}
            icon={btn.icon}
            style={btn.style}
            mode="text"
            contentStyle={btn.contentStyle}
            onPress={btn.handleOnPress}
          >
            {btn.title}
          </Button>
          
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 30,
  },
  brandLogo: {
    width: 250,
    height: 80,
    marginBottom: 15,
  },
});
