import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import Login from './screens/Login/Login';
import Cadastro from './screens/Cadastro/Cadastro';
import CadastroConcluido from './screens/CadastroConcluido/CadastroConcluido';
import Onboarding from './screens/Onboarding/Onboarding';


// Definindo os tipos das rotas
export type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  CadastroConcluido: undefined;
  Onboarding: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#000000" />
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{
          headerShown: false, // Remove o header padrão
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="CadastroConcluido" component={CadastroConcluido} />
         <Stack.Screen name="Onboarding" component={Onboarding} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}