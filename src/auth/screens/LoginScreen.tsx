import * as React from 'react';
import { View, StyleSheet, Image, TextInput, TouchableOpacity, Text } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from 'react';
import { IconButton, useTheme, Modal, ActivityIndicator, Portal } from 'react-native-paper';

//import { AuthContext } from '../../AuthContext';
import { useAuth } from '../hooks/useAuth';
import PopupMessage from '../../components/PopupMessage';

export const LoginScreen = (props: any) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
 // const [startLogin, { isLoading, isSuccess, data }] = useLoginMutation();
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const {
    isAuthenticatingLogin,
    handleLogin,
    isSuccessLogin,
    dataLogin,
   } = useAuth();
   
  //const { handleLogin } = useAuth();
  
  if (isSuccessLogin)
  return (
    <>
      <PopupMessage text="¡Bienvenido!" iconName="thumb-up" />
    </>
  );
  if (isAuthenticatingLogin)
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} color={theme.colors.primary} />
      </View>
    );



  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return(
  <View style={styles.container}>
    <Input
      style={styles.input}
      placeholder='Nombre de usuario'
      leftIcon={
        <Icon
          name='user'
          size={24}
          color='#7e57c2'
        />
      }
    value={username}
    onChangeText={(username) => setUsername(username)}
    />
    <Input
      style={styles.input}
      placeholder='Contraseña'
      
      leftIcon={
        <Icon
          name='lock'
          size={24}
          color='#7e57c2'
        />
        
      }
      secureTextEntry={!showPassword}
      rightIcon={
        <IconButton
          size={24}
          icon={showPassword ? 'eye-off' : 'eye'}
          onPress={handleTogglePasswordVisibility}
        />
      }
      value={password}
      onChangeText={(password) => setPassword(password)}
    />

       
      <TouchableOpacity  onPress={() => { props.navigation.navigate("ForgotPassword"); }} >
        <Text style={styles.textPassword}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      <View>
    <View style={styles.buttonContainer}>
    <TouchableOpacity style={styles.button}  onPress={() => { handleLogin(username, password) }} >
        <Text style={styles.buttonText}>Iniciar sesion</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => { props.navigation.navigate("AltaUser"); }} >
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

    </View>
    
  </View>

  </View>
  
)};





const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
    backgroundColor: '#f2f2f2',
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderColor: '#ccc',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    backgroundColor: '#7e57c2',
    paddingVertical: 8,
    borderRadius: 30,
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  googleButton: {
    alignSelf: 'center',
    borderRadius: 30,
    fontWeight: 'bold',
    marginRight: 10,
    marginTop: 50,
  },
  textPassword: {
    color: '#1A7B9A',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 50,
  },

});
export default LoginScreen;