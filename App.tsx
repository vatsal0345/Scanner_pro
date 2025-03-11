import React from 'react';
import MainRoutes from './src/routes/MainRoutes';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from './src/theme/ThemeContext';
const App = () => {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <MainRoutes />
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
