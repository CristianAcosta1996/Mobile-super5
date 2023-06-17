import React, { useEffect, useState } from 'react';
import { View, Text, Modal, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useGetDireccionesQuery } from "../../../store/super5/super5Api";
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { useAppDispatch } from '../../../hooks/hooks';

export interface ModalDireccionesProps {
  selectedDireccion: string;
  setSelectedDireccion: (direccion: string) => void;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const ModalDirecciones = ({ selectedDireccion, setSelectedDireccion, visible, setVisible }: ModalDireccionesProps) => {
  const theme = useTheme();
  const [direcciones, setDirecciones] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: direccionesData } = useGetDireccionesQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (direccionesData) {
      const direccionesArray = direccionesData.map((direccion) => direccion.direccion);
      setDirecciones(direccionesArray);
      setIsLoading(false);
    }
  }, [direccionesData]);

  const handleDireccionSelection = (direccion: string) => {
    setSelectedDireccion(direccion);
    setVisible(false);
  };
  
  const renderItem = ({ item }: { item: string }) => {
    return (
      <TouchableOpacity onPress={() => handleDireccionSelection(item)}>
        <Text style={styles.item}>{item}</Text>
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

  return (
    <View style={styles.container}>
      <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {}}
      >
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
});
export default ModalDirecciones;