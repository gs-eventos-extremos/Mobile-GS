import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import styles from './Guia.styles';

const guiaData = [
  {
    id: 1,
    title: 'Alagamento',
    icon: require('../../assets/alagamento.png'),
  },
  {
    id: 2,
    title: 'Deslizamento',
    icon: require('../../assets/deslizamento.png'),
  },
  {
    id: 3,
    title: 'Queimada',
    icon: require('../../assets/queimada.png'),
  },
  {
    id: 4,
    title: 'Seca',
    icon: require('../../assets/seca.png'),
  },
  {
    id: 5,
    title: 'Avalanches',
    icon: require('../../assets/avalanche.png'),
  },
  {
    id: 6,
    title: 'Tornados',
    icon: require('../../assets/tornados.png'),
  },
];

const Guia = () => {
  const handleProfilePress = () => {
    // Navegar para tela de perfil
    console.log('Perfil pressionado');
  };

  const handleGuiaItemPress = (item: any) => {
    // Navegar para detalhes do guia
    console.log('Item pressionado:', item.title);
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