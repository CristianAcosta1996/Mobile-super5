import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, useTheme } from 'react-native-paper';

export const PaymentScreen = () => {
  const theme = useTheme();
  const [url, setUrl] = useState(null);
  const navigation: any = useNavigation();
  useEffect(() => {
    obtenerCompraGuardada();
  }, []);

  
  const handleWebViewError = (syntheticEvent: { nativeEvent: any; }) => {
    const { nativeEvent } = syntheticEvent;
    console.warn('Error loading page:', nativeEvent);
  };

  const obtenerCompraGuardada = async () => {
    try {
      const compraGuardada = await AsyncStorage.getItem('compraPaypal');
      if (compraGuardada) {
        const compra = JSON.parse(compraGuardada);
        console.log(compra);
        if (compra.urlPaypal) {
          setUrl(compra.urlPaypal);
        }
      }
    } catch (error) {
      console.log('Error al obtener la compra guardada', error);
    }
  };

  return (
    <View style={styles.container}>
      {url ? (
        <WebView
          style={styles.webview}
          source={{ uri: url }}
          onError={handleWebViewError}
          onNavigationStateChange={(navState) => {
            // Verificar si la URL ha cambiado a la URL de destino después del pago en PayPal
           console.log(navState.url);
            if (navState.url.includes("compra/finalizar-compra")) {
              
            console.log("go to finalizar compra >>>>>>>>>>>>>")
              // Navegar a la pantalla deseada
              navigation.navigate('FinalizacionCompra');
            }
          }}
        />
      ) : (
        <View style={styles.container}>
          <ActivityIndicator animating={true} color={theme.colors.primary} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});


export default PaymentScreen;
