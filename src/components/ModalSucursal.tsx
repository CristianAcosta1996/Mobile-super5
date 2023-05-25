import React, { useEffect, useState } from 'react';
import { View, Text, Modal, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const ModalSucursal = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const [names, setNames] = useState([]);
  const [selectedName, setSelectedName] = useState('');

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=3')
      .then(response => response.json())
      .then(data => {
        const threeNames = data.slice(0, 3); // Obtener los primeros tres nombres
        setNames(threeNames);
      })
      .catch(error => console.log(error));
  }, []);

  const handleNameSelection = (name: string) => {
    setSelectedName(name);
    setModalVisible(false);
  };


  const renderItem = ({ item }: { item: string }) => {
    return (
      <TouchableOpacity onPress={() => handleNameSelection(item)}>
        <Text style={styles.item}>{item}</Text>
      </TouchableOpacity>
    );
  };
  

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Abrir Modal</Text>
      </TouchableOpacity>
      
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {}}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={names}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />

          </View>
        </View>
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
  },
  item: {
    fontSize: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default ModalSucursal;
