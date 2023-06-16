import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  agregarProductoAlCarrito,
  limpiarCarrito,
  quitarProductoDelCarrito,
  realizarCompraPaypal,
} from "../../store/super5/thunks";
import {
  CarritoDto,
  CarritoItem,
  Producto,
} from "../../interfaces/interfaces";
import { CompraDTO } from "../../interfaces/interfaces";

import { useGenerarCompraPaypalMutation } from "../../store/super5/super5Api";
import { useNavigation } from "@react-navigation/native";

export const useCarrito = () => {
  const navigation: any = useNavigation();
  const [open, setOpen] = useState(false);
  const [precioTotalCarrito, setPrecioTotalCarrito] = useState<number>(0);
  const dispatch = useAppDispatch();

  const { carrito } = useAppSelector((state) => state.super5);
  const [startCompraPaypal, { data }] = useGenerarCompraPaypalMutation();
  const { sucursal } = useAppSelector((state) => state.super5);

  useEffect(() => {
    if (carrito.length === 0) {
      setPrecioTotalCarrito(0);
      return;
    }
    setPrecioTotalCarrito(calcularPrecioTotalCarrito());
  }, [carrito]);

  const handleOnClose = () => {
    setOpen(!open);
  };

  const agregarItemAlCarrito = (producto: Producto, cantidad: number) => {
    const carritoItem: CarritoItem = { producto, cantidad };
    dispatch(agregarProductoAlCarrito(carritoItem));
  };

  const quitarItemDelCarrito = (producto: Producto) => {
    dispatch(quitarProductoDelCarrito(producto));
  };

  const limpiarElCarrito = () => {
    dispatch(limpiarCarrito());
  };

  const calcularPrecioTotalCarrito = (): number => {
    let contador = 0;
    carrito.forEach((carritoItem) => {
      const precio = carritoItem.producto.aplicaDescuento
        ? carritoItem.producto.precioDescuento ?? 0
        : carritoItem.producto.precio ?? 0;
      contador += precio * carritoItem.cantidad;
    });
    return contador;
  };
  
  

  const handlePagarCompra = (): void => {
    let arregloCompra: CarritoDto[] = [];
    carrito.forEach(({ producto, cantidad }) => {
      arregloCompra.push({ producto_id: +producto.id, cantidad });
    });
    console.log(arregloCompra);
    const compra: CompraDTO = {
      carrito: arregloCompra,
      formaEntrega: "SUCURSAL",
      sucursal_id: +sucursal.id,
    };
    console.log('sucursal: ', sucursal.id);
    console.log(compra);
    startCompraPaypal(compra).then((resp: any) => {
      console.log('compra dentro de startCompraPaypal: ', compra);
      console.log('respuesta: ', resp.data);
      dispatch(realizarCompraPaypal({compra: resp.data}));
      navigation.navigate("Payment");
    });
  };

  return {
    open,
    handleOnClose,
    agregarItemAlCarrito,
    quitarItemDelCarrito,
    limpiarElCarrito,
    calcularPrecioTotalCarrito,
    precioTotalCarrito,
    handlePagarCompra,
  };
};