import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  CarritoItem,
  CompraDTO,
  Sucursal,
  Token,
} from "../interfaces/interfaces";

export const getToken = () => {
  try {
    let token;
    AsyncStorage.getItem('token', (resp) => {
      token = resp;
    });
    if (!token) return undefined;

    const decoded: Token = jwt_decode(token);

    const { sub, iat, exp, ...rest } = decoded;
    return {
      ...rest,
      token,
    };
  } catch (error) {
    console.log('Error al obtener el token:', error);
    return undefined;
  }
};

export const limpiarToken = () => {
  AsyncStorage.removeItem('token');
};

export const setToken = (token: string) => {
  try {
    AsyncStorage.setItem('token', JSON.stringify(token), (error) => {
      if (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const limpiarStorage = () => {
  localStorage.clear();
};

export const guardarSucursal = (sucursal: Sucursal): void => {
  AsyncStorage.setItem('sucursal', JSON.stringify(sucursal), (error) => {
    if (error) {
      console.log(error);
    }
  });
};

export const obtenerSucursalStorage = (): Sucursal | undefined => {
  try {
    let sucursal
    AsyncStorage.getItem('sucursal', (resp) => {
      sucursal = resp;
    });
    if (sucursal) {
      return JSON.parse(sucursal);
    } else {
      return undefined;
    }
  } catch (error) {
    console.log('Error al obtener la sucursal:', error);
    return undefined;
  }
};

export const guardarCarrito = (carrito: CarritoItem[]) => {
  try {
    AsyncStorage.setItem('carrito', JSON.stringify(carrito), (error) => {
      if (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const obtenerCarritoStorage = (): CarritoItem[] | undefined => {
  try {
    let carrito;
    AsyncStorage.getItem('carrito', (resp) => {
      carrito = resp;
    });
    if (carrito) {
      return JSON.parse(carrito);
    } else {
      return undefined;
    }
  } catch (error) {
    console.log('Error al obtener el carrito:', error);
    return undefined;
  }
};
export const limpiarCarrito = () => {
  try {
    AsyncStorage.removeItem('carrito');
  } catch (error) {
    console.log(error);
  }
};

export const guardarcompraPaypal = (compraPaypal: CompraDTO) => {
  try {
    AsyncStorage.setItem('compraPaypal', JSON.stringify(compraPaypal), (error) => {
      if (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const obtenerCompraPaypal = () => {
  try {
    let compraPaypal;
    AsyncStorage.getItem('compraPaypal', (resp) => {
      compraPaypal = resp;
    });
    if (compraPaypal) {
      return JSON.parse(compraPaypal);
    } else {
      return undefined;
    }
  } catch (error) {
    console.log('Error al obtener la compra de PayPal:', error);
    return undefined;
  }
};