import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Image, StyleProp, ViewStyle, Alert, Platform, Linking } from "react-native";

import {
  DrawerContentScrollView,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { Button, Divider, Text } from "react-native-paper";

import { AppStack } from "./AppStack";
import { CustomDivider, CustomDividerProps } from "../components/CustomDivider";
import { useAuth } from "../auth/hooks/useAuth";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { startLogout } from "../store/auth/thunks";
import { useNavigation } from "@react-navigation/native";
import ModalDirecciones from "../screens/PerfilUsuario/components/ModalDirecciones";


import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { CompraDTO } from "../interfaces/interfaces";
import { useGetComprasQuery } from "../store/super5/super5Api";
import { useNotifications } from "../hooks/useNotifications";


const DrawerRoot = createDrawerNavigator();

export const customDividerProps: CustomDividerProps = {
  style: {
    width: 250,
  },
  bold: true,
};




export const MenuLateralIzquierdo = () => {
  const { data: compras } = useGetComprasQuery();
  const { registerForPushNotificationsAsync, sendNotificationCompraConfirmada } = useNotifications();
  const [expoPushToken, setExpoPushToken] = useState<string>('');
  const [notification, setNotification] = useState<Notifications.Notification | null>(null);
  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);
  
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token || ''));
  
    notificationListener.current = Notifications.addNotificationReceivedListener((receivedNotification) => {
      setNotification(receivedNotification);
    });
  
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });
  
    // Enviar una notificación cada 10 segundos
  // Variable para almacenar los estados anteriores de las compras
  let estadosAnteriores: { [index: number]: string } = {};
  
  const interval = setInterval(() => {
    console.log('ENTRE AL INTERVALO');
  if (expoPushToken) {
    if (compras) {
      compras.map((compra: CompraDTO, index:number) => {
        // Verificar si el estado actual es diferente al estado anterior
        if (compra.estado !== estadosAnteriores[index]) {
          const estadoActual = compra.estado ?? ''; // Utilizar cadena vacía como valor predeterminado si es undefined
  
          if (estadoActual === 'CONFIRMADO') {
            // El estado de la compra ha cambiado a "CONFIRMADO", realizar acciones
            console.log('La compra', index, 'está confirmada:', compra);
            sendNotificationCompraConfirmada(expoPushToken);
          }else{
            console.log('no compra');
          }
          
          // Actualizar el estado anterior con el estado actual
          estadosAnteriores[index] = estadoActual;
        }
      });
    }
    
  }
  }, 10000);
  
  
  
  
    return () => {
      clearInterval(interval);
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, [expoPushToken]);

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
  

  const {
    isAuthenticatingLogin,
    statusLogin,
    isAuthenticatingRegistro,
    statusRegistro,
    isErrorLogin,
    errorLogin,
    isSuccessLogin,
    isErrorSignup,
    errorSignup,
    isSuccessSignup,
    dataLogin,
    dataSignup,
   } = useAuth();
   const [modalVisible, setModalVisible] = useState(false);
const [selectedDireccion, setSelectedDireccion] = useState('');
  return (
    <DrawerContentScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={styles.container}>
      {modalVisible && (
        <ModalDirecciones
            selectedDireccion={selectedDireccion}
            setSelectedDireccion={setSelectedDireccion}
            visible={true}
            setVisible={setModalVisible} 
            selectedDireccionId={""} 
            setSelectedDireccionId={function (direccion: string): void {
              throw new Error("Function not implemented here.");
            } }  
        />
      )}
        <PrimeraSeccion props = {props}/>
        <CustomDivider
          style={customDividerProps.style}
          bold={customDividerProps.bold}
        />
        <Button
          icon="view-list"
          style={{ width: 250, marginVertical: 25 }}
          mode="contained-tonal"
          onPress={() => {
            setModalVisible(true);
          }}
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
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    Alert.alert(
      'Confirmación',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Cerrar sesión', onPress: handleLogoutConfirm, style: 'destructive' }
      ]
    );
  };
  const handleLogoutConfirm = () => {
    dispatch(startLogout());
    Alert.alert('Cierre de sesión', 'Has cerrado sesión correctamente. Vuelva Pronto :D');
  };
const { status } = useAppSelector(state => state.auth);
  return(
    <View>
    <Image
      source={require("../../assets/imagenSinFondo.png")}
      style={styles.brandLogo}
    />
    {status === "authenticated" ? ( // Verificar si el usuario ha iniciado sesión
      <Button
        mode="contained"
        style={{ width: 250, marginVertical: 25 }}
        onPress={() => {
          handleLogout();
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
  handleOnPress: () => {},
}



const SegundaSeccion = () => {
  const handleAyuda = () => {
    console.log('helppp');
    const phoneNumber = "+1 555 056 3468"; // ver numero
    const message = "Hola..."; 
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Abrir enlace en el navegador
    Linking.openURL(url);
    
    // Abrir enlace en la aplicación de WhatsApp (si está instalada)
    Linking.canOpenURL("whatsapp://send").then(supported => {
      if (supported) {
        Linking.openURL(`whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`);
      } else {
        // WhatsApp no está instalado en el dispositivo
        alert('No tienes Whatsapp instalado en el dispositivo');
      }
    }); 
  };
  const { status } = useAppSelector(state => state.auth);
  const navigation: any = useNavigation();
  const buttons: BtnPropertiesProps[] = [
    {
      ...commonBtnProperties,
      icon: "shopping",
      title: "Mis Pedidos",
      handleOnPress: ()=>{navigation.navigate('Pedidos')} // Ver screen de pedidos
    },
    {
      ...commonBtnProperties,
      icon: "map-search-outline",
      title: "Mis Direcciones",
      handleOnPress: ()=>{navigation.navigate('Direcciones')}
    },
    {
      ...commonBtnProperties,
      icon: "inbox",
      title: "Mis Reclamos",
      handleOnPress: ()=>{navigation.navigate('Reclamos')} 
    },
    {
      ...commonBtnProperties,
      icon: "headset",
      title: "Ayuda",
      handleOnPress: ()=>{handleAyuda()}
    },
    {
      ...commonBtnProperties,
      icon: "information",
      title: "Terminos y condiciones",
    },
  ];
  return (
    <View>
      {status === "authenticated" && (
        <>
          <Button
            icon={buttons[0].icon}
            style={buttons[0].style}
            mode="text"
            contentStyle={buttons[0].contentStyle}
            onPress={buttons[0].handleOnPress}
          >
            {buttons[0].title}
          </Button>
          <Button
            icon={buttons[1].icon}
            style={buttons[1].style}
            mode="text"
            contentStyle={buttons[1].contentStyle}
            onPress={buttons[1].handleOnPress}
          >
            {buttons[1].title}
          </Button>
          <Button
            icon={buttons[2].icon}
            style={buttons[2].style}
            mode="text"
            contentStyle={buttons[2].contentStyle}
            onPress={buttons[2].handleOnPress}
          >
            {buttons[2].title}
          </Button>
        </>
      )}

      {buttons.slice(3).map((btn, index) => (
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
      ))}
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
