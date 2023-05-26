import React, { useState, useEffect } from "react";

import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import Card from '../components/Card';
import ImageSwiper from "../components/ImageSwiper";
import ModalSucursal from "../components/ModalSucursal";


export const HomeScreen = () => {
  
  const [products, setProducts] = React.useState([]);
  const [selectedName, setSelectedName] = useState('');
  console.log(selectedName)
  useEffect(() => {
    fetch(`http://192.168.1.159:8080/api/producto/obtenerPorSucursal/${selectedName}`)
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error(error));
  }, [selectedName]);
  return (
    
       <View style={styles.container}>
         <ModalSucursal selectedName={selectedName} setSelectedName={setSelectedName} /> 
        <ScrollView>
        <ImageSwiper/>
        <FlatList
              data={products}
              //keyExtractor={(item) => item.id.toString()}
              numColumns={2} // Mostrar dos columnas
              columnWrapperStyle={styles.columnWrapper} // Estilo para el contenedor de cada columna
              renderItem={({ item }) => <Card product={item} />} // Pasar el estilo de las cards
            />
            </ScrollView>
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

});
