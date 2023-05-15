import React, { useState } from "react";
import { ActivityIndicator, Avatar, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { Searchbar } from "react-native-paper";

export const BuscarScreen = () => {
  const [search, setSearch] = useState("");
  const onChangeSearch = (query: string) => {
    setSearch(query);
  };
  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={{ marginBottom: 20 }}>
        Encuentra el producto que estas buscando...
      </Text>
      <Searchbar
        placeholder="Busca tu producto"
        value={search}
        onChangeText={onChangeSearch}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 60,
          paddingTop: 40,
        }}
      >
        {!search ? (
          <Avatar.Icon icon="shopping-search" color="white" size={200} />
        ) : (
          <ActivityIndicator animating size={80} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 50,
  },
});
