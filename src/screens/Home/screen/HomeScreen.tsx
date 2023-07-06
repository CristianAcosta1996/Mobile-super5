import React, { useState, useEffect, useRef } from "react";
import { ActivityIndicator, Animated, Button, Easing, FlatList, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Card from '../../../components/Card';
import ImageSwiper from "../../../components/ImageSwiper";
import ModalSucursal, { ModalSucursalProps } from "../components/ModalSucursal";
import ModalCategorias, { ModalCatProps } from "../components/ModalCategorias";
import { Feather } from "@expo/vector-icons";
import { useHome } from "../hooks/useHome";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MD3Colors, ProgressBar, useTheme } from "react-native-paper";
import { Producto } from "../../../interfaces/interfaces";
export const HomeScreen = () => {
  const theme = useTheme();
  const rotation = new Animated.Value(0); 
  const {
    handlePressSucursal,
    filteredProducts,
    handleFilterIconPress,
    modalCatProps,
    modalSucursalProps,
    selectedNameSuc,
    searchQuery,
    setSearchQuery,
    productsIsLoading,
 } = useHome();

  return (
    <View style={styles.container}>
      <SafeAreaView>
      <ModalSucursal 
       {...modalSucursalProps}
      />
    <TouchableOpacity onPress={() => handlePressSucursal()}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {selectedNameSuc&& (
        <>
          <Icon name="store" size={20} color="#000" />
          <Text style={{ marginLeft: 8 }}>Estas comprando en sucursal: {selectedNameSuc}</Text>
        </>)}
        
      </View>
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
      {!productsIsLoading ? 
        (
          <FlatList
            data={filteredProducts}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            renderItem={({ item }) => <Card product={item as unknown as Producto} />}
            ListHeaderComponent={<ImageSwiper/>}
            ListFooterComponent={filteredProducts.length > 0 ?  (
              <ActivityIndicator animating={true} color={theme.colors.primary} />
            ) : null}  
          />
        )
        :
        (
          <>
            <View style={styles.containerLoading}>
              <Text style={{ marginLeft: 10 }}>Cargando productos...</Text>      
              <ActivityIndicator animating={true} color={theme.colors.primary} />
            </View>
          </>
        )
      }
      </SafeAreaView>
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
  isloadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerLoading:{
    flex: 1,
    width: '100%', // Ancho del modal
    maxHeight: '100%', // Altura máxima del modal
    alignSelf: 'center', // Centrar horizontalmente
    alignItems: 'center', // Centrar verticalmente
    justifyContent: 'center', // Centrar verticalmente
    marginTop: '20%',
    height: 100,
    paddingHorizontal: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    
    marginBottom: 160,
  },
  loader: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#000',
    borderTopColor: '#0000ff',
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
