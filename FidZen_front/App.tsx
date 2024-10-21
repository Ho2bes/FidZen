import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FirstPage from './src/components/FirstPage';
import LoginPage from './src/components/LoginPage';
import RegisterPage from './src/components/RegisterPage';
import HomePage from './src/components/HomePage';
import TermsContract from './src/components/TermsContract';
import ProfilePage from './src/components/ProfilePage'; // Import de la page profil

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FirstPage">
        <Stack.Screen
          name="FirstPage"
          component={FirstPage}
          options={{ headerShown: false }} // Masquer le header si nécessaire
        />
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterPage"
          component={RegisterPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TermsContract"
          component={TermsContract}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfilePage"
          component={ProfilePage}
          options={{ headerShown: false }} // Masquer le header si nécessaire
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
