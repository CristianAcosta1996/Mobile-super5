import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Text, FlatList } from 'react-native';
import { Input, Button, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { TextInput, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const AltaUserScreen = (props: any) => {
    const today = new Date();

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfrim, setPasswordConfrim] = useState('');
    const [mail, setMail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(false);
    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    function handleToggleCalendar() {
        setOpen(!open);
    };
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.container}>
                <Input
                    label="Nombre"
                    value={nombre}
                    onChangeText={setNombre}
                    style={styles.input}
                />
                <Input
                    label="Apellido"
                    value={apellido}
                    onChangeText={setApellido}
                    style={styles.input}
                />
                <Input
                    label="Contraseña"
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                    secureTextEntry={!showPassword}
                    rightIcon={
                        <IconButton
                            size={24}
                            icon={showPassword ? 'eye-off' : 'eye'}
                            onPress={handleTogglePasswordVisibility}
                        />
                    }
                />
                <Input
                    label="Confirmar contraseña"
                    value={passwordConfrim}
                    onChangeText={setPasswordConfrim}
                    style={styles.input}
                    secureTextEntry={!showPassword}
                />
                <Input
                    label="E-Mail"
                    value={mail}
                    onChangeText={setMail}
                    style={styles.input}
                />
                <Input
                    label="Teléfono"
                    value={telefono}
                    onChangeText={setTelefono}
                    style={styles.input}
                    keyboardType="phone-pad"
                />
                <Input
                    label="Futuro campo de fecha"

                    style={styles.input}
                    rightIcon={
                        <IconButton
                            size={24}
                            icon='calendar'
                            onPress={handleTogglePasswordVisibility}
                        />
                    }
                />
                <Input
                    label="campo test"
                    style={styles.input}
                />
                <Input
                    label="campo test"
                    style={styles.input}
                />
                <Input
                    label="campo test"
                    style={styles.input}
                />
                <Input
                    label="campo test"
                    style={styles.input}
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} >
                        <Text style={styles.buttonText}>Registrase</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    containerScroll: {
        flex: 1,
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
    buttonText: {
        color: '#fff',
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
        marginBottom: -8,
    },
});
export default AltaUserScreen;