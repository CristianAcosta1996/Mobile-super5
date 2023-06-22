// v2.66
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, TextInput, Modal, ScrollView, SafeAreaView, Alert, Platform } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { ActivityIndicator, DataTable, useTheme } from 'react-native-paper';
import { useCancelarCompraMutation, useGetComprasQuery } from '../../../store/super5/super5Api';
import { useGetDireccionesQuery } from "../../../store/super5/super5Api";
import { CarritoItem, CompraDTO, Direccion, Producto } from "../../../interfaces/interfaces";
import ModalReclamos from '../components/ModalReclamos';
import moment from "moment";
import * as Notifications from 'expo-notifications';
import * as Device from "expo-device";


export const PedidosScreeen = (props: any) => {
  const [editMode, setEditMode] = useState(false);
  const [editInputMode, setEditInputMode] = useState(true);
  const [editMapMode, setEditMapMode] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [idCompra, setIdCompra] = useState<number | undefined>(undefined);
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const theme = useTheme();

  const { data: compras, error, isLoading } = useGetComprasQuery();
  const [startCancelarCompra] = useCancelarCompraMutation();

 useEffect(() => {
    if (error) {
      Alert.alert("Error al obtener las compras");
    }
  }, [error]);

  const handleReclamo = (id_compra?: number) => {
    console.log("reclamo");
    setModalVisible(true); // Establecer el estado de la visibilidad del modal
    setIdCompra(id_compra); // Establecer el estado del id_compra
  };

  const handleCancelar = (compra: CompraDTO) => {
    Alert.alert(
      'Confirmación',
      '¿Estás seguro de que deseas cancelar la compra?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cancelar compra',
          onPress: () => handleCancelarCompra(compra), // Corrección aquí
          style: 'destructive'
        }
      ]
    );
  };
  
  const handleCancelarCompra = (compra: CompraDTO) => {
    startCancelarCompra(compra)
      .unwrap()
      .then(() => Alert.alert("Compra cancelada con éxito"))
      .catch(() => Alert.alert("Solo puede cancelar compras en estado PAGO"));
  };
  

  if (isLoading) {
    <View style={styles.container}>
      <Text>Cargando compras...</Text>;
      <ActivityIndicator animating={true} color={theme.colors.primary} />
    </View>
  }

  if (!compras) {
    return <Text>No tienes compras realizadas</Text>;
  }
  
   
/*
  useEffect(() => {
    // Función para verificar el estado de la compra y enviar notificación si es "Confirmado"
    const checkCompraEstadoAndSendNotification = (compra: CompraDTO) => {
      if (compra.estado === "CONFIRMADO") {
        if (expoPushToken) {
          sendPushNotification(expoPushToken);
        } else {
          console.log("Expo push token is not available.");
        }
      }
    };

    // Temporizador para consultar el estado de la compra cada cierto tiempo
    const timer = setInterval(() => {
      if (compras) {
        compras.forEach((compra: CompraDTO) => {
          checkCompraEstadoAndSendNotification(compra);
        });
      }
    }, 5000); // Consultar cada 5 segundos (ajusta el tiempo según tus necesidades)

    return () => {
      clearInterval(timer); // Limpiar el temporizador al desmontar el componente
    };
  }, [compras, expoPushToken]);

  useEffect(() => {
    // Registrar el dispositivo para recibir notificaciones
    registerForPushNotificationsAsync().then((expoPushToken) => {
      console.log(expoPushToken);
    });
  }, []);

  // Función para enviar la notificación push
  async function sendPushNotification(expoPushToken: string) {
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "Compra en super 5",
      body: "Hola esto es una notificación de la compra",
      data: { someData: "goes here" },
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  }

  async function registerForPushNotificationsAsync() {
    let token: string | null = null;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
      setExpoPushToken(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }
*/ 


return (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.title}>Mis Compras</Text>
    </View>
    
    <SafeAreaView style={styles.scrollContainer}>
      <ScrollView contentContainerStyle={styles.fieldContainer}>
        {compras.length > 0 ? (
          compras.map((compra: CompraDTO, index) => (
            <View style={styles.field} key={index}>
              <View style={styles.tableRow}>
                <Text style={styles.tableHeader}>Compra #{index + 1}</Text>
                
                <TouchableOpacity onPress={() => handleReclamo(compra.id)}>
                  <Feather name="alert-triangle" size={24} color="black" />
                </TouchableOpacity>
                
                {compra.estado === "PAGO" && (
                  <TouchableOpacity onPress={() => handleCancelar(compra)}>
                    <Feather name="x-circle" size={24} color="red" />
                  </TouchableOpacity>
                )}
              </View>
              
              <View style={styles.tableRow}>
                <Text style={styles.tableLabel}>Forma de entrega:</Text>
                <Text style={styles.tableValue}>{compra.formaEntrega}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableLabel}>Estado:</Text>
                <Text style={styles.tableValue}>{compra.estado}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableLabel}>Precio:</Text>
                <Text style={styles.tableValue}>{compra.precio}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableLabel}>Fecha de compra:</Text>
                <Text style={styles.tableValue}>{compra.fechaCompra?.toString()}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text>No tienes compras realizadas</Text>
        )}
      </ScrollView>
    </SafeAreaView>
    
    {modalVisible && <ModalReclamos visible={modalVisible} setVisible={setModalVisible} idCompra={idCompra} />}
  </View>
);

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  scrollContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fieldContainer: {
    padding: 20,
  },
  field: {
    marginBottom: 20,
  },
  tableHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: 5,
    justifyContent: 'space-between',
  },
  tableLabel: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  tableValue: {
    flex: 1,
  },
  containerModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    flex: 1,
    marginLeft: 10,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  text: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  confirmButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ccc",
    paddingVertical: 10,
    marginHorizontal: 16,
    marginVertical: 20,
    borderRadius: 4,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  map: {
    flex: 1,
  },
});

export default PedidosScreeen;
