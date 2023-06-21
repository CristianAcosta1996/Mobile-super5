import { useAppDispatch } from "../../hooks/hooks";
import {
  useLoginMutation,
  useSignupMutation,
} from "../../store/super5/super5Api";
import {
  startEmailAndPasswordLogin,
  startGoogleSignIn,
  startLogout,
} from "../../store/auth/thunks";
import { useNavigation } from "@react-navigation/native";
import { Timestamp } from "react-native-reanimated/lib/types/lib/reanimated2/commonTypes";
import { ToastAndroid } from "react-native";
import { Snackbar } from "react-native-paper";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigation: any = useNavigation();
  const [ 
    startLogin,
    {
      isLoading: isAuthenticatingLogin,
      status: statusLogin,
      error: errorLogin,
      isError: isErrorLogin,
      isSuccess: isSuccessLogin,
      data: dataLogin,
    },
  ] = useLoginMutation();

  const [
    startRegistrarUsuario,
    {
      isLoading: isAuthenticatingRegistro,
      status: statusRegistro,
      error: errorSignup,
      isError: isErrorSignup,
      isSuccess: isSuccessSignup,
      data: dataSignup,
    },
  ] = useSignupMutation();

  const handleLogout = () => {
    dispatch(startLogout());
  };

  const handleLogin = async (email: string, password: string) => {
    console.log(email, password);
    startLogin({
      usuarioOCorreo: email,
      contrasenia: password,
    })
      .unwrap()
      .then((resp) => {
        console.log(resp);
        setTimeout(() => {
          
          const token: string = resp;
          dispatch(startEmailAndPasswordLogin(token));
          navigation.navigate("Home");
        }, 3000);
      })
      .catch((error) => {
        alert('Usuario y/o contraseña incorrecta.');
      });
  };

  const handleGoogleLogin = () => {
    dispatch(startGoogleSignIn());
  };

  const handleRegistrarUsuario = async (
    username: string,
    password: string,
    email: string,
    nombre: string,
    apellido: string,
    phone: string,
    birthDate: Date,
  ) => {
    startRegistrarUsuario({
      nombre,
      correo: email,
      usuario: username,
      contrasenia: password,
      apellido,
      telefono: phone,
      bloqueado: 0,
      eliminado: 0,
      rol: 1,
      fechaNacimiento: birthDate.getTime(),
    })
      .unwrap()
      .then((resp) => {
        setTimeout(() => {
          const token: string = resp;
          dispatch(startEmailAndPasswordLogin(token));
        }, 3000);
        if (resp) alert(`Usuario creado con exito!`)
        
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return {
    handleRegistrarUsuario,
    handleLogin,
    handleLogout,
    handleGoogleLogin,
    isAuthenticatingLogin,
    statusLogin,
    isAuthenticatingRegistro,
    statusRegistro,
    isErrorLogin,
    errorLogin,
    isSuccessLogin,
    isErrorSignup,
    errorSignup,
    isSuccessSignup,
    dataLogin,
    dataSignup,
  };
};