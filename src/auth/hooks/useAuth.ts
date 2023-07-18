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
import { format } from 'date-fns';
import { useState } from "react";
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

  const handleLogin = async (username: string, password: string) => {
    console.log(username, password);
    startLogin({
      usuarioOCorreo: username,
      contrasenia: password,
    }).unwrap()
      .then((resp: any) => {
        console.log("respuesta: ", resp);
        setTimeout(() => {
          const token: string = resp;
          dispatch(startEmailAndPasswordLogin(token));
          navigation.navigate("Home");
        }, 3000);
      })
      .catch((error) => {
        console.log("respuesta: eror ++>>> ", error);
        alert('Usuario y/o contraseña incorrecta.');
      });
  };

  const handleGoogleLogin = () => {
    dispatch(startGoogleSignIn());
  };


  // Items para Dias
  const dayItems = [];
  for (let i = 1; i <= 31; i++) {
    dayItems.push({ label: i.toString(), value: i.toString() });
  }

  const monthItems = [
    { label: 'Enero', value: '1' },
    { label: 'Febrero', value: '2' },
    { label: 'Marzo', value: '3' },
    { label: 'Abril', value: '4' },
    { label: 'Mayo', value: '5' },
    { label: 'Junio', value: '6' },
    { label: 'Julio', value: '7' },
    { label: 'Agosto', value: '8' },
    { label: 'Setiembre', value: '9' },
    { label: 'Octubre', value: '10' },
    { label: 'Noviembre', value: '11' },
    { label: 'Diciembre', value: '12' },
  ];

  //  Items para Años con un rango de 95 hasta la actualidad 
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 95;

  const yearItems = Array.from({ length: 96 }, (_, index) => {
    const year = startYear + index;
    return { label: year.toString(), value: year.toString() };
  });


  const [day, setDay] = useState<number>(0);
  const [month, setMonth] = useState<number>(0);
  const [year, setYear] = useState<number>(0);

  const handleDayChange = (value: any) => {
    setDay(value);
  };

  const handleMonthChange = (value: any) => {
    setMonth(value);
  };

  const handleYearChange = (value: any) => {
    setYear(value);
  };

  const selectedDate = day && month && year ? new Date(year, month - 1, day) : null;
  const formattedDate = selectedDate ? format(selectedDate, 'dd/MM/yyyy') : '';

  const [dateVisible, setDateVisible] = useState(false);

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
      fechaNacimiento: birthDate,
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
        alert(error);
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
    dayItems,
    monthItems,
    yearItems,
    handleDayChange,
    handleMonthChange,
    handleYearChange,
    formattedDate,
    selectedDate,
    dateVisible,
    setDateVisible,
    day,
    month,
    year,
  };
};