import React, { useEffect, useState } from 'react';
import { View, Text, Modal, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useListarCategoriasMutation } from "../store/super5/super5Api";
import { ActivityIndicator, useTheme} from 'react-native-paper';
import { Categorias } from '../interfaces/interfaces';
import { Producto } from '../interfaces/interfaces';
import { Feather } from '@expo/vector-icons';
import theme from 'react-native-elements/dist/config/theme';

export interface ModalCatProps {
  categorias: Categorias[] | null;
  product: Producto | null;
  isVisible: boolean;
  setVisible: (isVisible: boolean) => void;
  selectedCategory: number | null;
  setSelectedCategory: (selectedCategory: number | null) => void;
}

const ModalCategorias = ({
  isVisible,
  setVisible,
  setSelectedCategory,
  selectedCategory,
}: ModalCatProps) => {
  const [modalVisible, setModalVisible] = useState(isVisible);
  const [listarCategorias, { data, isLoading, isError }] = useListarCategoriasMutation();
  //const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [categoryNames, setCategoryNames] = useState<string[]>([]);

  useEffect(() => {
    listarCategorias();
  }, []);

  useEffect(() => {
    if (data) {
      const nombres = data.map(categoria => categoria.nombre);
      setCategoryNames(nombres);
    }
  }, [data]);

  const handleClearFilters = () => {
    setSelectedCategory(null);
    setModalVisible(false);
    setVisible(false);
  };
  const handleCloase = () => {
    setSelectedCategory(null);
    setModalVisible(false);
    setVisible(false);
  };

  /*const handleSelected = (name: string) => {
    if (data) {
      const selectedCategoria = data.find(categoria => categoria.nombre === name);
  
      if (selectedCategoria) {
        const categoriaNumber = selectedCategoria.id;
        setSelectedCategory(categoriaNumber);
        
        setModalVisible(false);
        setVisible(false);
        console.log('categoria: '+ categoriaNumber + 'categoriaNumber nombre: ' +name);
      }
      
    }
  };*/
  const handleSelected = (name: string) => {
    if (data) {
      const selectedCategoria = data.find(categoria => categoria.nombre === name);
  
      if (selectedCategoria) {
        const categoriaNumber = selectedCategoria.id;
        setSelectedCategory(categoriaNumber);
  
        setModalVisible(false);
        setVisible(false);
        console.log('categoria: ' + categoriaNumber + 'categoriaNumber nombre: ' + name);
      }
  
    }
  };
  
  const renderItem = ({ item }: { item: string }) => {
    const isSelected = item === selectedCategory?.toString();
    

    return (
      <TouchableOpacity
        style={[styles.categoryItem, isSelected && styles.selectedCategoryItem]}
        onPress={() => handleSelected(item)}
      >
        <Text style={styles.categoryName}>{item}</Text>
      </TouchableOpacity>
    );
  };


  if (isError) {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Modal 
        visible={modalVisible? modalVisible : isVisible} 
        animationType="slide" transparent={true}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => handleCloase()}>
              <Feather name="x" size={24} color="gray" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Categorías</Text>
            {isLoading ? (
              <ActivityIndicator animating={true} color={theme.colors.primary} />
            ) : (
              <FlatList
                data={categoryNames}
                renderItem={renderItem}
                keyExtractor={(item) => item}
              />
            )}
            <TouchableOpacity style={styles.clearFiltersButton} onPress={handleClearFilters}>
              <Text style={styles.clearFiltersText}>Limpiar Filtros</Text>
            </TouchableOpacity>
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
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
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
    width: '80%',
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  categoryItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  selectedCategoryItem: {
    backgroundColor: '#F2F2F2',
  },
  categoryName: {
    fontSize: 16,
  },
  clearFiltersButton: {
    alignSelf: 'flex-end',
    marginTop: 20,
  },
  clearFiltersText: {
    color: 'gray',
    textDecorationLine: 'underline',
  },
});

export default ModalCategorias;
