import Feather from "react-native-vector-icons/Feather";
import jsPDF from 'jspdf';
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  SafeAreaView,
  Alert,
  RefreshControl,
} from "react-native";
import { ActivityIndicator, DataTable, useTheme } from "react-native-paper";
import {
  useCancelarCompraMutation,
  useGetComprasQuery,
  useGetProductosQuery,
} from "../../../store/super5/super5Api";
import { CarritoDto, CompraDTO, Producto } from "../../../interfaces/interfaces";
import ModalReclamos from "../components/ModalReclamos";
import ModalShoppingCart from "../components/ModalShoppingCart";
import dayjs from "dayjs";
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import * as Notifications from 'expo-notifications';
export const PedidosScreeen = (props: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalCartVisible, setModalCartVisible] = useState(false);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [idCompra, setIdCompra] = useState<number | undefined>(undefined);
  const [sucursalID, setSucursalID] = useState<number | undefined>(undefined);
  const [compra, setCompra] = useState<CompraDTO | undefined>(undefined);
  const theme = useTheme();
  const [exportingPDF, setExportingPDF] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const { data: compras, isLoading, refetch: refetchCompras } = useGetComprasQuery();
  //const { data: productos } = useGetProductosQuery(String(sucursalID));
  
  
    const { data: productos } = useGetProductosQuery(String(sucursalID));
    // Resto del código que utiliza la variable 'productos'
    console.log('Productos todos: ',productos);
    const productosFiltrados2 = compra?.carrito.map((carritoItem: CarritoDto, carritoIndex: number) => ( 
      productos?.filter(producto => producto.id == String(carritoItem.producto_id))
    ) )
    
  console.log('id de la compra seleccionada>>>> ',idCompra); 

  console.log('Productos filtradosDOS: ',productosFiltrados2);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refetchCompras();
    } catch (error) {
      console.error('Error al obtener las compras:', error);
    }
    setRefreshing(false);
  };
 // Muestra un indicador de carga mientras se está actualizando
  const renderRefreshControl = () => (
    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
  );
  const [startCancelarCompra] = useCancelarCompraMutation();
  
  const handleReclamo = (id_compra?: number) => {
    console.log("reclamo");
    setModalVisible(true); 
    setIdCompra(id_compra); 
  };

  const handleShoppingCart = (id_compra?: number, id_sucursal?: number, compra?: CompraDTO) => {
    console.log("ver carrito");
    setModalCartVisible(true);
    setIdCompra(id_compra); // Establecer el estado del id_compra
    setSucursalID(id_sucursal);
    setCompra(compra);
  };
/*
  const handleExportPDF = async (compra?: CompraDTO) => {
    console.log("Exportar a PDF la compra seleccionada");
    setExportingPDF(true); // Establecer el estado de exportingPDF a true para mostrar el indicador de carga
  
    const { status } = await MediaLibrary.requestPermissionsAsync();
  
    if (status === "granted") {
      try {
        const html = `
          <html>
            <body>
              <h1>Detalles de la compra</h1>
              <p>ID Compra: ${compra?.id}</p>
              <p>Forma de entrega: ${compra?.formaEntrega}</p>
              <p>Estado: ${compra?.estado}</p>
              <p>Precio: $${compra?.precio}</p>
              <p>Fecha de compra: ${dayjs(compra?.fechaCompra).format(
                "DD/MM/YYYY HH:mm"
              )}</p>
            </body>
          </html>
        `;
  
        const { uri } = await Print.printToFileAsync({ html });
  
        console.log("Archivo PDF guardado en la biblioteca de medios");
  
        // Notificar
        const notificationContent = {
          title: "Descarga completa",
          body: "Su compra se ha exportado a PDF correctamente",
        };
  
        Notifications.scheduleNotificationAsync({
          content: notificationContent,
          trigger: null,
        });
  
        // Compartir el archivo PDF
        await shareAsync(uri);
  
        setExportingPDF(false); // Establecer el estado de exportingPDF a false para ocultar el indicador de carga
      } catch (error) {
        console.log("Error al exportar la compra a PDF:", error);
        setExportingPDF(false); // Establecer el estado de exportingPDF a false en caso de error
      }
    } else {
      console.log("Permisos denegados");
      alert("Permisos denegados");
      setExportingPDF(false); // Establecer el estado de exportingPDF a false si se deniegan los permisos
    }
  };
*/

const handleExportPDF = async (compra?: CompraDTO) => {

  console.log("Exportar a PDF la compra seleccionada");
  setIdCompra(compra?.id);
  setSucursalID(compra?.sucursal_id);
  setCompra(compra);
  setExportingPDF(true); // Establecer el estado de exportingPDF a true para mostrar el indicador de carga

  const { status } = await MediaLibrary.requestPermissionsAsync();

  if (status === "granted") {
    try {
      let productosHTML = '';
      
        compra?.carrito.forEach((carritoItem: CarritoDto) => {
          const cantidad = carritoItem?.cantidad ?? '';
          console.log(carritoItem?.cantidad);
          const nombreProducto = carritoItem?.producto ?? '';
          console.log(carritoItem?.producto);
          const productoId = carritoItem?.producto_id ?? '';
          console.log(carritoItem?.producto_id);
          const productHTML = `
            <style>
              .product-table {
                width: 100%;
                border-collapse: collapse;
              }
              
              .product-table th,
              .product-table td {
                border: 1px solid #ccc;
                padding: 8px;
                text-align: left;
              }
              
              .product-table th {
                background-color: #f2f2f2;
                font-weight: bold;
              }
              
              .product-image {
                max-width: 100px;
                height: auto;
              }
            </style>
            
            <table class="product-table">
              <thead>
                <tr>
                  <th>ID Producto</th>
                  <th>Nombre</th
                  <th>Cantidad</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${productoId}</td>
                  <td>${nombreProducto}</td>
                  <td>${cantidad}</td>
                 
                </tr>
              </tbody>
            </table>
          `;
            
          productosHTML += productHTML;
        });
    
      
      const html = `
        <html>
          <style>
            .logo-image {
              max-width: 100px;
              height: auto;
            }
          </style>
          <body>
            <img src="../../../../assets/imagenSinFondo.png" alt="logo" class="logo-image">
            <h1>Detalles de la compra</h1>
            <p>ID Compra: ${compra?.id}</p>
            <p>Forma de entrega: ${compra?.formaEntrega}</p>
            <p>Estado: ${compra?.estado}</p>
            <p>Precio: $${compra?.precio}</p>
            <p>Fecha de compra: ${dayjs(compra?.fechaCompra).format("DD/MM/YYYY HH:mm")}</p>
            <p>Fecha de confirmacion: ${dayjs(compra?.fechaConfirmacion).format("DD/MM/YYYY HH:mm")}</p>
            <h2>Detalles de los productos</h2>
            ${productosHTML}
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html });

      console.log("Archivo PDF guardado en la biblioteca de medios");

      // Notificar
      const notificationContent = {
        title: "Descarga completa",
        body: "Su compra se ha exportado a PDF correctamente",
      };

      Notifications.scheduleNotificationAsync({
        content: notificationContent,
        trigger: null,
      });


      // Compartir el archivo PDF
      await shareAsync(uri);

      setExportingPDF(false); // Establecer el estado de exportingPDF a false para ocultar el indicador de carga
    } catch (error) {
      console.log("Error al exportar la compra a PDF:", error);
      setExportingPDF(false); // Establecer el estado de exportingPDF a false en caso de error
    }
  } else {
    console.log("Permisos denegados");
    alert("Permisos denegados");
    setExportingPDF(false); // Establecer el estado de exportingPDF a false si se deniegan los permisos
  }
};


  const handleCancelar = (compra: CompraDTO) => {
    Alert.alert(
      "Confirmación",
      "¿Estás seguro de que deseas cancelar la compra?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Cancelar compra",
          onPress: () => handleCancelarCompra(compra),
          style: "destructive",
        },
      ]
    );
  };


  const handleCancelarCompra = (compra: CompraDTO) => {
    startCancelarCompra(compra)
      .unwrap()
      .then(() => Alert.alert("Compra cancelada con éxito"))
      .catch(() => Alert.alert("Solo puede cancelar compras en estado PAGO"));
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Cargando compras...</Text>
        <ActivityIndicator animating={true} color={theme.colors.primary} />
      </View>
    );
  }

  if (!compras) {
    return <Text>No tienes compras realizadas</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mis Compras</Text>
      </View>

      <SafeAreaView style={styles.scrollContainer}>
        <ScrollView contentContainerStyle={styles.fieldContainer} refreshControl={renderRefreshControl()}>
          {compras.length > 0 ? (
            compras.map((compra: CompraDTO, index: number) => (
              <View key={index} style={styles.compraContainer}>
                <View style={styles.field}>
                  <View style={styles.tableRow}>
                  <Text style={styles.tableHeader}>Compra #{index + 1}</Text>
                  </View>
                  
                  <View style={styles.tableRow}>
                    <Text style={styles.tableLabel}>ID Compra:</Text>
                    <Text style={styles.tableValue}>{compra.id}</Text>
                  </View>

                  <View style={styles.tableRow}>
                    <Text style={styles.tableLabel}>Forma de entrega:</Text>
                    <Text style={styles.tableValue}>{compra.formaEntrega}</Text>
                  </View>

                  <View style={styles.tableRow}>
                    <Text style={styles.tableLabel}>Estado:</Text>
                    <Text style={styles.tableValue}>{compra.estado}</Text>
                  </View>

                  <View style={styles.tableRow}>
                    <Text style={styles.tableLabel}>Precio:</Text>
                    <Text style={styles.tableValue}>$ {compra.precio}</Text>
                  </View>

                  <View style={styles.tableRow}>
                    <Text style={styles.tableLabel}>Fecha de compra:</Text>
                    <Text style={styles.tableValue}>
                      {compra.fechaCompra && dayjs(compra.fechaCompra).format('DD/MM/YYYY HH:mm')}
                    </Text>
                  </View>
                  <View style={styles.tableRowButtons}>
                    <TouchableOpacity  style={styles.touchbutton}  onPress={() => handleReclamo(compra.id)}>
                      <Feather name="alert-triangle" size={24} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity  style={styles.touchbutton} onPress={() => handleShoppingCart(compra.id, compra.sucursal_id, compra)}>
                      <Feather name="shopping-cart" size={24} color="black" />
                    </TouchableOpacity>
                  
                    <TouchableOpacity disabled={exportingPDF}  style={styles.touchbutton} onPress={() => handleExportPDF(compra)}>
                      <Feather name="download" size={24} color="black" />
                    </TouchableOpacity>

                    {compra.estado === "PAGO" && (
                      <TouchableOpacity  style={styles.touchbutton} onPress={() => handleCancelar(compra)}>
                        <Feather name="x-circle" size={24} color="red" />
                      </TouchableOpacity>
                    )}
                  
                  </View>
                </View>

              </View>
            ))
          ) : (
            <Text>No tienes compras realizadas</Text>
          )}
        </ScrollView>
      </SafeAreaView>
      {modalCartVisible &&
                          <ModalShoppingCart
                            visible={modalCartVisible}
                            setVisible={setModalCartVisible}
                            idSucursal={sucursalID}
                            compraID={idCompra}
                            compra={compra}
                          />
                        }
      {modalVisible && <ModalReclamos visible={modalVisible} setVisible={setModalVisible} idCompra={idCompra} />}  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  scrollContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  fieldContainer: {
    padding: 20,
  },
  field: {
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 4,
    padding: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
    headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  loadingContainer: {
    alignSelf: "center",
    marginTop: 20,
  },
  compraHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  compraContainer: {
    marginBottom: 20,
    elevation: 12,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },
  },
  
  tableHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "blue", 
  },
  tableRow: {
    flexDirection: "row",
    marginBottom: 5,
    justifyContent: "space-between",
  },
  tableRowButtons:{
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  touchbutton: {
    backgroundColor: "#F2F2F2",
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
    marginHorizontal: 5,
  },
  tableLabel: {
    fontWeight: "bold",
    marginRight: 10,
  },
  tableValue: {
    flex: 1,
  },
  containerModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 1)",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    flex: 1,
    marginLeft: 10,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  text: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  confirmButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ccc",
    paddingVertical: 10,
    marginHorizontal: 16,
    marginVertical: 20,
    borderRadius: 4,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  map: {
    flex: 1,
  },
});


export default PedidosScreeen;
