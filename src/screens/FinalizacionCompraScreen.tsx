import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { limpiarCarrito } from '../store/super5/thunks';
import { CompraDTO } from '../interfaces/interfaces';
import { useNavigation } from '@react-navigation/native';
import { useGenerarPagoMutation } from "../store/super5/super5Api";
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Gif from 'react-native-gif';

export const FinalizacionCompraScreen = () => {
    const navigation: any = useNavigation();
    const [startGenerarPago, { isLoading, data }] = useGenerarPagoMutation();
    const [compraDto, setCompraDto] = useState<CompraDTO | null>(null);
    const [error, setError] = useState<boolean>(false);
    const { compraPaypal } = useAppSelector((state) => state.super5);
    const navigate = useNavigation();
    const dispatch = useAppDispatch();
    const theme = useTheme();
    useEffect(() => {
     startGenerarPago(compraPaypal).unwrap().then((resp: any) => {
       setCompraDto(resp.data);
       dispatch(limpiarCarrito())
     }).catch(error=> {
       console.log(error); 
       setError(true)
     });

  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {!error ? (
        <View style={{ alignItems: 'center', marginTop: 16 }}>
          <Gif
            source={require('../../assets/confirmado.gif')}
            style={{ width: 200, height: 200 }}
            resizeMode="cover"
          />
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
            <Animatable.View animation="slideInDown" duration={1000} delay={50}>
              <Icon name="check" size={50} color="green" style={{ alignSelf: 'center' }} />
            </Animatable.View>
            <Text style={{ marginLeft: 8, fontSize: 18 }}>Compra realizada con éxito</Text>
         </View>
        </View>
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
          <View>
            <ActivityIndicator animating={true} color={theme.colors.primary} />
          </View>
          <Text style={{ marginLeft: 8, fontSize: 18 }}>
            Fallo intento de compra, comuníquese con la tienda...
          </Text>
        </View>
      )}
      <Button
        title="Ir al Home"
        onPress={() => {
            navigation.navigate('Home');
        }}
      />
    </View>
  );
};
export default FinalizacionCompraScreen;