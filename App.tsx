import React from 'react';
import { PaperProvider } from 'react-native-paper';
import AppNavigator from './structure/navigation/app.navigator';



const App = () => {
  return (
    <PaperProvider>
      <AppNavigator></AppNavigator>
    </PaperProvider>
  );
}

export default App;