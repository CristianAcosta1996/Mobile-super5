import React, { useState, useEffect } from "react";
import { Button, FlatList, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Card from '../components/Card';
import ImageSwiper from "../components/ImageSwiper";
import ModalSucursal, { ModalSucursalProps } from "../components/ModalSucursal";
import ModalCategorias, { ModalCatProps } from "../components/ModalCategorias";
import { Feather } from "@expo/vector-icons";

interface Product {
  id: string,
  nombre: string,
  imagen: string,
  precio: number,
  eliminado: boolean,
  categoriaId: number,
  stock: number,
  precioDescuento: null,
  aplicaDescuento: null,
  descripcion: string 
  cantidad: number,
}


export const HomeScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedName, setSelectedName] = useState('');// el numero
  const [selectedNameSuc, setSelectedNameSuc] = useState('');// el nombre string
  
  const [selectedCatId, setSelectedCatId] = useState<number | null>(null);// el numero

  const [searchQuery, setSearchQuery] = useState('');
  const [isCatVisible, setIsCatVisible] = useState(false);
  const [visibleSuc, setVisibleSuc] = useState(false);

  const modalSucursalProps: ModalSucursalProps = {
    selectedName: selectedName,
    setSelectedName: setSelectedName,
    setSelectedNameSuc: setSelectedNameSuc,
    visible: visibleSuc,
    setVisible: setVisibleSuc
  };

  const modalCatProps: ModalCatProps = {
    categorias: [],
    product: null,
    isVisible: isCatVisible,
    setVisible: setIsCatVisible,
    selectedCategory: selectedCatId,
    setSelectedCategory: setSelectedCatId,
  };

  useEffect(() => {
    fetch(`http://192.168.1.159:8080/api/producto/obtenerPorSucursal/${selectedName}`)
      .then(response => response?.json())
      .then(data => {
        const filteredProducts = data.filter((product: Product) =>
          (product.nombre?.toLowerCase().includes(searchQuery.toLowerCase()) || '') ||
          (product.descripcion?.toLowerCase().includes(searchQuery.toLowerCase()) || '')
        );
        setProducts(filteredProducts);
      })
      .catch(error => console.error(error));
  }, [selectedName, searchQuery]);

  const handleFilterIconPress = () => {
    setIsCatVisible(true);
  };


  const filteredProducts = selectedCatId
    ? products.filter(product => product.categoriaId === selectedCatId)
    : products;



  const handlePressSucursal = () => {
    setVisibleSuc(true);
    console.log('si');
  };

  return (
    <View style={styles.container}>
      <ModalSucursal 
       {...modalSucursalProps}
      />
      <TouchableOpacity onPress={() => handlePressSucursal()}>
            <Text>Sucursal: {selectedNameSuc}</Text>
      </TouchableOpacity>
      <View style={styles.searchBarContainer}>
          <Feather name="search" size={24} color="gray" style={styles.searchIcon} />
          <TextInput
            style={styles.searchBar}
            placeholder="Buscar productos"
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
          />
          <TouchableOpacity onPress={handleFilterIconPress}>
            <Feather name="filter" size={24} color="gray" style={styles.filterIcon} /> 
          </TouchableOpacity>
        </View>
      <ScrollView>
        
        <ImageSwiper/>
        <FlatList
          data={filteredProducts}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({ item }) => <Card product={item} />}
        />
      </ScrollView>
      <ModalCategorias 
       {...modalCatProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    paddingHorizontal: 10,
    margin: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    paddingHorizontal: 1,
  },
  searchIcon: {
    marginLeft: 10,
  },
  filterIcon: {
    marginLeft: 10,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: '80%', // Ancho del modal
    maxHeight: '70%', // Altura máxima del modal
    alignSelf: 'center', // Centrar horizontalmente
    alignItems: 'center', // Centrar verticalmente
    justifyContent: 'center', // Centrar verticalmente
    marginTop: '50%',
  },
  
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
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

export default HomeScreen;
