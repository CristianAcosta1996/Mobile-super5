import React from 'react';
import { Button, View } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

GoogleSignin.configure();

interface GoogleLoginButtonProps {
  onGoogleLogin: (userInfo: object) => void;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onGoogleLogin }) => {
  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // Realiza acciones adicionales después de iniciar sesión con Google
      console.log(userInfo);
      onGoogleLogin(userInfo); // Llama a la función proporcionada por la pantalla principal
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Inicio de sesión cancelado');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('El inicio de sesión ya está en progreso');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Servicios de Play no disponibles o desactualizados');
      } else {
        console.log('Error al iniciar sesión con Google:', error);
      }
    }
  };

  return (
    <View>
      <Button title="Iniciar sesión con Google" onPress={handleGoogleSignIn} />
    </View>
  );
};

export default GoogleLoginButton;
