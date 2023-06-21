// v2.66
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, TextInput, Modal, ScrollView, SafeAreaView, Alert } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { DataTable } from 'react-native-paper';
import { useCancelarCompraMutation, useGetComprasQuery } from '../../../store/super5/super5Api';
import { useGetDireccionesQuery } from "../../../store/super5/super5Api";
import { CarritoItem, CompraDTO, Direccion, Producto } from "../../../interfaces/interfaces";
import ModalReclamos from '../components/ModalReclamos';
import moment from "moment";


export const PedidosScreeen = (props: any) => {
  const [editMode, setEditMode] = useState(false);
  const [editInputMode, setEditInputMode] = useState(true);
  const [editMapMode, setEditMapMode] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [idCompra, setIdCompra] = useState<number | undefined>(undefined);
  const handleReclamo = (id_compra?: number) => {
    console.log('reclamo');
    setModalVisible(true); // Establecer el estado de la visibilidad del modal
    setIdCompra(id_compra); // Establecer el estado del id_compra
  };
  const [startCancelarCompra] = useCancelarCompraMutation();

  const { data: compras } = useGetComprasQuery();
  
  if (!compras) {
    return null;
  }console.log(compras);
  
  const handleCancelarCompra = (compra: CompraDTO) => {
    startCancelarCompra(compra)
      .unwrap()
      .then(() => Alert.alert("Compra cancelada con éxito"))
      .catch(() => Alert.alert("Solo puede cancelar compras en estado PAGO"));
  }
  


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
                    
                    <TouchableOpacity
                        onPress={() => handleReclamo(compra.id)} 
                    >
                        <Feather name="alert-triangle" size={24} color="black" />
                    </TouchableOpacity>
                  {compra.estado === "PAGO" && 
                    <TouchableOpacity
                    onPress={() => handleCancelarCompra(compra)} 
                    >
                      <Feather name="x-circle" size={24} color="red" />
                    </TouchableOpacity>  
                  }
                  
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
      {modalVisible &&  <ModalReclamos visible={modalVisible} setVisible={setModalVisible} idCompra={idCompra} />}
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
