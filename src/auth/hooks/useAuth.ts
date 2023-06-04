import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  startEmailAndPasswordLogin,
  startLogout,
  //startRegistrarUsuario
} from "../../store/auth/thunks";
import { useMemo } from "react";
import { useLoginMutation } from "../../store/super5/super5Api";

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const { status } = useAppSelector((state: { auth: any; }) => state.auth);
  const isAuthenticating = useMemo(() => status === "checking", [status]);

  const [
    startLogin,
    { isLoading: isAuthenticatingLogin, status: statusLogin },
  ] = useLoginMutation();

  /*const [
    startRegistrarUsuario,
    { isLoading: isAuthenticatingRegistro, status: statusRegistro },
  ] = useSignupMutation();*/

  const handleLogout = () => {
    dispatch(startLogout());
  };

  const handleLogin = async (email: string, password: string) => {
    const resp: any = await startLogin({
      usuarioOCorreo: email,
      contrasenia: password,
    });
    const token: string = resp.data.token;
    dispatch(startEmailAndPasswordLogin(token));
  };
/*
  const handleRegistrarUsuario = (
    username: string,
    password: string,
    email: string,
    nombre: string,
    apellido: string,
    phone: string,
    fechaNacimiento: string
  ) => {
    dispatch(
      startRegistrarUsuario(
        {
          username,
          password,
          email,
          nombre,
          apellido,
          phone,
          fechaNacimiento
        }
      )
    );
  };*/

  return {
    //handleRegistrarUsuario,
    handleLogin,
    handleLogout,
    isAuthenticating,
    statusLogin,
  };
};

