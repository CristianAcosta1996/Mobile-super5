import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl, ActivityIndicator } from 'react-native';
import { useGetReclamosQuery } from '../../../store/super5/super5Api';
import { useTheme } from 'react-native-paper';

const ReclamosScreen = () => {
  const { data: reclamos, isLoading, refetch: refetchReclamos } = useGetReclamosQuery();
  const [refreshing, setRefreshing] = useState(false);
  const theme = useTheme();
  const handleRefresh = async () => {
      setRefreshing(true);
      try {
        await refetchReclamos();
      } catch (error) {
        console.error('Error al obtener las compras:', error);
      }
      setRefreshing(false);
    };
  // Muestra un indicador de carga mientras se está actualizando
    const renderRefreshControl = () => (
      <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
    );
  if (isLoading) {
    return (
      <View style={styles.containerLoading}>
        <Text>Cargando Reclamos...</Text>
        <ActivityIndicator animating={true} color={theme.colors.primary} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Lista de Reclamos</Text>
      <ScrollView contentContainerStyle={styles.reclamosContainer} refreshControl={renderRefreshControl()}>
        {reclamos && reclamos.length > 0 ? (
          reclamos.map((reclamo) => (
            <View key={reclamo.id} style={styles.reclamoItem}>
              <Text style={styles.label}>ID del reclamo</Text>
              <Text style={styles.data}>{reclamo.id}</Text>
              <Text style={styles.label}>Estado</Text>
              <Text style={styles.data}>{reclamo.estado}</Text>
              <Text style={styles.label}>Comentario del cliente</Text>
              <Text style={styles.data}>{reclamo.comentario}</Text>
              {reclamo.comentarioSucursal && 
                <>
                  <Text style={styles.label}>Comentario de la sucursal</Text>
                  <Text style={styles.data}>{reclamo.comentarioSucursal}</Text>
                </>
              }
              <Text style={styles.label}>Tipo</Text>
              <Text style={styles.data}>{reclamo.tipo}</Text>
              <Text style={styles.label}>ID de la venta</Text>
              <Text style={styles.data}>{reclamo.venta.id}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noReclamosText}>No hay reclamos disponibles</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5', // Color de fondo principal
  },
  containerLoading: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },  
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  reclamosContainer: {
    paddingBottom: 16,
  },
  reclamoItem: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF', // Fondo blanco
    padding: 16,
    borderRadius: 8,
    elevation: 8, // Sombra para mayor contraste
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#0066FF', // Color del texto del encabezado
    textDecorationLine: 'underline', // Subrayado
  },
  data: {
    color: '#333333', // Color del texto de los datos
  },
  noReclamosText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333333', // Color del texto para "No hay reclamos disponibles"
  },
});

export default ReclamosScreen;
