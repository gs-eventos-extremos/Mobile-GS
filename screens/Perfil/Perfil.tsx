import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import CustomBottomTab from '../../components/CustomBottomTabNavigation';
import styles from './Perfil.styles';

type PerfilNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Perfil = () => {
  const navigation = useNavigation<PerfilNavigationProp>();

  const handleDadosUsuario = () => {
    console.log('Dados do usuário pressionado');
    // Navegar para tela de dados do usuário
  };

  const handleLocalizacoes = () => {
    console.log('Localizações cadastradas pressionado');
    // Navegar para tela de localizações
  };

  const handlePoliticas = () => {
    console.log('Políticas de privacidade pressionado');
    // Navegar para tela de políticas
    navigation.navigate('PoliticaDePrivacidade');
  };

  const handleSair = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair da sua conta?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: () => {
            // Navegar para tela de login/onboarding
            navigation.navigate('Onboarding');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Perfil</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatarCircle}>
            <Image source={require('../../assets/user.png')} style={styles.avatarIcon} />
          </View>
        </View>

        {/* Menu Grid */}
        <View style={styles.menuGrid}>
          {/* Primeira linha */}
          <View style={styles.menuRow}>
            <TouchableOpacity style={styles.menuItem} onPress={handleDadosUsuario}>
              <Text style={styles.menuText}>Dados do{'\n'}usuário</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={handleLocalizacoes}>
              <Text style={styles.menuText}>Localizações{'\n'}cadastradas</Text>
            </TouchableOpacity>
          </View>

          {/* Segunda linha */}
          <View style={styles.menuRow}>
            <TouchableOpacity style={styles.menuItem} onPress={handlePoliticas}>
              <Text style={styles.menuText}>Políticas de{'\n'}privacidade</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuItem, styles.sairButton]} onPress={handleSair}>
              <Text style={[styles.menuText, styles.sairText]}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Custom Bottom Tab */}
      <CustomBottomTab activeTab="Guia" />
    </SafeAreaView>
  );
};

export default Perfil;