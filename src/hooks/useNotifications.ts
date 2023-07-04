import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Text, View, Button, Platform, Alert } from 'react-native';
import { useGetComprasQuery } from '../store/super5/super5Api';
import { useState } from 'react';
import { CompraDTO } from '../interfaces/interfaces';
export const useNotifications = () => {
    const { data: compras } = useGetComprasQuery();
    const [expoPushToken, setExpoPushToken] = useState<string>('');
    const [permitirNot, setPermitirNot] = useState(false);
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }),
      });
      
      async function sendNotificationCompraConfirmada(expoPushToken: String, compras: CompraDTO[], compra: CompraDTO) {
        const productos = compra.carrito.map((producto) => producto.producto).join(', ');
  
        const notificationContent = {
          title: 'Super5 - Compra',
          body: `Su compra N°: ${compra.id} ha sido confirmada!\n ${productos} \n Total: ${compra.precio}  .`,
          data: { 
            data: compras,
            productos: productos
          },
        };
      
        const notificationRequest = {
          content: notificationContent,
          trigger: null,
        };
      
        const notificationId = await Notifications.scheduleNotificationAsync(notificationRequest);
        console.log('Notificación de compra confirmada enviada, ID:', notificationId);
      }
      
    return { permitirNot, expoPushToken, setExpoPushToken, sendNotificationCompraConfirmada }
}
