import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import MapView from 'react-native-maps';
import { MapaDirection } from '../components/MapaDirection';
import { SafeAreaView } from "react-native-safe-area-context";



export const ProfileScreen = () => {
  const [name, setName] = useState("El nombre");
  const [lastName, setLastName] = useState("el apellido");
  const [birthDate, setBirthDate] = useState("01/01/1990");
  const [phone, setPhone] = useState("1234567890");
  const [address, setAddress] = useState("");
  const [addresses, setAddresses] = useState<string[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [editMapMode, setEditMapMode] = useState(false);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number | null>(null);

  const handleNameChange = (text: string) => {
    setName(text);
  };

  const handleLastNameChange = (text: string) => {
    setLastName(text);
  };

  const handleBirthDateChange = (text: string) => {
    setBirthDate(text);
  };

  const handlePhoneChange = (text: string) => {
    setPhone(text);
  };

  const handleAddressChange = (text: string) => {
    setAddress(text);
  };

  const handleAddAddress = () => {
    if(address.trim() === ""){
      console.log('yes');
      setEditMapMode(!editMapMode ? !editMapMode : editMapMode);
    }
    if (address.trim() !== "") {
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
    setEditMapMode(!editMapMode ? editMapMode: !editMapMode); 
  };

  return (
    
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>User Profile</Text>
        <TouchableOpacity onPress={handleToggleEditMode}>
          <Feather name={editMode ? "check" : "edit"} size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.fieldContainer}>
        <View style={styles.field}>
          <Feather name="user" size={20} color="black" />
          {editMode ? (
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={handleNameChange}
            />
          ) : (
            <Text style={styles.text}>{name}</Text>
          )}
        </View>
        <View style={styles.field}>
          <Feather name="user" size={20} color="black" />
          {editMode ? (
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={handleLastNameChange}
            />
          ) : (
            <Text style={styles.text}>{lastName}</Text>
          )}
        </View>
        <View style={styles.field}>
          <Feather name="calendar" size={20} color="black" />
          {editMode ? (
            <TextInput
              style={styles.input}
              value={birthDate}
              onChangeText={handleBirthDateChange}
            />
          ) : (
            <Text style={styles.text}>{birthDate}</Text>
          )}
        </View>
        <View style={styles.field}>
          <Feather name="phone" size={20} color="black" />
          {editMode ? (
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={handlePhoneChange}
            />
          ) : (
            <Text style={styles.text}>{phone}</Text>
          )}
        </View>
        {addresses.length > 0 && (
          <View style={styles.field}>
            <Feather name="map-pin" size={20} color="black" />
            <Text style={styles.label}>Direcciones</Text>
          </View>
        )}
        {addresses.map((address, index) => (
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
        ))}

      </View>
      <MapaDirection/>
    </View>
    

    
   

    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  fieldContainer: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    padding: 10,
  },
  field: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default ProfileScreen;
