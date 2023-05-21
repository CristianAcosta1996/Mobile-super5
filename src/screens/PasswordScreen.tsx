import React, { useState } from 'react';
import { View, StyleSheet ,ScrollView, Image, TouchableOpacity, Text, FlatList } from 'react-native';

import { TextInput, IconButton,Card } from 'react-native-paper';




export const PasswordScreen = (props: any) => {
    const [mail, setMail] = useState('');
    return (
        <ScrollView contentContainerStyle={styles.container}>

            <Card style={styles.card}>
                <Text style={styles.title}>Recuperar contraseña</Text>
                <Text style={styles.infoText}>Se enviara la información necesaria para poder recuperar su contraseña al e-mail </Text>
                <View style={styles.container}>
                    <TextInput
                        label="E-Mail"
                        value={mail}
                        onChangeText={setMail}
                        style={styles.input}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} >
                            <Text style={styles.buttonText}>Recuperar contraseña</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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