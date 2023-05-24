import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  ActivityIndicator,
  Button,
  TextInput,
  useTheme,
} from "react-native-paper";
import { useLoginMutation } from "../../store/super5/super5Api";

export const LoginScreen = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [startLogin, { isLoading, isSuccess, data }] = useLoginMutation();
  const theme = useTheme();

  const handleLogin = () => {
    startLogin({ usuarioOCorreo: email, contrasenia: password }).then(
      (resp) => {
        console.log(resp);
      }
    );
  };
  if (isLoading)
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} color={theme.colors.primary} />
      </View>
    );

  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        value={email}
        style={{ marginBottom: 15 }}
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={(password) => setPassword(password)}
        secureTextEntry
      />

      <Button style={{ marginTop: 30 }} mode="contained" onPress={handleLogin}>
        Iniciar sesion
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderColor: "#ccc",
  },
});
