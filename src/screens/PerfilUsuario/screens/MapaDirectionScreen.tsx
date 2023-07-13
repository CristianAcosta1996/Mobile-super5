// v2.66
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, TextInput, Modal, ScrollView, SafeAreaView, Alert } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { useAltaDirMutation, useGetSucursalesQuery } from '../../../store/super5/super5Api';
import { useGetDireccionesQuery } from "../../../store/super5/super5Api";
import { useEliminarDireccion } from "../hooks/useEliminarDireccion";

export const MapaDirection = (props: any) => {
  
  const { handleEliminarDireccion } = useEliminarDireccion();
  const [startCreate, { isLoading, isSuccess, data }] = useAltaDirMutation();

  const { data: sucursales } = useGetSucursalesQuery();
  const [address, setAddress] = useState("");
  const [addresses, setAddresses] = useState<string[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [editInputMode, setEditInputMode] = useState(true);
  const [editMapMode, setEditMapMode] = useState(false);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<string>("");

  const [dir, setDir] = useState("");
  const [ciud, setCiud] = useState("");
  const [dept, setDept] = useState("");
  const [aclar, setAclar] = useState("");
  const [long, setLong] = useState<Number | undefined>();
  const [lat, setLat] = useState<Number | undefined>();

  const handleAddressChange = (text: string) => {
    setSelectedAddress(text);
  };

  

  const handleEditAddress = (index: number) => {
    alert('Esta funcion no se ha implementado aun');
    /*
    setEditInputMode(editInputMode? editInputMode : !editInputMode);
    setSelectedAddressIndex(index);
    setSelectedAddress(addresses[index]);
    */
  };

  const handleCreate = () => {
    console.log(long);
    startCreate({
      direccion: dir,
      ciudad: ciud,
      departamento: dept,
      longitud: long,
      latitud: lat,
      aclaracion: aclar,
    })
      .then((resp: any) => {
        if (resp) {
          alert(`Dirección agregada con éxito!`);
          refetchDirecciones(); // Actualizar los datos después de agregar una nueva dirección
        }
        console.log(resp);
      })
      .catch((error: any) => {
        console.log('Error al agregar la dirección:', error);
      });
  };
  
  const handleSaveAddress = () => {
   
    /*if (selectedAddressIndex !== null && selectedAddress.trim() !== "") {
      const updatedAddresses = [...addresses];
      updatedAddresses[selectedAddressIndex] = selectedAddress.trim();
      setAddresses(updatedAddresses);
      setSelectedAddressIndex(null);
      setSelectedAddress("");
      
    }
    
    setEditInputMode(!editInputMode? editInputMode : !editInputMode);
    */
  };

  const handleCancelEditAddress = () => {
    setSelectedAddressIndex(null);
    setSelectedAddress("");
  };
  
  const handleToggleEditMode = () => {
    console.log('2');
    setEditInputMode(!editInputMode);
    setEditMode(!editMode);
    setSelectedAddressIndex(null);
    setSelectedAddress("");
    setEditMapMode(!editMapMode);
  };

  const getReverseGeocoding = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();

      const direccionlarga = data.display_name;
      console.log('Dirección:', direccionlarga);
      setSelectedAddress(direccionlarga);
     
      const city = data.address.city || data.address.town || data.address.village || "";
      const state = data.address.state || "";
      const { lat, lon } = data;

        setDir(direccionlarga);
        setCiud(city);
        setDept(state);
        setLong(lon);
        setLat(lat);
      console.log('Dirección:', direccionlarga);
      console.log('Ciudad:', city);
      console.log('Departamento:', state);
      console.log('Latitud:', lat);
      console.log('Longitud:', lon);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const [draggableMarkerCoord, setDraggableMarkerCoord] = useState({
    longitude: -56.1645,
    latitude: -34.9011
  });

  const [region, setRegion] = useState({
    latitude: -34.9011,
    longitude: -56.1645,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const onMarkerDragEnd = (e: any) => {
    const { longitude, latitude } = e.nativeEvent.coordinate;
    setDraggableMarkerCoord({ longitude, latitude });
    getReverseGeocoding(latitude, longitude);
  };

  const onRegionChangeComplete = (newRegion: any) => {
    setRegion(newRegion);
    setDraggableMarkerCoord(newRegion);
    getReverseGeocoding(newRegion.latitude, newRegion.longitude);
  };


  const useFetchDirecciones = () => {
    const { data: direcciones, refetch } = useGetDireccionesQuery();
  
    return {
      direcciones,
      refetchDirecciones: refetch,
    };
  };

  const { direcciones, refetchDirecciones } = useFetchDirecciones();
  
  const handleDeleteAddress = (index: number) => {
    if (direcciones && direcciones.length > index) {
      console.log("Eliminando...............");
      const direccion = direcciones[index]; // Obtener la dirección correspondiente al índice
      console.log("Eliminando este id: ",index);
      console.log("Eliminando este id: ",index);
      Alert.alert(
        'Confirmación',
        '¿Estás seguro de que deseas eliminar esta dirección?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Eliminar', onPress: () => handleEliminarDireccion(
            direccion.id,
            direccion.direccion,
            direccion.ciudad,
            direccion.departamento,
            direccion.longitud,
            direccion.latitud,
            direccion.aclaracion,
            true
          ), style: 'destructive' }
        ]
      );

    }
  };



  const handleAddAddress = async () => {
    if (selectedAddress.trim() !== "") {
      setAddresses([...addresses, selectedAddress]);
      setSelectedAddress("");
      console.log('antes del alta');
      console.log(aclar);
      await handleCreate();
      setAclar("");
  
      refetchDirecciones();
    }
  };
  
  if (!direcciones) {
    // Si direcciones es undefined, muestra algún mensaje de carga o manejo de estado
    return null;
  }console.log(direcciones);
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mis direcciones</Text>
        <TouchableOpacity onPress={handleToggleEditMode}>
          <Feather name={editMode ? "check" : "edit" } size={24} color="black" />
        </TouchableOpacity>
      </View>
      
      <SafeAreaView style={styles.scrollContainer}>
        <ScrollView contentContainerStyle={styles.fieldContainer}>
        {direcciones.length > 0 && (
          <View style={styles.field}>
            <Feather name="map-pin" size={20} color="black" />
            <Text style={styles.label}>Direcciones</Text>
          </View>
        )}
        {direcciones.length > 0 ? (
          direcciones.map((direcciones, index) => (
            <View style={styles.field} key={index}>
              <Feather name="map-pin" size={20} color="black" />
              {selectedAddressIndex === index && editMode ? (
                <>
                  <TextInput
                    style={[styles.input, { flex: 1 }]}
                    value={selectedAddress}
                    onChangeText={handleAddressChange}
                  />
                  <TouchableOpacity onPress={handleSaveAddress}>
                    <Feather name="check" size={20} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleCancelEditAddress}>
                    <Feather name="x" size={20} color="black" />
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text style={styles.text}>{direcciones.direccion}</Text>
                  {editMode && (
                    <View style={{ flexDirection: "row", marginLeft: 'auto' }}>
                      <TouchableOpacity onPress={() => handleEditAddress(index)}>
                        <Feather name="edit" size={20} color="black" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{ marginLeft: 20 }}
                        onPress={() => handleDeleteAddress(index)}
                      >
                        <Feather name="trash" size={20} color="black" />
                      </TouchableOpacity>
                    </View>
                  )}
                </>
              )}
            </View>
          ))
        ) : (
          <Text>No tienes direcciones ingresadas</Text>
        )}
        {editMode &&(
          <View style={styles.field}>
             {!editInputMode &&   
             <TextInput
              style={styles.input}
              value={selectedAddress}
              onChangeText={handleAddressChange}
              editable={false}
              placeholder="Dirección"
            />}
              {!editInputMode &&
             <TextInput
              style={styles.input}
              value={aclar}
              onChangeText={setAclar}
              placeholder="Aclaracion (op)"
            />}
            {!editInputMode &&
            <TouchableOpacity onPress={handleAddAddress}>
              <Feather name="plus" size={20} color="black" />
            </TouchableOpacity>
            }
          </View>
        )}
              </ScrollView>
      </SafeAreaView>
      {editMapMode && (
        <View style={{ flex: 1 }}>
          <MapView
            style={styles.map}
            region={region}
            onRegionChangeComplete={onRegionChangeComplete}
          >
            <Marker
              coordinate={draggableMarkerCoord}
              draggable
              onDragEnd={onMarkerDragEnd}
            />
             {sucursales?.map((sucursal) => (
                <Marker
                  key={sucursal.nombre}
                  coordinate={{ latitude: +sucursal.direccion.latitud, longitude: +sucursal.direccion.longitud }}
                  icon={{ uri: 'https://cdn.discordapp.com/attachments/1086451309487587421/1113673314997645333/super5markerWhite42.png' }}
                />
              ))}
          </MapView>
        </View>
      )}

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
  fieldContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  field: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
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

export default MapaDirection;