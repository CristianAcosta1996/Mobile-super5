import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Input } from 'react-native-elements';
import { IconButton, useTheme, Portal } from 'react-native-paper';
import { useAltaMutation } from '../../store/super5/super5Api';
import LoginScreen from './LoginScreen';
import PopupMessage from '../../components/PopupMessage';
import Gif from 'react-native-gif';
import RNPickerSelect from 'react-native-picker-select';
import { format } from 'date-fns';
import { Feather } from '@expo/vector-icons';

const AltaUserScreen = () => {
  interface FormValues {
    nombre: string;
    apellido: string;
    user: string;
    password: string;
    passwordConfirm: string;
    email: string;
    telefono: string;
    date: Date | null;
  }

  const initialState: FormValues = {
    nombre: "",
    apellido: "",
    user: "",
    password: "",
    passwordConfirm: "",
    email: "",
    telefono: "",
    date: null,
  };

  const theme = useTheme();
  const [visible, setVisible] = React.useState(false);

    // Items para Dias
    const dayItems = [];
    for (let i = 1; i <= 31; i++) {
      dayItems.push({ label: i.toString(), value: i.toString() });
    }
  
    // Items para Meses
    /*const monthItems = [];
    for (let i = 1; i <= 12; i++) {
      monthItems.push({ label: i.toString(), value: i.toString() });
    }*/
    const monthItems = [
      { label: 'Enero', value: '1' },
      { label: 'Febrero', value: '2' },
      { label: 'Marzo', value: '3' },
      { label: 'Abril', value: '4' },
      { label: 'Mayo', value: '5' },
      { label: 'Junio', value: '6' },
      { label: 'Julio', value: '7' },
      { label: 'Agosto', value: '8' },
      { label: 'Setiembre', value: '9' },
      { label: 'Octubre', value: '10' },
      { label: 'Noviembre', value: '11' },
      { label: 'Diciembre', value: '12' },
    ];
  
    //  Items para Años con un rango de 95 hasta la actualidad 
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 95;
  
    const yearItems = Array.from({ length: 96 }, (_, index) => {
      const year = startYear + index;
      return { label: year.toString(), value: year.toString() };
    });
  

  const [formValues, setFormValues] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);

  const [day, setDay] = useState<number>(0);
  const [month, setMonth] = useState<number>(0);
  const [year, setYear] = useState<number>(0);

  const handleDayChange = (value: any) => {
    setDay(value);
  };

  const handleMonthChange = (value: any) => {
    setMonth(value);
  };

  const handleYearChange = (value: any) => {
    setYear(value);
  };

  const selectedDate = day && month && year ? new Date(year, month - 1, day) : null;
  const formattedDate = selectedDate ? format(selectedDate, 'dd/MM/yyyy') : '';

  const [dateVisible, setDateVisible] = useState(false);

  const [startCreate, { isLoading, isSuccess, data }] = useAltaMutation();



  const handleCreate = () => {
    startCreate({
      nombre: formValues.nombre,
      apellido: formValues.apellido,
      correo: formValues.email,
      contrasenia: formValues.password,
      telefono: formValues.telefono,
      usuario: formValues.user,
      fechaNacimiento: selectedDate instanceof Date ? selectedDate : null,
    }).then((resp: any) => {
      console.log(resp);
      setDateVisible(true);
      setFormValues(initialState); // Restablecer los valores del formulario a su estado inicial
    });
  };
  

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
        {!dateVisible &&
          <TouchableOpacity onPress={() => setDateVisible(true)} style={styles.calendarButton}>
            <Text style={styles.calendarButtonText}>Fecha de nacimiento</Text>
            <Feather name="calendar" size={20} color="lightblue" style={styles.calendarIcon} />
          </TouchableOpacity>
        }
      </View>

      {dateVisible &&
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

          {selectedDate && (
            <>
              <Text>Fecha seleccionada: {selectedDate.toDateString()}</Text>
              <Text>Fecha seleccionada: {formattedDate}</Text>

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
            </>
          )}
        </View>
      }

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleCreate}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
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
      backgroundColor: '#f2f2f2',
      padding: 16,
    },
    buttonContainer: {
        marginBottom: 10,

    },
    dateContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    label: {
      marginRight: 12,
      width: 70, 
      textAlign: 'right',
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
      flexDirection: 'row',
      alignItems: 'center',
    },
    calendarButtonText: {
      color: 'gray',
      fontWeight: 'bold',
    },
    calendarIcon: {
      color: 'gray',
      marginLeft: 5,
    },
});
export default AltaUserScreen;