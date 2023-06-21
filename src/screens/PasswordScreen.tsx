import React, { useState } from 'react';
import { View, StyleSheet ,ScrollView, Image, TouchableOpacity, Text, FlatList } from 'react-native';
import { Input } from 'react-native-elements';

import { TextInput, IconButton,Card, ActivityIndicator, useTheme } from 'react-native-paper';
import { useModificarContrasenaMutation, useRecuperarContrasenaMutation } from '../store/super5/super5Api';




export const PasswordScreen = (props: any) => {
    const [showPassword, setShowPassword] = useState(false);
    const [mail, setMail] = useState('');
    const [codigo, setCodigo] = useState("");
    const [password, setPassword] = useState("");
    const [visibleContinuar, setVisibleContinuar] = useState(false);
    const [isLoginView, setLoginView] = useState(false);
    const theme = useTheme();
    const [startRecuperarContrasena] = useRecuperarContrasenaMutation();
    const [startModificarContrasena] = useModificarContrasenaMutation();
    
    const handleRecuperar = async () => {
        console.log("Se envía el correo: ", mail);
        setLoginView(true);
        try {
          const resp = await startRecuperarContrasena({ correo: mail });
          if (resp) {
            console.log(resp);
            alert("Código enviado a su correo");
            setLoginView(false);
            setVisibleContinuar(true);
          }
        } catch (error) {
          console.error("Error al enviar el correo:", error);
          alert("No existe cuenta asosiada a este correo");
        }
      };
      

    const handleModificarContrasena = async () => {
        setVisibleContinuar(true);
        startModificarContrasena({
          guid:"d27306ce-5fbb-4512-afdd-d64fe2d097e7",
          contrasena:password,
          contrasenaRepeticion:password
        })
          .unwrap()
          .then((resp) => {
            setVisibleContinuar(false);
            alert(`Contraseña actualizada con exito!`);
          })
          .catch((error) => {
            setVisibleContinuar(false);
            console.error(error);
            if (error) alert(error)
        });
    };
    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleCancel = () => {
        setVisibleContinuar(false);
        setMail('');
    }
    const initialState = {
        email: "",
        codigo: "",
        password: "",
        passwordConfirm: "",
      };
    
    const [formValues, setFormValues] = useState(initialState);


    return (
        <ScrollView contentContainerStyle={styles.container}>

            <Card style={styles.card}>
                <Text style={styles.title}>Recuperar contraseña</Text>
                


                    {!visibleContinuar &&
                        <View>
                            <Text style={styles.infoText}>
                            Se enviará un código para proceder al cambio de contraseña a su correo
                            </Text>
                            <View style={styles.container}>
                            <TextInput
                                label="E-Mail"
                                //value={formValues.email}
                                onChangeText={setMail}
                                style={styles.input}
                            />
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.button} onPress={handleRecuperar}>
                                <Text style={styles.buttonText}>Recuperar contraseña</Text>
                                </TouchableOpacity>
                            </View>
                            </View>
                        </View>
                    }  
                    {isLoginView && 
                       <View style={styles.container}>
                         <ActivityIndicator animating={true} color={theme.colors.primary} />
                       </View>
                     }
                    {visibleContinuar &&
                        <View style={styles.container}>
                            <TextInput 
                                onChangeText={setCodigo} 
                                label="Ingrese su codigo"
                                style={styles.input} 
                            />
                            <Input
                            label="Nueva contraseña"
                            onChangeText={setPassword}
                            style={styles.input}
                            secureTextEntry={!showPassword}
                            rightIcon={
                                <IconButton
                                icon={showPassword ? 'eye-off' : 'eye'}
                                onPress={handleTogglePasswordVisibility}
                                />
                            }
                            />
                            <Input
                            label="Confirmar nueva contraseña"
                            onChangeText={setPassword}
                            style={styles.input}
                            secureTextEntry={!showPassword}
                            />
                            <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={handleModificarContrasena}>
                                <Text style={styles.buttonText}>Confirmar</Text>
                            </TouchableOpacity>
                           
                            </View>
                            <TouchableOpacity style={styles.button} onPress={handleCancel}>
                                <Text style={styles.buttonTextCancel}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    }

                
            </Card>
            <View>

            </View>
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    containerScroll: {
        flex: 1,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    infoText: {
        fontSize: 16,
        marginBottom: 16,
    },
    container: {
        justifyContent: 'center',
        paddingHorizontal: 30,
        backgroundColor: '#f2f2f2',
        padding: 16,
    },
    buttonContainer: {
        marginBottom: 10,

    },
    button: {
        backgroundColor: '#7e57c2',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    googleButton: {
        borderRadius: 30,
        fontWeight: 'bold',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    buttonTextCancel:{
        color: 'red',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    icon: {
        marginRight: 12,
    },
    input: {
        marginBottom: 12,
    },

});
export default PasswordScreen;