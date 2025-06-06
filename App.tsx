import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View } from 'react-native';

import { AuthProvider, useAuth } from './src/context/authContext';
import authService from './src/services/auth.service';

import Onboarding from './screens/Onboarding/Onboarding';
import Login from './screens/Login/Login';
import Cadastro from './screens/Cadastro/Cadastro';
import CadastroConcluido from './screens/CadastroConcluido/CadastroConcluido';
import GuiaAlagamento from './screens/GuiaAlagamento/GuiaAlagamento';
import GuiaDeslizamento from './screens/GuiaDeslizamento/GuiaDeslizamento';
import GuiaQueimada from './screens/GuiaQueimada/GuiaQueimada';
import GuiaSeca from './screens/GuiaSeca/GuiaSeca';
import GuiaAvalanche from './screens/GuiaAvalanche/GuiaAvalanche';
import GuiaTornado from './screens/GuiaTornado/GuiaTornado';
import PoliticaDePrivacidade from './screens/PoliticaDePrivacidade/PoliticaDePrivacidade';
import Perfil from './screens/Perfil/Perfil';
import BottomTabNavigator from './navigation/BottomTabNavigator';

// Definindo os tipos das rotas
export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Cadastro: undefined;
  CadastroConcluido: undefined;
  MainTabs: undefined;
  GuiaAlagamento: undefined;
  GuiaDeslizamento: undefined;
  GuiaQueimada: undefined;
  GuiaSeca: undefined;
  GuiaAvalanche: undefined;
  GuiaTornado: undefined;
  PoliticaDePrivacidade: undefined;
  Perfil: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Componente de Loading
const LoadingScreen = () => (
  <View style={{ 
    flex: 1, 
    backgroundColor: '#000000', 
    justifyContent: 'center', 
    alignItems: 'center' 
  }}>
    <ActivityIndicator size="large" color="#1DB954" />
  </View>
);

// Componente interno que usa o contexto de auth
const AppNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#000000" />
      <Stack.Navigator
        initialRouteName={isAuthenticated ? "MainTabs" : "Onboarding"}
        screenOptions={{
          headerShown: false,
        }}
      >
        {isAuthenticated ? (
          // Usuário autenticado - mostrar telas protegidas
          <>
            <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
            <Stack.Screen name="GuiaAlagamento" component={GuiaAlagamento} />
            <Stack.Screen name="GuiaDeslizamento" component={GuiaDeslizamento} />
            <Stack.Screen name="GuiaQueimada" component={GuiaQueimada} />
            <Stack.Screen name="GuiaSeca" component={GuiaSeca} />
            <Stack.Screen name="GuiaAvalanche" component={GuiaAvalanche} />
            <Stack.Screen name="GuiaTornado" component={GuiaTornado} />
            <Stack.Screen name="PoliticaDePrivacidade" component={PoliticaDePrivacidade} />
            <Stack.Screen name="Perfil" component={Perfil} />
          </>
        ) : (
          // Usuário não autenticado - mostrar telas de auth
          <>
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Cadastro" component={Cadastro} />
            <Stack.Screen name="CadastroConcluido" component={CadastroConcluido} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Componente principal do App
export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}