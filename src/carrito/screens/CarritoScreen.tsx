import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { CustomDivider } from '../../components/CustomDivider';
import { CarritoItem } from '../components/CarritoItem';
import { useAppSelector } from '../../hooks/storeHooks';
import { useCarrito } from '../hooks/useCarrito';

interface CarritoItem {
  id: number,
  nombre: string,
  imagen: string,
  precio: number,
  stock: number,
  descripcion: string,
  categoriaId: number,
  cantidad: number,
}

export const CarritoScreen = () => {
  const theme = useTheme();
  const {carrito} = useAppSelector(state => state.super5);
  const {precioTotalCarrito, limpiarElCarrito} = useCarrito();  

  const renderCarritoItems = () => {
    return carrito.map((item) => (
      <CarritoItem key={item.producto.id} product={item} />
    ));
  };

  return (
    <View style={styles.container}>
      <Text variant="displaySmall">Mi Carrito</Text>
      <Button
        mode="text"
        icon="trash-can"
        style={{ alignSelf: 'flex-start', marginBottom: 10 }}
        onPress={limpiarElCarrito}
      >
        Vaciar carrito
      </Button>
      <ScrollView style={{ width: '100%', marginBottom: 10 }}>
        <View style={styles.carritoItemsContainer}>{renderCarritoItems()}</View>
      </ScrollView>
      <CustomDivider
        style={{ width: '80%', backgroundColor: theme.colors.primary }}
        bold
      />
      <View style={styles.finalizarCompraContainer}>
        <View style={styles.valorTotalContainer}>
          <Text variant="displaySmall">Total: </Text>
          <Text variant="displaySmall">{precioTotalCarrito} </Text>
        </View>
        <CustomDivider
          style={{
            width: '80%',
            backgroundColor: theme.colors.primary,
            marginBottom: 20,
            alignSelf: 'center',
          }}
          bold
        />
        <Button mode="contained" icon="cash-register">
          Finalizar Compra
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  carritoItemsContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  finalizarCompraContainer: {
    width: '80%',
    marginVertical: 30,
  },
  valorTotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});
