import React, { useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { AppNavigation } from './src/Navigation/AppNavigation';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { AuthContext } from './src/AuthContext'; // Agrega el contexto de autenticación

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar el inicio de sesión

  return (
    <Provider store={store}>
      <PaperProvider>
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
          <AppNavigation />
        </AuthContext.Provider>
      </PaperProvider>
    </Provider>
  );
}
