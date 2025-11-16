import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CustomDrawerContent } from './CustomDrawerContent';

// Screens
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { PetDetailsScreen } from '../screens/PetDetailsScreen';
import { AdoptionFormScreen } from '../screens/AdoptionFormScreen';
import { FAQScreen } from '../screens/FAQScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// Stack Navigator para as telas relacionadas aos pets
const PetStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="PetDetails" component={PetDetailsScreen} />
      <Stack.Screen name="AdoptionForm" component={AdoptionFormScreen} />
    </Stack.Navigator>
  );
};

// Drawer Navigator principal
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        overlayColor: 'rgba(0,0,0,0.5)',
      }}
    >
      <Drawer.Screen name="Home" component={PetStack} />
      <Drawer.Screen name="FAQ" component={FAQScreen} />
    </Drawer.Navigator>
  );
};

// Root Navigator
export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Main" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
