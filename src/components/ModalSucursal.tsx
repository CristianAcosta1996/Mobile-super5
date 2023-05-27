import React, { useEffect, useState } from 'react';
import { View, Text, Modal, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useObtenerSucursalesMutation } from "../store/super5/super5Api";
import { ActivityIndicator, useTheme} from 'react-native-paper';

export interface ModalSucursalProps {
  selectedName: string;
  setSelectedName: (name: string) => void;
  setSelectedNameSuc: (name: string) => void;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const ModalSucursal = ({ selectedName, setSelectedName , setSelectedNameSuc, visible, setVisible }: ModalSucursalProps) => {
  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState(true);
  
  const [names, setNames] = useState<string[]>([]);



  const [obtenerSucursales, { data, isLoading, isError }] = useObtenerSucursalesMutation();

  useEffect(() => {
    obtenerSucursales();
  }, []);

  useEffect(() => {
    if (data) {
        const nombres = data.map(sucursal => sucursal.nombre); 
        setNames(nombres);
    }
  }, [data]);

  if (isError)
  return (
    <View style={styles.container}>
      <ActivityIndicator animating={true} color={theme.colors.primary} />
    </View>
  );
  const handleNameSelection = (name: string) => {
    console.log(name);
    let sucursal = '';
   
    if (name === 'CARRASCO') {
      sucursal = '1';
    } else if (name === 'CENTRO') {
      sucursal = '2';
    } else if (name === 'BRAZO ORIENTAL') {
      sucursal = '3';
    }else if (name === 'BELVEDERE') {
      sucursal = '4';
    };



    setSelectedName(sucursal);
    setSelectedNameSuc(name);
    setModalVisible(false);
    //setModalVisible(!modalVisible);
    setVisible(false);
  };

  const renderItem = ({ item }: { item: string }) => {
    return (
      <TouchableOpacity onPress={() => handleNameSelection(item)}>
        <Text style={styles.item}>{item}</Text>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return <Text>Cargando...</Text>;
  }

  if (isError) {
    return <Text>Error al obtener los nombres de sucursales</Text>;
  }

  return (
    <View style={styles.container}>
      
      <Modal
        visible={modalVisible? modalVisible : visible }
        animationType="slide"
        transparent={true}
        onRequestClose={() => {}}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Seleccione una sucursal :D</Text>
            <FlatList
              data={names}
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
      buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
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
export default ModalSucursal;


