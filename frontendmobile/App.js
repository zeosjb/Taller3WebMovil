import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './src/navigator/Navigator';
import { AuthProvider } from './src/context/AuthContext';

import { Provider as PaperProvider } from 'react-native-paper';

const AppState = ({ children }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
};

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <AppState>
          <Navigator />
        </AppState>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
