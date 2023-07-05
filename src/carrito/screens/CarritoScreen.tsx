import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { CustomDivider } from '../../components/CustomDivider';
import { CarritoItem } from '../components/CarritoItem';
import { useAppSelector } from '../../hooks/storeHooks';
import { useCarrito } from '../hooks/useCarrito';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import ModalSucursal from '../../screens/Home/components/ModalSucursal';
import ModalDirecciones from '../../screens/PerfilUsuario/components/ModalDirecciones';

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
  const { carrito, sucursal } = useAppSelector((state) => state.super5);
  const { 
    precioTotalCarrito, 
    limpiarElCarrito, 
    handlePagarCompra,
    cupon,
    setCupon,
    cuponAplicado,
    setCuponAplicado,
    direccionId,
    setDireccionId,
    modoEnvio,
    setModoEnvio,
  
  } = useCarrito();

  const [direccion, setDireccion] = useState('');
  const [sucursalName, setSucursalName] = useState('');
  const [sucursalNumber, setSucursalNumber] = useState('');

 
  const [mostrarSeccion, setMostrarSeccion] = useState(false);
  const [modalSucursalVisible, setModalSucursalVisible] = useState(false);
  const [modalDireccionVisible, setModalDireccionVisible] = useState(false);

  const handleAplicarDescuento = () => {
    if (cupon !== '') {
      setCuponAplicado(true);
      // Lógica para aplicar el descuento
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

  const handleContinuar = () => {
    setMostrarSeccion(true);
  };

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
      {!mostrarSeccion && (
      <>
        <Button
          mode="contained"
          onPress={handleContinuar}
          style={{ marginBottom: 10 }}
        >
          Continuar
        </Button>
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
              <Text variant="displaySmall">Total: </Text>
              <Text variant="displaySmall">$ {precioTotalCarrito} </Text>
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
    width: '80%',
    marginVertical: 30,
  },
  valorTotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
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
