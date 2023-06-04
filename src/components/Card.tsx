import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LongPressGestureHandler, State } from 'react-native-gesture-handler';
import { useCarrito } from '../carrito/hooks/useCarrito';
import { Producto } from '../interfaces/interfaces';
import { useListarCategoriasMutation } from "../store/super5/super5Api";

interface CardProps {
  product: Producto;
  
}

export const Card = ({ product }: CardProps) => {
  const [quantity, setQuantity] = useState(1);
  const [zoomed, setZoomed] = useState(false);
  const { agregarItemAlCarrito } = useCarrito();
  const [categoria, setCategoria] = useState();
  const [listarCategorias, { data, isLoading, isError }] = useListarCategoriasMutation();

  const addToCart = () => {
    console.log(`Agregaste ${quantity} unidades al carrito por un total de ${product.precio * quantity} dólares`);
    agregarItemAlCarrito(product, quantity);
  };

  const handlePressIn = () => {
    setZoomed(true);
  };

  const handlePressOut = () => {
    setZoomed(false);
  };

  

  useEffect(() => {
    listarCategorias();
  }, []);

  useEffect(() => {
    if (data) {
      let categoriaName;
      data.map(cat => {
        if (cat.id === product.categoriaId) {
          categoriaName = cat.nombre;
        }
      });
      setCategoria(categoriaName)
    }
  }, [data]);
  

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
          <Image source={{ uri: product.imagen }} style={[styles.image, zoomed && styles.zoomed]} />
        </View>
      </LongPressGestureHandler>
      <View style={styles.content}>
       <View style={[styles.categoriaContainer, zoomed && styles.hiddenText]}>
       <Text style={[styles.categoria, zoomed && styles.hiddenText]}>{categoria}</Text>

       </View>
        <Text style={[styles.title, zoomed && styles.hiddenText]}>{product.nombre}</Text>
        <Text style={styles.price}>$ {product.precio}</Text>
        <Text style={styles.descripcion}>{product.descripcion}</Text>
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
  categoriaContainer: {
    backgroundColor: '#FFDCFE',
    borderRadius: 4,
    marginBottom: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    padding: 5,
  },
  categoria: {
    fontWeight: 'bold',
  },
  descripcion: {
    fontSize: 12,
  },
});

export default Card;
