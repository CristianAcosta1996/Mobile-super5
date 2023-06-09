import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';
import {
  CarritoItem,
  CompraDTO,
  Producto,
  Sucursal,
} from "../../interfaces/interfaces";
import {
  quitarProductosAlCarrito,
  resetearCarrito,
  agregarProductosAlCarrito,
  realizarCompraPaypal as realizarCompraPaypalSlice,
} from "./super5Slice";
import {
  guardarCarrito,
  limpiarCarrito as limpiarCarritoStorage,
  guardarcompraPaypal,
  guardarSucursal,
} from "../../utils/localstorage";
import { agregarSucursal } from "./super5Slice";
import { useNavigation } from "@react-navigation/native";
import { Linking } from "react-native";

export const quitarProductoDelCarrito = (
  producto: Producto
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatcher, getState) => {
    dispatcher(quitarProductosAlCarrito(producto));
    guardarCarrito(getState().super5.carrito);
  };
};

export const agregarProductoAlCarrito = (
  producto: CarritoItem
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatcher, getState) => {
    dispatcher(agregarProductosAlCarrito(producto));
    guardarCarrito(getState().super5.carrito);
  };
};

export const limpiarCarrito = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatcher, getState) => {
    dispatcher(resetearCarrito());
    limpiarCarritoStorage();
  };
};

export const realizarCompraPaypal = ({
  compra,
}: {
  compra: CompraDTO;
}): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    console.log('llegueeeee');
    console.log('antes del dispatch', compra);
    dispatch(realizarCompraPaypalSlice(compra));
    console.log('antes del dispatch', compra);
    //await WebBrowser.openBrowserAsync('https://www.google.com.uy/');
    if (compra.urlPaypal) {
      try {
        await AsyncStorage.setItem('compraPaypal', JSON.stringify(compra));
        console.log('Compra guardada');
      } catch (error) {
        console.log('Error al guardar la compra ', error);
      }
      
      
      // Abrir la URL de PayPal en el navegador web 
      await WebBrowser.openBrowserAsync(compra.urlPaypal); // compra.urlPaypal
    } else {
      console.log('La URL de PayPal no está definida');
    }
  };
};
/*--------------------*/
/*
export const realizarCompraPaypal = ({
  compra,
}: {
  compra: CompraDTO;
}): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    console.log('llegueeeee');
    console.log('antes del dispatch', compra);
    dispatch(realizarCompraPaypalSlice(compra));
    console.log('antes del dispatch', compra);

    if (compra.urlPaypal) {
      try {
        await AsyncStorage.setItem('compraPaypal', JSON.stringify(compra));
        console.log('Compra guardada');
      } catch (error) {
        console.log('Error al guardar la compra ', error);
      }

      // Abrir la URL de PayPal en el navegador web
      try {
        await Linking.openURL(compra.urlPaypal);
      } catch (error) {
        console.log('Error al abrir la URL de PayPal', error);
      }

      // Configurar el manejador de enlaces profundos
      const handleDeepLink = (event: { url: string }) => {
        const { url } = event;
        const navigation: any = useNavigation();
        
        // Verificar si el enlace es el enlace de redirección específico
        if (url === 'super5://payment-success') {
          // Redirigir al usuario a la pantalla de éxito de pago
          navigation.navigate('PaymentSuccess');
        }
      };

      // Agregar el manejador de enlaces profundos
      Linking.addEventListener('url', handleDeepLink);

      /* //Retornar una función de limpieza para eliminar el manejador cuando el componente se desmonte
      const unsubscribe = () => {
        Linking.removeEventListener('url', handleDeepLink);
      };*/

      // Redirigir a la pantalla de inicio después de la compra en PayPal
      /*
      const navigateToHome = async () => {
        const navigation: any = useNavigation();
        const storedCompra = await AsyncStorage.getItem('compraPaypal');
        if (storedCompra) {
          const parsedCompra = JSON.parse(storedCompra);
          if (parsedCompra === compra) {
            
            navigation.navigate('Home');
            //unsubscribe();
          }
        }
      };
      const navigation: any = useNavigation();
      // Agregar el manejador para redirigir a la pantalla de inicio
      navigation.addListener('focus', navigateToHome);
    } else {
      console.log('La URL de PayPal no está definida');
    }
  };
};
*/
/*---------------------*/

export const startAgregarSucursal = (
  sucursal: Sucursal
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(agregarSucursal(sucursal));
    guardarSucursal(sucursal);
  };
};