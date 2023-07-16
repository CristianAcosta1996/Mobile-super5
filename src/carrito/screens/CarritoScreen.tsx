import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { CustomDivider } from '../../components/CustomDivider';
import { CarritoItem } from '../components/CarritoItem';
import { useAppSelector } from '../../hooks/storeHooks';
import { useCarrito } from '../hooks/useCarrito';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { Feather, Ionicons } from '@expo/vector-icons';
import ModalSucursal from '../../screens/Home/components/ModalSucursal';
import ModalDirecciones from '../../screens/PerfilUsuario/components/ModalDirecciones';
import { useNavigation } from '@react-navigation/native';
import { useValidarCuponMutation } from '../../store/super5/super5Api';
import { PromocionDTO } from '../../interfaces/interfaces';
interface CarritoItem {
  id: number;
  nombre: string;
  imagen: string;
  precio: number;
  stock: number;
  descripcion: string;
  categoriaId: number;
  cantidad: number;
}

export const CarritoScreen = () => {
  const theme = useTheme();
  const { carrito, sucursal} = useAppSelector((state) => state.super5);
  const { 
    precioTotalCarrito, 
    limpiarElCarrito, 
    handlePagarCompra,
    subTotal,
    cupon,
    setCupon,
    cuponAplicado,
    setCuponAplicado,
    direccionId,
    setDireccionId,
    modoEnvio,
    setModoEnvio,
    setCuponDescuento,
    cuponDescuento,
    mostrarSeccion, 
    setMostrarSeccion
  
  } = useCarrito();
  const navigation: any = useNavigation();
  const [direccion, setDireccion] = useState('');
  const [sucursalName, setSucursalName] = useState('');
  const [sucursalNumber, setSucursalNumber] = useState('');
  
 
  //const [mostrarSeccion, setMostrarSeccion] = useState(false);
  const [modalSucursalVisible, setModalSucursalVisible] = useState(false);
  const [modalDireccionVisible, setModalDireccionVisible] = useState(false);

  const [startValidarCupon, { isLoading }] = useValidarCuponMutation();

  const handleAplicarDescuento = () => {
    if (cupon !== '') {
      startValidarCupon({ cuponDescuentoVenta: cupon })
            .unwrap()
            .then((resp) => {
              console.log(resp);
              if (typeof resp === "string") return;
             // handleOnSucces(resp);
             setCuponDescuento(resp);
            })
            .catch((err) => {
              console.log(err);
              
              setCupon('');
              alert('Cupon no valido');
              //handleSnackbar({ isError: true, show: true, message: err.data });
              //handleOnSucces(null);
            });


      // Lógica para aplicar el descuento
      setCuponAplicado(true);
      
    } else {
      setCuponAplicado(false);
    }
  };
  const closeModal = () => {
    setModalSucursalVisible(false);
    setModalDireccionVisible(false);
  };

  const handleSeleccionarDireccion = () => {
    setModoEnvio('DOMICILIO');
    setModalDireccionVisible(true);
  };

  const handleSeleccionarSucursal = () => {
    setModoEnvio('SUCURSAL');
    setSucursalName(sucursal.nombre)
    
    setModalSucursalVisible(true);
  };
  const { status } = useAppSelector(state => state.auth);
  const handleContinuar = () => {
    if (status === "authenticated") {
      setMostrarSeccion(true);
      
    } else {
      Alert.alert(
        'Iniciar sesion para continuar',
        'Debe iniciar sesion para realizar la compra',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Iniciar sesion', onPress: handleIniciarSesion, style: 'destructive' }
        ]
      );
    }
  };
  const handleIniciarSesion = () => {
    navigation.navigate('Login');
  }
  const renderCarritoItems = () => {
    return carrito.map((item) => <CarritoItem key={item.producto.id} product={item} />);
  };

    const handleCancelarSeleccion = () => {
    setDireccion('');
    setSucursalName('');
    setModoEnvio('');
  };
  return (
    <View style={styles.container}>
       
       {carrito.length > 0 ? (
        <>
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
        </>
        ):(
          <>
          
          <View style={styles.containerCartEmpty}>
      <Ionicons name="cart-outline" size={80} color="#FF0056" />
      <Text style={styles.title}>¡Tu carrito está vacío!</Text>
      <Text style={styles.subtitle}>Agrega algunos productos increíbles para comenzar tu experiencia de compra.</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('Home');
        }}
      >
        <Ionicons name="home" size={50} color="#FF0056" />
      </TouchableOpacity>
    </View>
            
          </>
        )}
        
        
      {!mostrarSeccion && (
      <>
        {carrito.length > 0 && (
          <Button
            mode="contained"
            onPress={handleContinuar}
            style={{ marginBottom: 10 }}
          >
            Continuar
          </Button>
        )}

       </>
      )}
      {modoEnvio === 'DOMICILIO' && modalDireccionVisible && (
        <ModalDirecciones
        selectedDireccion={direccion}
        setSelectedDireccion={setDireccion}
        visible={modalDireccionVisible}
        setVisible={setModalDireccionVisible}
        selectedDireccionId={direccionId}
        setSelectedDireccionId={setDireccionId}
        />
      )}

      {mostrarSeccion && (
        <>
          <View style={styles.containerView}>
            <View style={styles.addressContainer}>
              <Icon name="home" size={24} color="#7e57c2" style={styles.icon} />
              {
                !direccion && <Text style={styles.selectionText}>Envio a domicilio</Text>
              }
              <Text style={styles.selectionText}>{direccion}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSeleccionarDireccion}>
              <Feather
                name={modoEnvio === 'DOMICILIO' ? 'check-circle' : 'circle'}
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.containerView}>
            <View style={styles.addressContainer}>
              <Icon name="map-marker" size={24} color="#7e57c2" style={styles.icon} />
              {
                !sucursalName ?
                ( <Text style={styles.selectionText}>Retiro en sucursal</Text>)
                :
                (<Text style={styles.selectionText}>Retiro en sucursal: {sucursalName}</Text>)
              }
              </View>
            <TouchableOpacity style={styles.button} onPress={handleSeleccionarSucursal}>
              <Feather
                name={modoEnvio === 'SUCURSAL' ? 'check-circle' : 'circle'}
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>


          <Input
            style={styles.input}
            placeholder="Ingresar cupón de descuento"
            leftIcon={<Icon name="tag" size={24} color="#7e57c2" />}
            rightIcon={
              <TouchableOpacity
                style={styles.button}
                onPress={handleAplicarDescuento}
              >
                <Feather
                  name={cuponAplicado && cupon ? 'check-circle' : 'arrow-right-circle'}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            }
            value={cupon}
            onChangeText={setCupon}
          />
          <View style={styles.finalizarCompraContainer}>
  <View style={styles.valorTotalContainer}>
    {cuponAplicado && cupon && (
      <>
        <View style={styles.textContainer}>
          <Text style={{ fontSize: 24 }}>Sub Total:</Text>
          <Text style={styles.textValue}>$ {subTotal}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={{ fontSize: 24 }}>Descuento:</Text>
          <Text style={styles.textValue}>- $ {cuponDescuento?.importeDescuentoVenta}</Text>
        </View>
      </>
    )}
    <View style={styles.textContainer}>
      <Text style={{ fontSize: 24 }}>Total:</Text>
      <Text style={styles.textValue}>$ {precioTotalCarrito}</Text>
    </View>
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

  <Button mode="contained" icon="cash-register" onPress={handlePagarCompra}>
    Finalizar Compra
  </Button>
</View>


        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    height: 50,
    marginRight: 2,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  icon: {
    marginRight: 10,
    marginLeft: 1,
  },
  selectionText: {
    flex: 1,
  },
  buttonAddress: {
    marginLeft: 1,
    paddingHorizontal: 12,
  },
  
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  valorTotalContainer: {
    alignItems: 'center',

  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Alinear elementos a izquierda y derecha
    alignItems: 'center',
    marginBottom: 3,
    
  },
  textValue: {
    textAlign: 'right', // Alinear el valor a la derecha
    paddingLeft: 60,
    fontSize: 24
  },
  containerCartEmpty: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderColor: '#ccc',
  },
  button: {
    paddingHorizontal: 12,
  },
  buttonTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
