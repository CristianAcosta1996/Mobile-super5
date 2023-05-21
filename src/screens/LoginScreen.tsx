import * as React from 'react';
import { View, StyleSheet, Image, TextInput, TouchableOpacity, Text } from 'react-native';
import { Input, Button, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useEffect, useState } from 'react';
import { IconButton } from 'react-native-paper';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
//import Google from 'expo-google-app-auth';

WebBrowser.maybeCompleteAuthSession()

export const LoginScreen = (props: any) => {
  return (
    <View style={styles.container}>
      <PrimeraSeccion props={props} />
      <SegundaSeccion props={props} />
    </View>
  );
};
const PrimeraSeccion = (props: any) => {

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return(
  <View>
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
    //value={}
    //onChangeText={setUsername}
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
      //value={}
      //onChangeText={setUsername}
    />

       
      <TouchableOpacity  onPress={() => { props.props.navigation.navigate("ForgotPassword"); }} >
        <Text style={styles.textPassword}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>


  </View>
)};
const SegundaSeccion = (props: any) => {
  const [accessToken, setAccessToken] = useState('');
  const [user, setUser] =  useState<any | null>('');
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    androidClientId: "638964535088-j4p9bqehns5miunqcil5b0hg1dsnsuir.apps.googleusercontent.com",
    expoClientId: "638964535088-j4p9bqehns5miunqcil5b0hg1dsnsuir.apps.googleusercontent.com"
  });

  useEffect(() => {
    if (response?.type === "success" && response.authentication) {
      let valor = response.authentication.accessToken;
      setAccessToken(valor);
    }
  }, [response]);

  useEffect(() => {
    if (accessToken) {
      fetchUserInfo();
    }
  }, [accessToken]);

  async function fetchUserInfo() {
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const useInfo = await response.json();
    setUser(useInfo);
  }

  const ShowUserInfo = () => {
    if (user) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 35, fontWeight: 'bold', marginBottom: 20 }}>Welcome</Text>
        </View>
      );
    } else {
      return null; // Devuelve null cuando user es null
    }
  }
return(
  <View>
    <View style={styles.buttonContainer}>
    <TouchableOpacity style={styles.button} onPress={() => { props.props.navigation.navigate("IniciarSesion"); }} >
        <Text style={styles.buttonText}>Iniciar sesion</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => { props.props.navigation.navigate("AltaUser"); }} >
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

    </View>
    <View>
    <TouchableOpacity
          style={styles.googleButton}
          disabled={!request}
          onPress={() => {
            promptAsync();
            }} 
        >
           <FontAwesome name="google" size={20} />
          <Text>Login with Google</Text>
        </TouchableOpacity>
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