import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Input } from 'react-native-elements';
import { Modal, IconButton, useTheme, Portal } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { useAltaMutation } from '../../store/super5/super5Api';

export const AltaUserScreen = (props: any) => {
  const today = moment();
  const theme = useTheme();
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  const [nombre, setNombre] =  React.useState("");
  const [apellido, setApellido] =  React.useState("");
  const [user, setUser] =  React.useState("");
  const [password, setPassword] =  React.useState("");
  const [passwordConfirm, setPasswordConfirm] =  React.useState("");
  const [email, setEmail] =  React.useState("");
  const [telefono, setTelefono] =  React.useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [date, setFecha] =  React.useState("");

  const [startCreate, { isLoading, isSuccess, data }] = useAltaMutation();
  
  const handleCreate = () => {
    startCreate({ 
      nombre: nombre,
      apellido: apellido,
      correo: email,
      contrasenia: password, 
      telefono: telefono,
      usuario: user,
    }).then(
      (resp: any) => {
        console.log(resp);
      }
    );
  };
  if (isLoading)
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} color={theme.colors.primary} />
      </View>
    );
  if (isSuccess)
    return (
    
      <Portal>
        <Modal visible={true} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text>Bienvenido!</Text>
        </Modal>
      </Portal>
    
   );



  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleCalendar = () => {
    setOpen(!open);
  };

  const handleCalendarSelect = (selectedDate: any) => {
    const formattedDate = moment(selectedDate.dateString).format('DD/MM/YYYY');
    setFecha(formattedDate);
    setOpen(false);
  };
    return (
        <ScrollView contentContainerStyle={styles.container}>
                  <View style={styles.container}>
                    
        <Input
          label="Nombre"
          value={nombre}
          onChangeText={setNombre}
          style={styles.input}
        />
        <Input
          label="Usuario"
          value={user}
          onChangeText={setUser}
          style={styles.input}
        />
        <Input
          label="Apellido"
          value={apellido}
          onChangeText={setApellido}
          style={styles.input}
        />
        <Input
          label="Contraseña"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry={!showPassword}
          rightIcon={
            <IconButton
              icon={showPassword ? 'eye-off' : 'eye'}
              onPress={handleTogglePasswordVisibility}
            />
          }
        />
        <Input
          label="Confirmar contraseña"
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
          style={styles.input}
          secureTextEntry={!showPassword}
        />
        <Input
          label="E-email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <Input
          label="Teléfono"
          value={telefono}
          onChangeText={setTelefono}
          style={styles.input}
          keyboardType="phone-pad"
        />
        {open && (
          <Calendar
            onDayPress={handleCalendarSelect}
            style={styles.calendar}
            maxDate={today.format('YYYY-MM-DD')}
            hideExtraDays
            markedDates={date ? { [date]: { selected: true, selectedColor: '#7e57c2' } } : {}}
          />
        )}
        <Input
          label="Fecha de nacimiento"
          style={styles.input}
          value={date}
          editable={false}
          rightIcon={
            <IconButton
              icon="calendar"
              onPress={handleToggleCalendar}
            />
          }
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => { handleCreate() }}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    containerScroll: {
        flex: 1,
    },
    container: {
        justifyContent: 'center',
        paddingHorizontal: 30,
        backgroundColor: '#f2f2f2',
        padding: 16,
    },
    buttonContainer: {
        marginBottom: 10,

    },
    button: {

        backgroundColor: '#7e57c2',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    icon: {
        marginRight: 12,
    },
    input: {
        marginBottom: -8,
    },
    calendarButton: {
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#7e57c2',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 12,
      },
      calendarButtonText: {
        color: '#7e57c2',
        fontSize: 16,
      },
      calendar: {
        marginBottom: 20,
      },
});
export default AltaUserScreen;