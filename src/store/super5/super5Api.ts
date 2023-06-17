import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CompraDTO,
  Producto,
  Sucursal,
  Token,
  Direccion,
} from "../../interfaces/interfaces";
import { RootState } from "../store";
import { Timestamp } from "react-native-reanimated/lib/types/lib/reanimated2/commonTypes";

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
  fechaNacimiento: Timestamp;
}
interface AltaDireccionProps {
direccion : string,
ciudad: string,
departamento: string,
longitud:  Number | undefined,
latitud: Number | undefined,
aclaracion: string
}

interface UserDataProps {
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  fechaNacimiento: Date;
  rol: 0 | 1;
  eliminado: 0 | 1;
  bloqueado: 0 | 1;
  usuario: string;
  direcciones: Direccion[];
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
  fechaNacimiento: Timestamp;
}


interface ModificarCompradorProps {
  nombre: string;
  apellido: string;
  telefono: string;
  fechaNacimiento_t: Timestamp,
}

type AuthResponse = {
  token: string;
};



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
  tagTypes: [
    "VentasPagadas",
    "VentasConfirmadas",
    "UserData",
    "AtenderReclamo",
    "Producto",
    "Sucursal",
    "Direccion",
  ],
  
  endpoints: (builder) => ({
    login: builder.mutation<string, LoginProps>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
      transformResponse: (response: AuthResponse, meta, arg) => {
        return response.token;
      },
    }),
    signup: builder.mutation<string, SignupProps>({
      query: (body) => ({
        url: "cliente/crear",
        method: "POST",
        body,
      }),
      transformResponse: (resp: AuthResponse, meta) => resp.token,
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

    obtenerSucursales: builder.mutation<Sucursal[], void>({
      query: (data) => ({
        url: "/sucursal/obtener",
        method: "GET",
      }),
    }),
    
    getDirecciones: builder.query<Direccion[], void>({
      query: () => "direccion/listar",
      providesTags: ["Direccion"],
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
    
    getUserData: builder.query<UserDataProps, void>({
      query: () => "usuario/obtenerUsuario",
      //providesTags: ["User"],
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
  useSignupMutation,
  useGetUserDataQuery,
  useGetDireccionesQuery,
} = super5Api;
