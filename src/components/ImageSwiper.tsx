import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-swiper';

const ImageSwiper = () => {
  const productImages = [
    require('../../assets/1.png'), 
    require('../../assets/2.png'),
    require('../../assets/3.png'),
    require('../../assets/4.png'),
    require('../../assets/5.png'),
  ];

  const renderImages = () => {
    return productImages.map((image, index) => (
      <View key={index} style={styles.slide}>
        <Image source={image} style={styles.image} /> 
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Swiper
        style={styles.wrapper}
        autoplay
        autoplayTimeout={3}
        showsPagination={true}
      >
        {renderImages()}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
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
