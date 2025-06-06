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
import { useAuth } from '../../src/context/authContext';
import CustomBottomTab from '../../components/CustomBottomTabNavigation';
import styles from './Perfil.styles';

type PerfilNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Perfil = () => {
  const navigation = useNavigation<PerfilNavigationProp>();
  const { user, logout } = useAuth();

  const handleDadosUsuario = () => {
    console.log('Dados do usuário pressionado');
    Alert.alert(
      'Dados do Usuário',
      user ? `Nome: ${user.name}\nE-mail: ${user.email}\nConta criada: ${new Date(user.createdAt).toLocaleDateString('pt-BR')}` : 'Usuário não encontrado',
      [{ text: 'OK' }]
    );
  };

  const handleLocalizacoes = () => {
    console.log('Localizações cadastradas pressionado');
    Alert.alert(
      'Localizações',
      'Funcionalidade em desenvolvimento.\nEm breve você poderá gerenciar suas localizações salvas.',
      [{ text: 'OK' }]
    );
  };

  const handlePoliticas = () => {
    console.log('Políticas de privacidade pressionado');
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
          onPress: async () => {
            try {
              await logout();
              // O AuthContext já vai redirecionar automaticamente para o Onboarding
              console.log('Logout realizado com sucesso');
            } catch (error) {
              console.error('Erro ao fazer logout:', error);
              Alert.alert('Erro', 'Erro ao fazer logout. Tente novamente.');
            }
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
          {user && (
            <Text style={{
              color: '#FFFFFF',
              fontSize: 18,
              fontFamily: 'Montserrat',
              fontWeight: '600',
              marginTop: 15,
              textAlign: 'center',
            }}>
              {user.name}
            </Text>
          )}
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