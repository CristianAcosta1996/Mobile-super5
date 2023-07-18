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
  PromocionDTO,
} from "../../interfaces/interfaces";
import { CompraDTO } from "../../interfaces/interfaces";

import { useGenerarCompraPaypalMutation } from "../../store/super5/super5Api";
import { useNavigation } from "@react-navigation/native";

export const useCarrito = () => {
  const navigation: any = useNavigation();
  const [open, setOpen] = useState(false);
  const [precioTotalCarrito, setPrecioTotalCarrito] = useState<number>(0);
  const dispatch = useAppDispatch();


  const [cupon, setCupon] = useState('');
  const[cuponDescuento, setCuponDescuento] = useState<PromocionDTO | null>(null);
  const[subTotal, setSubTotal] = useState<number | null>(null);
  const [cuponAplicado, setCuponAplicado] = useState(false);
  const [direccionId, setDireccionId] = useState('');
  const [modoEnvio, setModoEnvio] = useState('');

  const { carrito } = useAppSelector((state) => state.super5);
  const [startCompraPaypal, { data }] = useGenerarCompraPaypalMutation();
  const { sucursal } = useAppSelector((state) => state.super5);
  const [mostrarSeccion, setMostrarSeccion] = useState(false);

  useEffect(() => {
    if (carrito.length === 0) {
      setPrecioTotalCarrito(0);
      return;
    }
    setPrecioTotalCarrito(calcularPrecioTotalCarrito());
  }, [carrito, cupon, cuponDescuento]);

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
    setMostrarSeccion(false);
    dispatch(limpiarCarrito());
  };

  const calcularPrecioTotalCarrito = (): number => {
    let precioFinal = 0;
    carrito.forEach(({ producto: { precio, precioDescuento }, cantidad }) => {
      precioFinal += !precioDescuento
        ? precio * cantidad
        : precioDescuento * cantidad;
    });

    if (cuponDescuento&&cupon) {
      const calculoDePrecio = precioFinal - cuponDescuento.importeDescuentoVenta;
      setSubTotal(precioFinal);
      
      return calculoDePrecio <= 0 ? 0 : calculoDePrecio;
    }else{
      return precioFinal;
    }
  };
  
  

  const handlePagarCompra = (): void => {
    let arregloCompra: CarritoDto[] = [];
    const carritoDto = carrito.map(({ producto, cantidad }) => ({
      producto_id: +producto.id,
      producto: '',
      cantidad,
    }));
    console.log(carritoDto);
    const compra: CompraDTO = {
      carrito: carritoDto,
      direccion_id: modoEnvio === "DOMICILIO" ? Number(direccionId) : undefined,
      formaEntrega: modoEnvio,
      sucursal_id: +sucursal.id,
      promocion_id: cuponDescuento?.id,
    };
    //
    if(modoEnvio){ 
      console.log('sucursal: ', sucursal.id);
      startCompraPaypal(compra).then((resp: any) => {
        console.log('compra dentro de startCompraPaypal: ', compra);
        console.log('respuesta: ', resp.data);
        dispatch(realizarCompraPaypal({compra: resp.data}));
        navigation.navigate("Payment");
      });
    }else{
      alert('Indique el modo de envio.')
    }
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
    subTotal,
    cupon,
    setCupon,
    cuponAplicado,
    setCuponAplicado,
    direccionId,
    setDireccionId,
    modoEnvio,
    setModoEnvio,
    setCuponDescuento,
    cuponDescuento,
    mostrarSeccion, 
    setMostrarSeccion
  };
};