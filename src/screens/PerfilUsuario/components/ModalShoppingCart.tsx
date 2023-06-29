import React, { useEffect, useState } from 'react';
import { View, Modal,Image, TextInput, Button, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import { useCrearReclamoMutation, useGetProductosQuery } from '../../../store/super5/super5Api';

import { CarritoDto, CompraDTO, Producto } from '../../../interfaces/interfaces';
export interface ModalShoppingCartProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  idSucursal?: number; 
  compraID: number | undefined;
  compra: CompraDTO | undefined;
}

export const ModalShoppingCart = ({ visible, setVisible, idSucursal, compraID, compra }: ModalShoppingCartProps) => {
/*
{compra.carrito.map((carritoItem: CarritoDto, carritoIndex: number) => (
                       <View key={carritoIndex}>
                      
                        
                      </View>
                    ) 
                    )} */
  const theme = useTheme();
  const { data: productos } = useGetProductosQuery(String(idSucursal));
  console.log('id de la compra seleccionada>>>> ',compraID); 

  const productosFiltrados2 = compra?.carrito.map((carritoItem: CarritoDto, carritoIndex: number) => ( 
    productos?.filter(producto => producto.id == String(carritoItem.producto_id))
  ) )
  console.log('Productos filtradosDOS: ',productosFiltrados2);

  //Iterar sobre el carrito y filtrar por los id de los productos del carrito
  const productosFiltrados = productos?.filter(producto => producto.id == '1');
  

 //console.log('Productos filtrados: ',productosFiltrados);
  const handleCancel = () => {
    setVisible(false);
  };
  
  return (
    <View style={styles.container}>
      <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={() => {}}>
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalContent}>
          {productosFiltrados2?.map((products: Producto[] | undefined, index) => {
            if (!products) {
              return null; // Si products es undefined, no se muestra nada
            }

            return products.map((product: Producto) => {
              const carritoItem = compra?.carrito.find((item) => String(item.producto_id) == String(product.id));
              
              return (
                <View key={product?.id} style={styles.card}>
                  <View style={styles.cardImageContainer}>
                    <Image
                      source={{ uri: product?.imagen }}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </View>
                  <View style={styles.cardContent}>
                    <Text numberOfLines={1} variant="bodyMedium">
                      {product?.nombre}
                    </Text>
                    {product?.aplicaDescuento && (
                      <Text>
                        $ {product?.precioDescuento}
                      </Text>
                    )}
                    {!product?.aplicaDescuento && (
                      <Text>$ {product?.precio}</Text>
                    )}
                  </View>
                  <View
                    style={[
                      styles.cantidadContainer,
                      { backgroundColor: theme.colors.primary },
                    ]}
                  >
                    <Text style={{ color: 'white' }} variant="bodyLarge">
                      {carritoItem?.cantidad || 0} {/* Mostrar la cantidad del producto en el carrito */}
                    </Text>
                  </View>
                </View>
              );
            });
          })}



          <TouchableOpacity style={styles.buttonContainer} onPress={handleCancel}>
            <Text>Cerrar</Text> 
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
  card: {
    width: '95%',
    backgroundColor: 'white',
    height: 85,
    borderRadius: 9,
    paddingHorizontal: 10,
    paddingVertical: 5,
    elevation: 5,
    flexDirection: 'row',
    gap: 8,
    marginBottom: 30,
  },
  cardContent: {
    flex: 1,
    overflow: 'hidden',
    paddingTop: 12,
  },
  cardImageContainer: { 
    width: '25%', 
    backgroundColor: 'red',
  },
  cantidadContainer: {
    position: 'absolute',
    width: '40%',
    height: 40,
    borderRadius: 20,
    flexDirection: 'row',
    top: '73%',
    right: -20,
    justifyContent: 'center',
    alignItems: 'center',
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
export default ModalShoppingCart;


