import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import { CompraDTO, Producto } from '../../../interfaces/interfaces';

export const CarritoComprasItem = ({ product, cantidad }: { product: Producto | undefined, cantidad: number }) => {
  const theme = useTheme();
  return (
    <View style={styles.card}>
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
            $ {product.precioDescuento}
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
          {cantidad}
        </Text>
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
});

export default CarritoComprasItem;
