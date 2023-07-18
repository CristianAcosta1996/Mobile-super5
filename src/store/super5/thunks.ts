import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  guardarSucursal,
} from "../../utils/localstorage";
import { agregarSucursal } from "./super5Slice";

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

    if (compra.urlPaypal) {
      try {
        await AsyncStorage.setItem('compraPaypal', JSON.stringify(compra));
        //Guardar url paypal
        await AsyncStorage.setItem('urlPaypal', JSON.stringify(compra.urlPaypal));
        console.log('Compra guardada');
      } catch (error) {
        console.log('Error al guardar la compra ', error);
      }
    } else {
      console.log('La URL de PayPal no está definida');
    }
  };
};

export const startAgregarSucursal = (
  sucursal: Sucursal
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(agregarSucursal(sucursal));
    guardarSucursal(sucursal);
  };
};