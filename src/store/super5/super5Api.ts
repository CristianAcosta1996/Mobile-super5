import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiUrl: string = "http://192.168.56.1:8080/api";

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
  }),
});

export const { useLoginMutation } = super5Api;
