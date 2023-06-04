import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, IconButton, Text, useTheme } from 'react-native-paper';
import { useCarrito } from '../hooks/useCarrito';
import { CarritoItem as CarritoItemType } from '../../interfaces/interfaces';

export const CarritoItem = ({ product }: { product: CarritoItemType }) => {
  const {agregarItemAlCarrito, quitarItemDelCarrito} = useCarrito();
  const theme = useTheme();

  const handleReducirCantidad = () => {
    agregarItemAlCarrito(product.producto, product.cantidad - 1);
  };

  const handleAumentarCantidad = () => {
    agregarItemAlCarrito(product.producto, product.cantidad + 1);
  };

  return (
    <View style={styles.card}>
      <IconButton
        icon="trash-can"
        mode="contained"
        style={[styles.deleteBtn, { backgroundColor: 'white' }]}
        size={18}
        onPress={() => quitarItemDelCarrito(product.producto)}
      />
      <View style={styles.cardImageContainer}>
        <Image
          source={{ uri: product.producto.imagen }}
          style={{ width: '100%', height: '100%' }}
        />
      </View>
      <View style={styles.cardContent}>
        <Text numberOfLines={1} variant="bodyMedium">
          {product.producto.nombre}
        </Text>
        <Text style={{ marginTop: 15 }} variant="labelLarge">
          ${product.producto.precio}
        </Text>
      </View>
      <View
        style={[
          styles.cantidadContainer,
          { backgroundColor: theme.colors.primary },
        ]}
      >
        <Button mode="text" textColor="white" onPress={handleReducirCantidad}>
          -
        </Button>
        <Text style={{ color: 'white' }} variant="bodyLarge">
          {product.cantidad}
        </Text>
        <Button
          mode="text"
          textColor ="white"
          onPress={handleAumentarCantidad}
        >
          +
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  cardImageContainer: { width: '25%', backgroundColor: 'red' },
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
  deleteBtn: {
    position: 'absolute',
    top: -12,
    right: -18,
    zIndex: 1,
  },
});
