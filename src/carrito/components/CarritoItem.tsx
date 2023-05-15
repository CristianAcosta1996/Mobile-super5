import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import {
  Avatar,
  Badge,
  Button,
  IconButton,
  Text,
  useTheme,
} from "react-native-paper";
import { useCarrito } from "../hooks/useCarrito";

export const CarritoItem = () => {
  const {
    cantidadProducto,
    aumentarCantidadProducto,
    reducirCantidadProducto,
  } = useCarrito();

  const theme = useTheme();
  return (
    <View style={styles.card}>
      <IconButton
        icon="trash-can"
        mode="contained"
        containerColor="red"
        iconColor="white"
        size={18}
        style={styles.deleteBtn}
        onPress={() => console.log("quite el producto")}
      />
      <View style={styles.cardImageContainer}>
        <Image
          source={{ uri: "https://picsum.photos/200" }}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <View style={styles.cardContent}>
        <Text numberOfLines={1} variant="bodyMedium">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi error
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique
          vel officia minus dignissimos obcaecati itaque tempora neque accusamus
          nobis exercitationem a eaque, ipsa eum quibusdam in ex sed harum iste?
          p
        </Text>
        <Text style={{ marginTop: 15 }} variant="labelLarge">
          $Precio
        </Text>
      </View>
      <View
        style={[
          styles.cantidadContainer,
          { backgroundColor: theme.colors.primary },
        ]}
      >
        <Button mode="text" textColor="white" onPress={reducirCantidadProducto}>
          -
        </Button>
        <Text style={{ color: "white" }} variant="bodyLarge">
          {cantidadProducto}
        </Text>
        <Button
          mode="text"
          textColor="white"
          onPress={aumentarCantidadProducto}
        >
          +
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "95%",
    backgroundColor: "white",
    height: 85,
    borderRadius: 9,
    paddingHorizontal: 10,
    paddingVertical: 5,
    elevation: 5,
    flexDirection: "row",
    gap: 8,
    marginBottom: 30,
  },
  cardContent: {
    flex: 1,
    overflow: "hidden",
    paddingTop: 12,
  },
  cardImageContainer: { width: "25%", backgroundColor: "red" },
  cantidadContainer: {
    position: "absolute",
    width: "40%",
    height: 40,
    borderRadius: 20,
    flexDirection: "row",
    top: "73%",
    right: -20,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteBtn: {
    position: "absolute",
    top: -12,
    right: -18,
    zIndex: 1,
  },
});
