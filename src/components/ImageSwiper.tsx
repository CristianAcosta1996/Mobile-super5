import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-swiper';

const ImageSwiper = () => {
  const productImages = [
    
    'https://th.bing.com/th/id/R.837a8250e601ea514120fc8bf0632f2a?rik=35U3W3o4rb8hXQ&riu=http%3a%2f%2fimg2.rtve.es%2fimagenes%2fmayoria-alimentos-sanos-no-pueden-probar-cientificamente-sean%2f1212587585377.jpg&ehk=XNBCrtnwmGkGyHUIIIOsruM2AMxJZyCjkNQ1KOMXl70%3d&risl=&pid=ImgRaw&r=0',
    'https://via.placeholder.com/300',
    'https://via.placeholder.com/300',
    'https://via.placeholder.com/300',
    'https://via.placeholder.com/300',
    'https://via.placeholder.com/300',
  ];

  const renderImages = () => {
    return productImages.map((image, index) => (
      <View key={index} style={styles.slide}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Swiper
        style={styles.wrapper}
        autoplay
        autoplayTimeout={5}
        showsPagination={true}
      >
        {renderImages()}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200, // Establece una altura fija para el componente ImageSwiper
    paddingTop: 20,
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default ImageSwiper;
