import { useState } from "react";

export const useCarrito = () => {
  const [cantidadProducto, setCantidadProducto] = useState<number>(1);

  const aumentarCantidadProducto = (): void => {
    setCantidadProducto(cantidadProducto + 1);
  };
  const reducirCantidadProducto = (): void => {
    if (!(cantidadProducto > 0)) return;

    setCantidadProducto(cantidadProducto - 1);
  };

  return {
    cantidadProducto,
    aumentarCantidadProducto,
    reducirCantidadProducto,
  };
};
