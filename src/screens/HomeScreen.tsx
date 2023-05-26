import React, { useState, useEffect } from "react";
import { Button, FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import Card from '../components/Card';
import ImageSwiper from "../components/ImageSwiper";
import ModalSucursal from "../components/ModalSucursal";
//import { BuscarScreen } from "./BuscarScreen";

export const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [selectedName, setSelectedName] = useState('');
  const [showBuscarScreen, setShowBuscarScreen] = useState(true);

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
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({ item }) => <Card product={item} />}
         // keyExtractor={(item) => item.id.toString()}
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

export default HomeScreen;