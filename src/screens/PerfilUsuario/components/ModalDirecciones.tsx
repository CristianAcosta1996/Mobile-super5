import React, { useEffect, useState } from 'react';
import { View, Text, Modal, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Button } from 'react-native';
import { useGetDireccionesQuery } from "../../../store/super5/super5Api";
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { useAppDispatch } from '../../../hooks/hooks';
import { Direccion } from '../../../interfaces/interfaces';
import { useNavigation } from '@react-navigation/native';

export interface ModalDireccionesProps {
  selectedDireccion: string;
  setSelectedDireccion: (direccion: string) => void;
  selectedDireccionId: string;
  setSelectedDireccionId: (direccion: string) => void;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const ModalDirecciones = ({
  selectedDireccion,
  setSelectedDireccion,
  visible,
  setVisible,
  setSelectedDireccionId,
  selectedDireccionId,
}: ModalDireccionesProps) => {
  const theme = useTheme();
  const [direcciones, setDirecciones] = useState<Direccion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: direccionesData } = useGetDireccionesQuery();
  const dispatch = useAppDispatch();
  const navigation: any = useNavigation();
  useEffect(() => {
    if (direccionesData) {
      setDirecciones(direccionesData);
      setIsLoading(false);
    }
  }, [direccionesData]);

  const handleDireccionSelection = (direccion: Direccion) => {
    setSelectedDireccion(direccion.direccion);
    setSelectedDireccionId(direccion.id);
    setVisible(false);
  };

  const handleIngresarDireccion = () => {
    navigation.navigate("Direcciones");
  };

  const renderItem = ({ item }: { item: Direccion }) => {
    return (
      <TouchableOpacity onPress={() => handleDireccionSelection(item)}>
        <Text style={styles.item}>{item.direccion}</Text>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} color={theme.colors.primary} />
      </View>
    );
  }

  if (direcciones.length === 0) {
    return (
      <View style={styles.container}>
        <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={() => {}}>
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text>No hay direcciones disponibles</Text>
              <View style={styles.buttonContainer}>
                <Button title="Ingresar dirección" onPress={handleIngresarDireccion} />
                <Button title="Cancelar" onPress={() => setVisible(false)} />
              </View>
            </View>
          </SafeAreaView>
        </Modal>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={() => {}}>
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Seleccione una dirección</Text>
            <FlatList
              data={direcciones}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: '80%', // Ancho del modal
    maxHeight: '70%', // Altura máxima del modal
  },
  item: {
    fontSize: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
export default ModalDirecciones;