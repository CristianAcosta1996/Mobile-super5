import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Input } from 'react-native-elements';
import { Modal, IconButton, useTheme, Portal } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { useAltaMutation } from '../../store/super5/super5Api';
import LoginScreen from './LoginScreen';
import PopupMessage from '../../components/PopupMessage';
import Gif from 'react-native-gif';

const AltaUserScreen = () => {
  const today = moment();
  const theme = useTheme();
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: 'white', padding: 20 };

  const initialState = {
    nombre: "",
    apellido: "",
    user: "",
    password: "",
    passwordConfirm: "",
    email: "",
    telefono: "",
    date: new Date(),
  };

  const [formValues, setFormValues] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);

  const [startCreate, { isLoading, isSuccess, data }] = useAltaMutation();

  const handleCreate = () => {
    startCreate({
      nombre: formValues.nombre,
      apellido: formValues.apellido,
      correo: formValues.email,
      contrasenia: formValues.password,
      telefono: formValues.telefono,
      usuario: formValues.user,
      fechaNacimiento: formValues.date.getTime()
    }).then(
      (resp: any) => {
        console.log(resp);
        setFormValues(initialState); // Restablecer los valores del formulario a su estado inicial
      }
    );
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleCalendar = () => {
    setOpen(!open);
  };

  const handleCalendarSelect = (selectedDate: any) => {
    const formattedDate = moment(selectedDate.dateString).toDate(); // Convertir la cadena de texto a un objeto Date
    setFormValues({ ...formValues, date: formattedDate });
    setOpen(false);
  };

  if (isLoading)
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} color={theme.colors.primary} />
        <Gif
            source={require('../../../assets/loading.gif')}
            style={{ width: 200, height: 200 }}
            resizeMode="cover"
        />
      </View>
    );

  if (isSuccess)
    return (
      <>
        <PopupMessage text="¡Usuario registrado con éxito!" iconName="check" />
        <LoginScreen />
      </>
    );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>

        <Input
          label="Nombre"
          value={formValues.nombre}
          onChangeText={(value: string) => setFormValues({ ...formValues, nombre: value })}
          style={styles.input}
        />
        <Input
          label="Usuario"
          value={formValues.user}
          onChangeText={(value: string) => setFormValues({ ...formValues, user: value })}
          style={styles.input}
        />
        <Input
          label="Apellido"
          value={formValues.apellido}
          onChangeText={(value: string) => setFormValues({ ...formValues, apellido: value })}
          style={styles.input}
        />
        <Input
          label="Contraseña"
          value={formValues.password}
          onChangeText={(value: string) => setFormValues({ ...formValues, password: value })}
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
          value={formValues.passwordConfirm}
          onChangeText={(value: string) => setFormValues({ ...formValues, passwordConfirm: value })}
          style={styles.input}
          secureTextEntry={!showPassword}
        />
        <Input
          label="E-email"
          value={formValues.email}
          onChangeText={(value: string) => setFormValues({ ...formValues, email: value })}
          style={styles.input}
        />
        <Input
          label="Teléfono"
          value={formValues.telefono}
          onChangeText={(value: string) => setFormValues({ ...formValues, telefono: value })}
          style={styles.input}
          keyboardType="phone-pad"
        />
        {open && (
          <Calendar
            onDayPress={handleCalendarSelect}
            style={styles.calendar}
            maxDate={today.format('DD-MM-YYYY')}
            hideExtraDays
            markedDates={formValues.date ? { [moment(formValues.date).format('YYYY-MM-DD')]: { selected: true, selectedColor: '#7e57c2' } } : {}}
          />

        )}
        <Input
          label="Fecha de nacimiento"
          style={styles.input}
          value={moment(formValues.date).format('DD-MM-YYYY')}
          editable={false}
          rightIcon={
            <IconButton
              icon="calendar"
              onPress={handleToggleCalendar}
            />
          }
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleCreate}>
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