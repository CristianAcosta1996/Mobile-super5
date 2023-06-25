import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens/Home/screen/HomeScreen";
import { AppBarSuper5 } from "../components/AppBarSuper5";
import { CarritoScreen } from "../carrito/screens/CarritoScreen";
import { ProfileScreen } from "../screens/PerfilUsuario/screens/ProfileScreen";
import LoginScreen from "../auth/screens/LoginScreen";
import AltaUserScreen from "../auth/screens/AltaUserScreen";
import PasswordScreen from "../screens/PasswordScreen";
import { Directions } from "react-native-gesture-handler";
import PaymentScreen from "../screens/PaymentScreen";
import FinalizacionCompraScreen from "../screens/FinalizacionCompraScreen";
import MapaDirection from "../screens/PerfilUsuario/screens/MapaDirectionScreen";
import PedidosScreeen from "../screens/PerfilUsuario/screens/PedidosScreen";
import ReclamosScreeen from "../screens/PerfilUsuario/screens/ReclamosScreen";

const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ header: (props) => <AppBarSuper5 {...props} /> }}
    >
      
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={PasswordScreen} />
      <Stack.Screen name="AltaUser" component={AltaUserScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} /> 
      <Stack.Screen name="Carrito" component={CarritoScreen} />
      <Stack.Screen name="FinalizacionCompra" component={FinalizacionCompraScreen} />
      <Stack.Screen name="Direcciones" component={MapaDirection} />
      <Stack.Screen name="Pedidos" component={PedidosScreeen} />
      <Stack.Screen name="Reclamos" component={ReclamosScreeen} />

      
      <Stack.Screen
        name="Shopping-Cart"
        component={CarritoScreen}
        options={{ title: "Mi Carrito" }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Perfil" }}
      />
    </Stack.Navigator>
  );
};
