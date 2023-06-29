import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Modal,
  ScrollView,
  SafeAreaView,
  Alert,
  Platform,
} from "react-native";
import { ActivityIndicator, DataTable, useTheme } from "react-native-paper";
import {
  useCancelarCompraMutation,
  useGetComprasQuery,
  useGetProductosQuery,
} from "../../../store/super5/super5Api";
import { CarritoDto, CarritoItem, CompraDTO, Direccion, Producto } from "../../../interfaces/interfaces";
import ModalReclamos from "../components/ModalReclamos";
import ModalShoppingCart from "../components/ModalShoppingCart";
import dayjs from "dayjs";
import CarritoComprasItem from "../components/CarritoComprasItem";

export const PedidosScreeen = (props: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalCartVisible, setModalCartVisible] = useState(false);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [idCompra, setIdCompra] = useState<number | undefined>(undefined);
  const [sucursalID, setSucursalID] = useState<number | undefined>(undefined);
  const [compra, setCompra] = useState<CompraDTO | undefined>(undefined);
  const theme = useTheme();

  const { data: compras, isLoading } = useGetComprasQuery();

  const [startCancelarCompra] = useCancelarCompraMutation();

  const handleReclamo = (id_compra?: number) => {
    console.log("reclamo");
    setModalVisible(true); // Establecer el estado de la visibilidad del modal
    setIdCompra(id_compra); // Establecer el estado del id_compra
  };

  const handleShoppingCart = (id_compra?: number, id_sucursal?: number, compra?: CompraDTO) => {
    console.log("ver carrito");
    setModalCartVisible(true);
    setIdCompra(id_compra); // Establecer el estado del id_compra
    setSucursalID(id_sucursal);
    setCompra(compra);
  };
  

  const handleCancelar = (compra: CompraDTO) => {
    Alert.alert(
      "Confirmación",
      "¿Estás seguro de que deseas cancelar la compra?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Cancelar compra",
          onPress: () => handleCancelarCompra(compra), // Corrección aquí
          style: "destructive",
        },
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
    return (
      <View style={styles.container}>
        <Text>Cargando compras...</Text>
        <ActivityIndicator animating={true} color={theme.colors.primary} />
      </View>
    );
  }

  if (!compras) {
    return <Text>No tienes compras realizadas</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mis Compras</Text>
      </View>

      <SafeAreaView style={styles.scrollContainer}>
        <ScrollView contentContainerStyle={styles.fieldContainer}>
          {compras.length > 0 ? (
            compras.map((compra: CompraDTO, index: number) => (
              <View key={index} style={styles.compraContainer}>
                <View style={styles.field}>
                  <View style={styles.tableRow}>
                  <TouchableOpacity onPress={() => handleReclamo(compra.id)}>
                      <Feather name="alert-triangle" size={24} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleShoppingCart(compra.id, compra.sucursal_id, compra)}>
                      <Feather name="shopping-cart" size={24} color="black" />
                    </TouchableOpacity>

                    {compra.estado === "PAGO" && (
                      <TouchableOpacity onPress={() => handleCancelar(compra)}>
                        <Feather name="x-circle" size={24} color="red" />
                      </TouchableOpacity>
                    )}
                  
                  </View>
                  <View style={styles.tableRow}>
                  <Text style={styles.tableHeader}>Compra #{index + 1}</Text>
                  </View>
                  
                  <View style={styles.tableRow}>
                    <Text style={styles.tableLabel}>ID Compra:</Text>
                    <Text style={styles.tableValue}>{compra.id}</Text>
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
                    <Text style={styles.tableValue}>$ {compra.precio}</Text>
                  </View>

                  <View style={styles.tableRow}>
                    <Text style={styles.tableLabel}>Fecha de compra:</Text>
                    <Text style={styles.tableValue}>
                      {compra.fechaCompra && dayjs(compra.fechaCompra).format('DD/MM/YYYY HH:mm')}
                    </Text>
                  </View>
                  


                  <View style={styles.tableRow}>
                    
                     
                       
                      
                        
                        
                  </View>
                </View>

              </View>
            ))
          ) : (
            <Text>No tienes compras realizadas</Text>
          )}
        </ScrollView>
      </SafeAreaView>
      {modalCartVisible &&
                          <ModalShoppingCart
                            visible={modalCartVisible}
                            setVisible={setModalCartVisible}
                            idSucursal={sucursalID}
                            compraID={idCompra}
                            compra={compra}
                          />
                        }
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
    backgroundColor: "#fff",
  },
  fieldContainer: {
    padding: 20,
  },
  field: {
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 4,
    padding: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
    headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    // Otros estilos adicionales
  },
  compraHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    // Otros estilos adicionales
  },
  compraContainer: {
    marginBottom: 20,
    elevation: 12,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },
  },
  
  tableHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "blue", 
  },
  tableRow: {
    flexDirection: "row",
    marginBottom: 5,
    justifyContent: "space-between",
  },
  tableLabel: {
    fontWeight: "bold",
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
    backgroundColor: "rgba(0, 0, 0, 1)",
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
