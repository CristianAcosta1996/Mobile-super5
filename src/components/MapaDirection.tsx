import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, TextInput } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from "@react-navigation/native";

export const MapaDirection = () => {

  const [address, setAddress] = useState("");
  const [addresses, setAddresses] = useState<string[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [editMapMode, setEditMapMode] = useState(false);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number | null>(null);

  const navigation = useNavigation();

  const handleAddressChange = (text: string) => {
    setAddress(text);
  };

  const handleAddAddress = () => {
    if (address.trim() === "") {
      setEditMapMode(!editMapMode ? !editMapMode : editMapMode);
      //setAddress();
    } else {
      setAddresses([...addresses, address]);
      setAddress("");
      setEditMapMode(!editMapMode);
    }
  };

  const handleDeleteAddress = (index: number) => {
    const updatedAddresses = [...addresses];
    updatedAddresses.splice(index, 1);
    setAddresses(updatedAddresses);
    setSelectedAddressIndex(null);
  };

  const handleEditAddress = (index: number) => {
    setSelectedAddressIndex(index);
    setAddress(addresses[index]);
    setEditMapMode(!editMapMode ? !editMapMode : editMapMode);
  };

  const handleSaveAddress = () => {
    if (selectedAddressIndex !== null && address.trim() !== "") {
      const updatedAddresses = [...addresses];
      updatedAddresses[selectedAddressIndex] = address;
      setAddresses(updatedAddresses);
      setSelectedAddressIndex(null);
      setAddress("");
    }
    setEditMapMode(editMapMode && !editMapMode);
  };

  const handleCancelEditAddress = () => {
    setSelectedAddressIndex(null);
    setEditMapMode(editMapMode);
    setAddress("");
    setEditMapMode(editMapMode && !editMapMode);
  };

  const handleToggleEditMode = () => {
    setEditMode(!editMode);
    setSelectedAddressIndex(null);
    setAddress("");
    setEditMapMode(!editMapMode ? editMapMode : !editMapMode);
  };

  const getReverseGeocoding = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();

      // Procesar la respuesta y obtener la dirección
      const direccionlarga = data.display_name;
      console.log('Dirección:', direccionlarga);
      setAddress(direccionlarga)
      // Lógica adicional para guardar o utilizar la dirección obtenida
      const city = data.address.city || data.address.town || data.address.village || "";
      const state = data.address.state || "";
      const { lat, lon } = data;

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
  };

  const onRegionChangeComplete = (newRegion: any) => {
    setRegion(newRegion);
    setDraggableMarkerCoord(newRegion);
  };

  const handleSetAddress = (latitude: number, longitude: number) => {
    setDraggableMarkerCoord({ longitude, latitude });
    console.log("Dirección establecida:", draggableMarkerCoord);
    getReverseGeocoding(latitude, longitude);
    
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Direcciones </Text>
        <TouchableOpacity onPress={handleToggleEditMode}>
          <Feather name={editMode ? "check" : "edit"} size={24} color="black" />
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
                    value={address}
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
          <Text>No hay direcciones</Text>
        )}
        {editMode && (
          <View style={styles.field}>
            <Feather name="plus-circle" size={20} color="black" />
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={handleAddressChange}
              placeholder="Agregar dirección"
            />
            <TouchableOpacity onPress={handleAddAddress}>
              <Feather name="plus" size={20} color="black" />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => handleSetAddress(draggableMarkerCoord.latitude, draggableMarkerCoord.longitude) }
      >
        <Text style={styles.confirmButtonText}>Confirmar</Text>
      </TouchableOpacity>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={onRegionChangeComplete}
      >
        <Marker
          coordinate={draggableMarkerCoord}
          draggable
          onDragEnd={onMarkerDragEnd}
          onPress={() => handleSetAddress(draggableMarkerCoord.latitude, draggableMarkerCoord.longitude)}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
