import React from 'react';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { PetProvider } from './src/contexts/PetContext';
import { AdoptionProvider } from './src/contexts/AdoptionContext';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  return (
    <PetProvider>
      <AdoptionProvider>
        <StatusBar style="auto" />
        <AppNavigator />
      </AdoptionProvider>
    </PetProvider>
  );
}
