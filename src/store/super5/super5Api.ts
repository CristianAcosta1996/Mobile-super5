import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiUrl: string = "http://192.168.1.159:8080/api";

interface Token {
  sub: string;
  apellido: string;
  correo: string;
  usuario: string;
  exp: number;
  nombre: string;
  iat: number;
  rol: number;
}
interface LoginProps {
  usuarioOCorreo: string;
  contrasenia: string;
}

interface AltaProps {
  nombre: string;
  apellido: string;
  correo: string;
  contrasenia: string;
  telefono: string;
  usuario: string;
}

interface sucursalSelected {
  sucursal: string;
}

interface ObtenerSucursalesProps {
  id: number,
  nombre: string,
  direccion: {
      id: number,
      direccion: string,
      ciudad: string,
      departamento: string,
      longitud: string,
      latitud: string,
      aclaracion: null
  }
}

interface ObtenerProdsProps {
  id: number,
  nombre: string,
  imagen: string,
  precio: number,
  eliminado: boolean,
  categoriaId: number,
  stock: number,
  precioDescuento: null,
  aplicaDescuento: null,
  descripcion: string 
}

export const super5Api = createApi({
  reducerPath: "super5Api",
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
  endpoints: (builder) => ({
    login: builder.mutation<Token, LoginProps>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),

    alta: builder.mutation<Token, AltaProps>({
      query: (body) => ({
        url: "/cliente/crear",
        method: "POST",
        body,
      }),
    }),

    obtenerSucursales: builder.query<ObtenerSucursalesProps[], void>({
      query: () => ({
        url: "/ruta/personalizada/para/obtener/sucursales",
        method: "GET",
      }),
    }),

    obtenerProds: builder.mutation<ObtenerProdsProps[], sucursalSelected>({
      query: (data) => ({
        url: `producto/obtenerPorSucursal/${data.sucursal}`,
        method: "GET",
      }),
    }),
  }),
});


export const { useLoginMutation, useAltaMutation } = super5Api;
