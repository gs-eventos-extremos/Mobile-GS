import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useAuth } from '../../src/context/authContext';
import CustomBottomTab from '../../components/CustomBottomTabNavigation';
import styles from './Dados.styles';
import api from '../../src/services/api';
import { UserResponseDto } from '../../src/types/auth.types';

type DadosNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Dados = () => {
  const navigation = useNavigation<DadosNavigationProp>();
  const { user, logout } = useAuth();
  const [userData, setUserData] = useState<UserResponseDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    if (!user) {
      setError('Usuário não encontrado');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      // Buscar dados atualizados do usuário na API
      const response = await api.get<UserResponseDto>(`/api/users/${user.id}`, true);
      setUserData(response);
      
    } catch (error: any) {
      console.error('Erro ao buscar dados do usuário:', error);
      setError('Erro ao carregar dados do usuário');
      // Usar dados do contexto como fallback
      setUserData(user);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Excluir Conta',
      'Tem certeza que deseja excluir sua conta permanentemente?\n\nEsta ação não pode ser desfeita e todos os seus dados serão removidos.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: confirmDeleteAccount,
        },
      ]
    );
  };

  const confirmDeleteAccount = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      
      // Chamar API para deletar conta
      await api.delete(`/api/users/${user.id}`, true);
      
      Alert.alert(
        'Conta Excluída',
        'Sua conta foi excluída com sucesso.',
        [
          {
            text: 'OK',
            onPress: async () => {
              // Fazer logout e redirecionar
              await logout();
            },
          },
        ]
      );

    } catch (error: any) {
      console.error('Erro ao excluir conta:', error);
      
      let errorMessage = 'Erro ao excluir conta. Tente novamente.';
      if (error.message) {
        errorMessage = error.message;
      }
      
      Alert.alert('Erro', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Image source={require('../../assets/voltar.png')} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Dados do usuário</Text>
        </View>
        
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1DB954" />
          <Text style={styles.loadingText}>Carregando dados...</Text>
        </View>
        
        <CustomBottomTab activeTab="Guia" />
      </SafeAreaView>
    );
  }

  if (error && !userData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Image source={require('../../assets/voltar.png')} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Dados do usuário</Text>
        </View>
        
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchUserData}>
            <Text style={styles.retryButtonText}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
        
        <CustomBottomTab activeTab="Guia" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Image source={require('../../assets/voltar.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dados do usuário</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <ScrollView 
          style={styles.scrollView} 
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Avatar */}
          <View style={styles.avatarContainer}>
            <View style={styles.avatarCircle}>
              <Image source={require('../../assets/user.png')} style={styles.avatarIcon} />
            </View>
          </View>

          {/* User Info */}
          {userData && (
            <View style={styles.userInfoContainer}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Nome:</Text>
                <Text style={styles.infoValue}>{userData.name}</Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>E-mail:</Text>
                <Text style={styles.infoValue}>{userData.email}</Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Conta criada em:</Text>
                <Text style={styles.infoValue}>{formatDate(userData.createdAt)}</Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Status:</Text>
                <Text style={[styles.infoValue, { color: userData.isActive ? '#1DB954' : '#FF4444' }]}>
                  {userData.isActive ? 'Ativa' : 'Inativa'}
                </Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>ID do usuário:</Text>
                <Text style={styles.infoValue}>#{userData.id}</Text>
              </View>
            </View>
          )}

          {/* Delete Account Button */}
          <View style={styles.deleteButtonContainer}>
            <TouchableOpacity 
              style={styles.deleteButton} 
              onPress={handleDeleteAccount}
              disabled={isLoading}
            >
              <Text style={styles.deleteButtonText}>Excluir conta</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* Custom Bottom Tab */}
      <CustomBottomTab activeTab="Guia" />
    </SafeAreaView>
  );
};

export default Dados;