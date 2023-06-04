// v2.66
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, TextInput, Modal } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { useAltaDirMutation } from '.././store/super5/super5Api';
import { ActivityIndicator } from "react-native-paper";
import theme from "react-native-elements/dist/config/theme";

export const MapaDirection = (props: any) => {
  const [startCreate, { isLoading, isSuccess, data }] = useAltaDirMutation();
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

  const handleAddAddress = () => {
    if (selectedAddress.trim() === "") {
      //setEditMapMode(!editMapMode ? !editMapMode : editMapMode);
    } else {
      setAddresses([...addresses, selectedAddress]);
      setSelectedAddress("");
      console.log('antes del alta');
      console.log(aclar);
      handleCreate();
      setAclar("");
      //setEditMapMode(!editMapMode);
    }
  };

  const handleDeleteAddress = (index: number) => {
    const updatedAddresses = [...addresses];
    updatedAddresses.splice(index, 1);
    setAddresses(updatedAddresses);
    setSelectedAddressIndex(null);
  };

  const handleEditAddress = (index: number) => {
    console.log('este');
    setEditInputMode(editInputMode? editInputMode : !editInputMode);
    setSelectedAddressIndex(index);
    setSelectedAddress(addresses[index]);
    //setEditMapMode(!editMapMode ? !editMapMode : editMapMode);
  };

  


  const handleCreate = () => {
    startCreate({ 
      direccion : dir,
      ciudad: ciud,
      departamento: dept,
      longitud: long,
      latitud: lat,
      aclaracion: aclar,
    }).then(
      (resp: any) => {
        console.log(resp);
      }
    );
    console.log('xxxxxxx')
  };
  const handleSaveAddress = () => {
    if (selectedAddressIndex !== null && selectedAddress.trim() !== "") {
      const updatedAddresses = [...addresses];
      updatedAddresses[selectedAddressIndex] = selectedAddress.trim();
      setAddresses(updatedAddresses);
      setSelectedAddressIndex(null);
      setSelectedAddress("");
      
    }
    handleCreate();
    setEditInputMode(!editInputMode? editInputMode : !editInputMode);
    //setEditMapMode(editMapMode && !editMapMode);
  };

  const handleCancelEditAddress = () => {
    setSelectedAddressIndex(null);
    setSelectedAddress("");
    //setEditMapMode(editMapMode);
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
        setLong(long);
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

  const handleSetAddress = (latitude: number, longitude: number) => {
    setDraggableMarkerCoord({ longitude, latitude });
    console.log("Dirección establecida:", draggableMarkerCoord);
    getReverseGeocoding(latitude, longitude);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mis direcciones</Text>
        <TouchableOpacity onPress={handleToggleEditMode}>
          <Feather name={editMode ? "check" : "edit" } size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.fieldContainer}>
        {addresses.length > 0 && (
          <View style={styles.field}>
            <Feather name="map-pin" size={20} color="black" />
            <Text style={styles.label}>Direcciones</Text>
          </View>
        )}
        {addresses.length > 0 ? (
          addresses.map((address, index) => (
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
                  <Text style={styles.text}>{address}</Text>
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
      </View>
      {editMapMode && <View style={{ flex: 1 }}>
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
      </MapView>
      </View>}

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
