import { Linking } from 'expo';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Home: 'Home',
      ConfirmarCompra: 'ConfirmarCompra',
    },
  },
};
