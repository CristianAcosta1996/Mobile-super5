import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getToken } from "../../utils/localstorage";

interface AuthSliceState {
  status?: "not-authenticated" | "checking" | "authenticated";
  tipoUsuario?: "admin" | "comprador" | "sucursal" | "invitado";
  usuario?: string | null | undefined;
  imageUrl?: string | null | undefined;
  nombre: string | null | undefined;
  apellido: string | null | undefined;
  email: string | null | undefined;
  telefono: string | null | undefined;
  uid?: string | null | undefined;
  token?: string | null | undefined;
  errorMessage?: string | null | undefined;
  googleUser?: boolean | null | undefined;
}

const initialState = (): AuthSliceState => {
  const tokenInfo = getToken();
  const state: AuthSliceState = !tokenInfo
    ? {
      status: "not-authenticated",
      imageUrl: null,
      usuario: null,
      nombre: null,
      apellido: null,
      email: null,
      telefono: null,
      uid: null,
      token: null,
      errorMessage: null,
      tipoUsuario: "invitado",
    }
    : {
      status: "authenticated",
      imageUrl: tokenInfo.imagenUrl,
      usuario: tokenInfo.usuario,
      nombre: tokenInfo.nombre,
      apellido: tokenInfo.apellido,
      email: tokenInfo.correo,
      telefono: tokenInfo.telefono,
      uid: tokenInfo.uid,
      token: tokenInfo.token,
      errorMessage: null,
      tipoUsuario: tokenInfo.rol,
    };

  return state;
};


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<AuthSliceState>) => {
      state.status = "authenticated";
      state.nombre = payload.nombre;
      state.apellido = payload.apellido;
      state.email = payload.email;
      state.imageUrl = payload.imageUrl;
      state.tipoUsuario = "comprador";
      state.uid = payload.uid;
      state.usuario = payload.usuario;
      state.token = payload.token;
    },
    logout: (state, action) => {
      state.status = "not-authenticated";
      state.imageUrl = null;
      state.usuario = null;
      state.nombre = null;
      state.apellido = null;
      state.email = null;
      state.uid = null;
      state.token = null;
      state.tipoUsuario = "invitado";
      state.errorMessage = action.payload.errorMessage;
    },
    checkingCredentials: (state) => {
      state.status = "checking";
    },
  },
});

// Action creator are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;