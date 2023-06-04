import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CompraDTO,
  Producto,
  Sucursal,
  Token,
} from "../../interfaces/interfaces";
import { RootState } from "../store";

const apiUrl: string = "http://192.168.1.159:8080/api";

/*interface Token {
  sub: string;
  apellido: string;
  correo: string;
  usuario: string;
  exp: number;
  nombre: string;
  iat: number;
  rol: number;
}*/

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
interface AltaDireccionProps {
direccion : string,
ciudad: string,
departamento: string,
longitud:  Number | undefined,
latitud: Number | undefined,
aclaracion: string
}

interface sucursalSelected {
  sucursal: number;
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

interface ListarCategoriasProps{
  id: number,
  nombre: string
}

/*----------------------------------*/

interface SignupProps {
  nombre: string;
  apellido: string;
  correo: string;
  contrasenia: string;
  telefono: string;
  rol: 0 | 1;
  eliminado: 0 | 1;
  bloqueado: 0 | 1;
  usuario: string;
}


interface ModificarCompradorProps {
  nombre: string;
  apellido: string;
  telefono: string;
}



export const super5Api = createApi({
  reducerPath: "super5Api",
  baseQuery: fetchBaseQuery({ 
    baseUrl: apiUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
    
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
    
      return headers;
    },
  }),
  
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

    altaDir: builder.mutation<Token, AltaDireccionProps>({
      query: (body) => ({
        url: "/direccion/crear",
        method: "POST",
        body,
      }),
    }),

    obtenerSucursales: builder.mutation<ObtenerSucursalesProps[], void>({
      query: (data) => ({
        url: "/sucursal/obtener",
        method: "GET",
      }),
    }),

    listarCategorias: builder.mutation<ListarCategoriasProps[], void>({
      query: (data) => ({
        url: "/producto/listarCategorias",
        method: "GET",
      }),
    }),

    obtenerProds: builder.query<ObtenerProdsProps[], string>({ //sucursalSelected
      query: (id) => `producto/obtenerPorSucursal/${id}`,
    }), 
/*----------------*/
    generarCompraPaypal: builder.mutation<CompraDTO, CompraDTO>({
      query: (body) => ({
        url: "paypal/crear",
        method: "POST",
        body,
      }),
    }),

    generarPago: builder.mutation<CompraDTO | undefined, CompraDTO>({
      query: (body) => ({
        url: "venta/generarPago",
        method: "POST",
        body,
      }),
    }),

    modificarComprador: builder.mutation<Token, ModificarCompradorProps>({
      query: (body) => ({
        url: "cliente/modificarComprador",
        method: "POST",
        body,
      }),
    }),
  }),

});


export const { 
  useLoginMutation, 
  useAltaMutation, 
  useObtenerSucursalesMutation,
  useObtenerProdsQuery,
  useAltaDirMutation,
  useGenerarCompraPaypalMutation,
  useGenerarPagoMutation,
  useModificarCompradorMutation,
  useListarCategoriasMutation,
} = super5Api;
