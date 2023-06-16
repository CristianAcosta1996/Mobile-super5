import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import MapView from 'react-native-maps';
import { MapaDirection } from '../components/MapaDirection';
import { useGetUserDataQuery } from "../../../store/super5/super5Api";
import moment from 'moment';
import { useModificarComprador } from "../hooks/useModificarComprador";

export const ProfileScreen = () => {
  const { data: userData } = useGetUserDataQuery();

console.log(userData);
console.log(userData?.fechaNacimiento?.toString());
  const [name, setName] = useState(userData?.nombre);
  const [lastName, setLastName] = useState(userData?.apellido);
  const formattedBirthDate = moment(userData?.fechaNacimiento).format('DD/MM/YYYY');
  console.log(formattedBirthDate);
  const [birthDate, setBirthDate] = useState(formattedBirthDate);
  const [phone, setPhone] = useState(userData?.telefono);
  const [email, setEmail] = useState(userData?.correo);

  
  const [editMode, setEditMode] = useState(false);
  const [editMapMode, setEditMapMode] = useState(false);
  
  const { handleModificarComprador } = useModificarComprador();
  
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

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };


  const handleToggleEditMode = () => {
    setEditMode(!editMode);
    setEditMapMode(!editMapMode ? editMapMode: !editMapMode); 
    console.log('En modo edicion');
  };

  const handleSave = async () => {
    setEditMode(!editMode);
    if (name && lastName && phone && birthDate) {
      const parsedBirthDate = new Date(birthDate);
      await handleModificarComprador(name, lastName, phone, parsedBirthDate);
      console.log('Dentro del save!///////////////////////////');
  
      // Volver a obtener los datos del usuario después de guardar
      //const { data: updatedUserData } = useGetUserDataQuery();
      //if (userData) {
        setName(name);
        setLastName(lastName);
        const formattedBirthDate = moment(userData?.fechaNacimiento).format('DD/MM/YYYY');
        setBirthDate(birthDate);
        setPhone(phone);
      //}
    }
  };
  

  return (
    
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mi perfil</Text>
        <TouchableOpacity onPress={editMode ?  handleSave : handleToggleEditMode}>
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
        <View style={styles.field}>
          <Feather name="mail" size={20} color="black" />
          {editMode ? (
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={handleEmailChange}
              editable={false}
            />
          ) : (
            <Text style={styles.text}>{email}</Text>
          )}
        </View>


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
