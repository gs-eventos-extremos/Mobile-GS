import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import styles from './Guia.styles';

const guiaData = [
  {
    id: 1,
    title: 'Alagamento',
    icon: require('../../assets/alagamento.png'),
    screen: 'GuiaAlagamento' as keyof RootStackParamList,
  },
  {
    id: 2,
    title: 'Deslizamento',
    icon: require('../../assets/deslizamento.png'),
    screen: 'GuiaDeslizamento', // Temporário até criar a tela
  },
  {
    id: 3,
    title: 'Queimada',
    icon: require('../../assets/queimada.png'),
    screen: 'GuiaQueimada', // Temporário até criar a tela
  },
  {
    id: 4,
    title: 'Seca',
    icon: require('../../assets/seca.png'),
    screen: 'GuiaSeca', // Temporário até criar a tela
  },
  {
    id: 5,
    title: 'Avalanches',
    icon: require('../../assets/avalanche.png'),
    screen: 'GuiaAvalanche', // Temporário até criar a tela
  },
  {
    id: 6,
    title: 'Tornados',
    icon: require('../../assets/tornados.png'),
    screen: 'GuiaTornado', // Temporário até criar a tela
  },
];

type GuiaNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Guia = () => {
  const navigation = useNavigation<GuiaNavigationProp>();
  const handleProfilePress = () => {
    // Navegar para tela de perfil
    navigation.navigate('Perfil');
  };

  const handleGuiaItemPress = (item: any) => {
    // Navegar para detalhes do guia
    if (item.screen) {
      navigation.navigate(item.screen);
    } else {
      console.log('Tela ainda não criada para:', item.title);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Guia</Text>
        <TouchableOpacity style={styles.profileButton} onPress={handleProfilePress}>
          <Image source={require('../../assets/user.png')} style={styles.profileIcon} />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.subtitle}>Como se proteger{'\n'}em casos de:</Text>

        <View style={styles.gridContainer}>
          {guiaData.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.guiaItem,
                index % 2 === 0 ? styles.leftItem : styles.rightItem,
              ]}
              onPress={() => handleGuiaItemPress(item)}
            >
              <Image source={item.icon} style={styles.guiaIcon} />
              <Text style={styles.guiaTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Guia;