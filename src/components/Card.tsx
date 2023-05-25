import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LongPressGestureHandler, State } from 'react-native-gesture-handler';

interface CardProps {
  product: {
    image: string;
    price: number;
  };
}

const Card = ({ product }: CardProps) => {
  const [quantity, setQuantity] = useState(1);
  const [zoomed, setZoomed] = useState(false);

  const addToCart = () => {
    console.log(`Agregaste ${quantity} unidades al carrito por un total de ${product.price * quantity} dólares`);
  };

  const handlePressIn = () => {
    setZoomed(true);
  };

  const handlePressOut = () => {
    setZoomed(false);
  };

  return (
    <View style={[styles.card]}>
      <LongPressGestureHandler
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.ACTIVE) {
            handlePressIn();
          } else if (nativeEvent.state === State.END) {
            handlePressOut();
          }
        }}
      >
        <View>
          <Image source={{ uri: product.image }} style={[styles.image, zoomed && styles.zoomed]} />
        </View>
      </LongPressGestureHandler>
      <View style={styles.content}>
        <Text style={[styles.title, zoomed && styles.hiddenText]}>Nombre del producto</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.title}>Categoria</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity style={styles.quantityButton} onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity style={styles.quantityButton} onPress={() => setQuantity(quantity + 1)}>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
        <Text style={styles.addToCartButtonText}>Agregar al carrito</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
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
    width: '48%',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 10,
  },
  zoomed: {
    transform: [{ scale: 1.4 }],
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  quantityButton: {
    backgroundColor: '#ddd',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 16,
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  addToCartButton: {
    backgroundColor: '#C141AA',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
  },
  addToCartButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  hiddenText: {
    opacity: 0,
  },
});

export default Card;
