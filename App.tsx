import React, { useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { AppNavigation } from './src/Navigation/AppNavigation';
import { Provider } from 'react-redux';
import { store } from './src/store/store';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar el inicio de sesión

  return (
    <Provider store={store}>
      <PaperProvider>
          <AppNavigation />
      </PaperProvider>
    </Provider>
  );
}
