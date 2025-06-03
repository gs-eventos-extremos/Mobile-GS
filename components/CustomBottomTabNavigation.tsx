import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { CommonActions } from '@react-navigation/native';

type CustomBottomTabNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface CustomBottomTabProps {
  activeTab?: string;
}

const CustomBottomTab: React.FC<CustomBottomTabProps> = ({ activeTab = 'Guia' }) => {
  const navigation = useNavigation<CustomBottomTabNavigationProp>();

  const handleTabPress = (tab: string) => {
    // Navega para MainTabs e especifica qual tab deve ser ativa
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'MainTabs',
            state: {
              routes: [
                { name: 'Clima' },
                { name: 'Guia' },
                { name: 'Mapa' },
                { name: 'Emergencia' },
              ],
              index: getTabIndex(tab),
            },
          },
        ],
      })
    );
  };

  const getTabIndex = (tabName: string) => {
    switch (tabName) {
      case 'Clima': return 0;
      case 'Guia': return 1;
      case 'Mapa': return 2;
      case 'Emergencia': return 3;
      default: return 1; // Default para Guia
    }
  };

  const tabData = [
    {
      name: 'Clima',
      icon: require('../assets/clima.png'),
      label: 'Clima',
    },
    {
      name: 'Guia',
      icon: require('../assets/guia.png'),
      label: 'Guia',
    },
    {
      name: 'Mapa',
      icon: require('../assets/mapa.png'),
      label: 'Mapa',
    },
    {
      name: 'Emergencia',
      icon: require('../assets/emergencia.png'),
      label: 'emergência',
    },
  ];

  return (
    <View style={styles.tabBarBackground}>
      <View style={styles.tabBarBorder} />
      <View style={styles.tabBar}>
        {tabData.map((tab) => (
          <TouchableOpacity
            key={tab.name}
            style={styles.tabItem}
            onPress={() => handleTabPress(tab.name)}
          >
            <Image
              source={tab.icon}
              style={[
                styles.tabIcon,
                {
                  tintColor: activeTab === tab.name ? '#1DB954' : '#FFFFFF',
                },
              ]}
            />
            <Text
              style={[
                styles.tabLabel,
                {
                  color: activeTab === tab.name ? '#1DB954' : '#FFFFFF',
                  fontWeight: activeTab === tab.name ? 600 : 400,
                },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarBackground: {
    backgroundColor: '#000000',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
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
  tabBar: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 12,
    paddingBottom: 20,
    paddingTop: 15,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabIcon: {
    width: 28,
    height: 28,
    marginTop: 8,
  },
  tabLabel: {
    fontSize: 14,
    fontFamily: 'Montserrat',
    fontWeight: 500,
    marginTop: 8,
    marginBottom: 4,
  },
});

export default CustomBottomTab;