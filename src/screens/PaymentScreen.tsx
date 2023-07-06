import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { event } from 'react-native-reanimated';

export const PaymentScreen = () => {
  const theme = useTheme();
  const [url, setUrl] = useState(null);
  const navigation: any = useNavigation();
  useEffect(() => {
    obtenerCompraGuardada();
  }, []);

  
  const handleWebViewError = (event: any) => {
    console.log('entro en hanle errorrrrrr/////////////////////////////')
    const { url: newUrl } = event;
    if (newUrl?.includes("compra/finalizar-compra")) {
      console.log("go to finalizar compra >>>>>>>>>>>>>");
      // Realizar la acción deseada
      navigation.navigate('FinalizacionCompra');

      // Regresar 'false' para evitar la carga de la URL de destino
      return false;
    }else{ 
      return false;
    }
  };
  const handleWebViewError2 = (event: any) => {
    const { url } = event;
    const newUrl = 'https://www.paypal.com/uy/home';
    event.url = newUrl;
    if (event.url.includes("https://www.paypal.com/uy/home")) {
      console.log("Ready to go to FinalizarCompra");
      
      navigation.navigate('FinalizacionCompra');

      // Regresar 'false' para evitar la carga de la URL de destino
      return false;
    }else{ 
      return true;
    }
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
      {url !== null ? (
        <WebView
          style={styles.webview}
          source={{ uri: url }}
          onError={() => handleWebViewError2(event)}
          onLoadError={() => handleWebViewError2(event)}
          onShouldStartLoadWithRequest={(event) => {
           
            if (event.url.includes("compra/finalizar-compra")) {
              console.log(event.url);
              const newUrl = 'https://www.paypal.com/uy/home';
              event.url = newUrl;
              console.log('-------------------------------------------------------');
              console.log(event.url);
              console.log("go to finalizar compra >>>>>>>>>>>>>");
              // Realizar la acción deseada
              navigation.navigate('FinalizacionCompra');
    
              // Regresar 'false' para evitar la carga de la URL de destino
              return false;
            }
            return false;
    
            // Regresar 'true' para permitir la carga de la URL
            
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
