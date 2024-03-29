import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import MapView from 'react-native-maps';
import { MapaDirection } from './MapaDirectionScreen';
import { useGetUserDataQuery } from "../../../store/super5/super5Api";
import moment from 'moment';
import { useModificarComprador } from "../hooks/useModificarComprador";
import { ActivityIndicator, useTheme } from "react-native-paper";
import { UserDataProps } from "../../../interfaces/interfaces";
import dayjs, { Dayjs } from 'dayjs';
import { useAuth } from "../../../auth/hooks/useAuth";
import RNPickerSelect from 'react-native-picker-select';
import { Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
export const ProfileScreen = () => {
  const { data: userData } = useGetUserDataQuery();

  const {
    dayItems,
    monthItems,
    yearItems,
    handleDayChange,
    handleMonthChange,
    handleYearChange,
    formattedDate,
    selectedDate,
    dateVisible,
    setDateVisible,
    day,
    month,
    year,
  } = useAuth();

  interface FormValues {
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    date: Date | null;
  }

  const initialState: FormValues = {
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    date: null,
  };

  console.log(userData);
  console.log("la fecha",userData?.fechaNacimiento?.toString());

  const [name, setName] = useState<string | undefined>(userData?.nombre);
  const [lastName, setLastName] = useState<string | undefined>(userData?.apellido);

  
  const [editMode, setEditMode] = useState(false);
  const [editMapMode, setEditMapMode] = useState(false);
  const [editDateMode, setEditDateMode] = useState(false);
  const [formValues, setFormValues] = useState(initialState);

  const [currentDateVisible, setCurrentDateVisible] = useState(true);


  const [phone, setPhone] = useState<string | undefined>(userData?.telefono);
  const [email, setEmail] = useState<string | undefined>(userData?.correo);
  const [fechaNac, setFechaNac] = useState((userData?.fechaNacimiento?.toString().slice(0, -19)));
  //const [birthDate, setBirthDate] = useState(formattedBirthDate);
  const [nacimiento, setNacimiento] = useState<Dayjs | null>(dayjs(fechaNac));
  
  const navigation: any = useNavigation();


  useEffect(() => {
    if (userData) {
      setName(userData.nombre);
      setLastName(userData.apellido);
      setPhone(userData.telefono);
      setEmail(userData.correo);
      setNacimiento(dayjs(userData.fechaNacimiento));
    }
  }, [userData]);
  
 

  const { handleModificarComprador } = useModificarComprador();
  
  const handleNameChange = (text: string) => {
    console.log(text);
    setName(text);
  };

  const handleLastNameChange = (text: string) => {
    console.log(text);
    setLastName(text);
  };

  const handleBirthDateChange = (text: string) => {
    setNacimiento(dayjs(text));
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
    setEditDateMode(false);
    setCurrentDateVisible(true);
    const newName = name ?? userData?.nombre;
    const newLastName = lastName?? userData?.apellido;
    const newPhone = phone ?? userData?.telefono;
    const newDate = selectedDate ?? userData?.fechaNacimiento ?? new Date(0);
    console.log('DATOOOOS----------------',newName, newLastName, newPhone, newDate);
      if(newName && newLastName && newPhone && newDate){
        await handleModificarComprador(
          newName, newLastName, newPhone, newDate );
      }else{
        alert('Complete todos los campos');
      }
      // Ningún campo está vacío, puedes llamar a la función handleModificarComprador
      
  };
  const handleCancel = async () => {
    setEditMode(!editMode);
    setCurrentDateVisible(true);
    setEditDateMode(false);

    setName(userData?.nombre);
    setLastName(userData?.apellido);
    setPhone(userData?.telefono);
    setEmail(userData?.correo);
    setNacimiento(dayjs(userData?.fechaNacimiento));
  };

  const handleCancelEditDate = async () => {
    // Cancelar la edicion de la fecha
    setDateVisible(false);
  };
  const handleSaveDate = async () => {
    // Guardar la nueva fecha
    setCurrentDateVisible(false);
    setDateVisible(true);
    setEditDateMode(false);
  };
  
  const handleToggleEditModeDate = () => {
    console.log("dentroooo")
    setCurrentDateVisible(false);
    setDateVisible(true);
    setEditDateMode(false);
  };
//
  return (
    
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mi perfil</Text>
       {editMode &&
        <TouchableOpacity onPress={handleCancel}>
          <Feather name="x-square" size={24} color="black" />
        </TouchableOpacity>
       }
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
          <Feather name="phone" size={20} color="black" />
          {editMode ? (
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={handlePhoneChange}
              keyboardType="phone-pad"
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
        
        <View style={styles.field}>
          <Feather name="calendar" size={20} color="black" />
          {editMode ? (
            <>
              {!editDateMode && currentDateVisible &&
                <Text style={styles.text}>
                  {nacimiento ? nacimiento.format('DD/MM/YYYY') : ''}
                </Text>
              }
              {!currentDateVisible &&
              
              <TextInput
                style={styles.input}
                value={formattedDate}
                onChangeText={(value: string) => {
                  const selectedDate = new Date(value);
                    setFormValues({
                    ...formValues,
                    date: isNaN(selectedDate.getTime()) ? null : selectedDate,
                  });
                }}
                editable={false}
              />
              }


          
          {editDateMode &&
              <TouchableOpacity onPress={() => setEditDateMode(false)}>
                <Feather name="x-square" size={24} color="black" />
              </TouchableOpacity>
          }

              <Text>     </Text>
              <TouchableOpacity onPress={editDateMode ? () => handleSaveDate() : () => setEditDateMode(true)}>
                <Feather name={editDateMode ? "check" : "edit"} size={24} color="black" />
              </TouchableOpacity>
              
           
            </>

          ) : (
            currentDateVisible && (
              <Text style={styles.text}>
               {nacimiento ? nacimiento.format('DD/MM/YYYY') : ''}
              </Text>
            )
                
            
            
          )}
        </View>
        {editDateMode &&
                <View>
                  <RNPickerSelect
                    placeholder={{ label: 'Día', value: '' }}
                    onValueChange={handleDayChange}
                    value={day}
                    items={dayItems}
                  />

                  <RNPickerSelect
                    placeholder={{ label: 'Mes', value: '' }}
                    onValueChange={handleMonthChange}
                    value={month}
                    items={monthItems}
                  />

                  <RNPickerSelect
                    placeholder={{ label: 'Año', value: '' }}
                    onValueChange={handleYearChange}
                    value={year}
                    items={yearItems}
                  />
              {/*
              <Text>Fecha seleccionada: {selectedDate?.toDateString()}</Text>
              <Text>Fecha formateada: {formattedDate}</Text>
              */}
              <Input
                label="Fecha seleccionada"
                value={formattedDate}
                onChangeText={(value: string) => {
                  const selectedDate = new Date(value);
                  setFormValues({
                    ...formValues,
                    date: isNaN(selectedDate.getTime()) ? null : selectedDate,
                  });
                }}
                style={styles.input}
                editable={false}
              />
                </View>
              }
        
      

      </View>
      <View>
      <TouchableOpacity onPress={() => {navigation.navigate('Direcciones');}}>
        <View style={styles.itemContainer}>
          <Feather name="map-pin" size={24} color="black" />
          <Text style={styles.itemText}>Direcciones</Text>
          <View style={styles.iconContainer}>
            <Feather name="chevron-right" size={24} color="black" />
          </View>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => {navigation.navigate('Pedidos');}}>
        <View style={styles.itemContainer}>
          <Feather name="shopping-bag" size={24} color="black" />
          <Text style={styles.itemText}>Mis Pedidos</Text>
          <View style={styles.iconContainer}>
            <Feather name="chevron-right" size={24} color="black" />
          </View>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => {navigation.navigate('Reclamos');}}>
        <View style={styles.itemContainer}>
          <Feather name="message-square" size={24} color="black" />
          <Text style={styles.itemText}>Mis Reclamos</Text>
          <View style={styles.iconContainer}>
            <Feather name="chevron-right" size={24} color="black" />
          </View>
        </View>
      </TouchableOpacity>
    </View>
      
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
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    marginLeft: 'auto',
  },
  itemText: {
    marginLeft: 10,
    fontSize: 16,
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
