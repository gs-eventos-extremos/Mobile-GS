import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, View } from 'react-native';

// Importar as telas que usarão o bottom tab
import Clima from '../screens/Clima/Clima';
import Guia from '../screens/Guia/Guia';
import Mapa from '../screens/Mapa/Mapa';
import Emergencia from '../screens/Emergencia/Emergencia';

export type BottomTabParamList = {
  Clima: undefined;
  Guia: undefined;
  Mapa: undefined;
  Emergencia: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

// Componente customizado para o tab bar
const CustomTabBar = (props: any) => {
  return (
    <View style={styles.customTabBarContainer}>
      <View style={styles.customTabBar}>
        {props.children}
      </View>
    </View>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Guia"
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#1DB954',
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarLabelStyle: styles.tabLabel,
        tabBarBackground: () => (
          <View style={styles.tabBarBackground}>
            <View style={styles.tabBarBorder} />
          </View>
        ),
      }}
    >
      <Tab.Screen
        name="Clima"
        component={Clima}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../assets/clima.png')}
              style={[styles.tabIcon, { tintColor: color }]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Guia"
        component={Guia}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../assets/guia.png')}
              style={[styles.tabIcon, { tintColor: color }]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Mapa"
        component={Mapa}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../assets/mapa.png')}
              style={[styles.tabIcon, { tintColor: color }]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Emergencia"
        component={Emergencia}
        options={{
          tabBarLabel: 'emergência',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../assets/emergencia.png')}
              style={[styles.tabIcon, { tintColor: color }]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    height: 90,
    paddingVertical: 12,
    paddingBottom: 20,
    paddingTop: 15, // Espaço superior entre borda e ícones
    elevation: 0,
    shadowOpacity: 0,
    position: 'absolute',
  },
  tabBarBackground: {
    flex: 1,
    backgroundColor: '#000000',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  tabBarBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#1DB954',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  customTabBarContainer: {
    backgroundColor: 'transparent',
  },
  customTabBar: {
    backgroundColor: '#000000',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 3,
    borderTopColor: '#1DB954',
  },
  tabIcon: {
    width: 28,
    height: 28,
    marginTop: 8, // Espaço entre a borda verde e os ícones
  },
  tabLabel: {
    fontSize: 14,
    fontFamily: 'Montserrat',
    fontWeight: 500,
    marginTop: 8, // Espaço entre ícones e texto
    marginBottom: 4, // Espaço inferior
  },
});

export default BottomTabNavigator;