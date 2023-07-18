import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TextInput, Button, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useCrearReclamoMutation } from '../../../store/super5/super5Api';

export interface ModalReclamosProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  idCompra?: number; // Prop para recibir el id_compra
}

export const ModalReclamos = ({ visible, setVisible, idCompra }: ModalReclamosProps) => {
  const theme = useTheme();
  const [comentario, setComentario] = useState('');
  const [tipoReclamo, setTipoReclamo] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [
    startCrearReclamo,
] = useCrearReclamoMutation();

const handleCrearReclamo = async (
    compraId: number,
    comentario: string,
    tipoReclamo: string,
  ) => {
    console.log(compraId, comentario, tipoReclamo);
    startCrearReclamo({
        tipo: tipoReclamo,
        estado: "CREADO",
        comentario: comentario,
        venta: {
            id: compraId,
        },

    }).unwrap()
        .then((resp) => {
            console.log(resp);
            alert(`Reclamo realizado!`);
        })
        .catch((error) => {
            alert(error.data);
        })
  };
  
  const handleConfirm = () => {
    const compraId = idCompra !== undefined ? idCompra : 0; 
    handleCrearReclamo(compraId, comentario, tipoReclamo);
    setVisible(false);
  };
  
  

  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    // Lógica para cargar los datos de la compra usando el idCompra
    if (idCompra) {
      // Realiza las operaciones necesarias con el idCompra
      console.log('ID de compra:', idCompra);
    }
  }, [idCompra]);

  return (
    <View style={styles.container}>
      <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={() => {}}>
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Comentarios</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingrese su comentario"
              value={comentario}
              onChangeText={setComentario}
            />
            <View style={styles.tipoContainer}>
              <Text>Tipo:</Text>
              <View style={styles.tipoButtonContainer}>
                <TouchableOpacity
                  onPress={() => setTipoReclamo('ATENCION')}
                  style={[styles.tipoButton, tipoReclamo === 'ATENCION' && styles.tipoButtonSelected]}
                >
                  <Text style={[styles.tipoButtonText, tipoReclamo === 'ATENCION' && styles.tipoButtonTextSelected]}>ATENCION</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setTipoReclamo('DEMORA')}
                  style={[styles.tipoButton, tipoReclamo === 'DEMORA' && styles.tipoButtonSelected]}
                >
                  <Text style={[styles.tipoButtonText, tipoReclamo === 'DEMORA' && styles.tipoButtonTextSelected]}>DEMORA</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setTipoReclamo('CALIDAD')}
                  style={[styles.tipoButton, tipoReclamo === 'CALIDAD' && styles.tipoButtonSelected]}
                >
                  <Text style={[styles.tipoButtonText, tipoReclamo === 'CALIDAD' && styles.tipoButtonTextSelected]}>CALIDAD</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setTipoReclamo('PRECIO')}
                  style={[styles.tipoButton, tipoReclamo === 'PRECIO' && styles.tipoButtonSelected]}
                >
                  <Text style={[styles.tipoButtonText, tipoReclamo === 'PRECIO' && styles.tipoButtonTextSelected]}>PRECIO</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setTipoReclamo('OTRO')}
                  style={[styles.tipoButton, tipoReclamo === 'OTRO' && styles.tipoButtonSelected]}
                >
                  <Text style={[styles.tipoButtonText, tipoReclamo === 'OTRO' && styles.tipoButtonTextSelected]}>OTRO</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <Button onPress={handleConfirm} title="Confirmar" />
              <Button onPress={handleCancel} title="Cancelar" color={theme.colors.error} />
            </View>
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  tipoContainer: {
    marginBottom: 10,
  },
  tipoButtonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tipoButton: {
    backgroundColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  tipoButtonText: {
    color: 'black',
  },
  tipoButtonSelected: {
    backgroundColor: 'blue',
  },
  tipoButtonTextSelected: {
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ModalReclamos;
