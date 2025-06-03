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
import CustomBottomTab from '../../components/CustomBottomTabNavigation';
import styles from './GuiaAvalanche.style';

type GuiaAlagamentoNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'GuiaAvalanche'
>;

const GuiaAvalanche = () => {
  const navigation = useNavigation<GuiaAlagamentoNavigationProp>();

  const handleBackPress = () => {
    navigation.navigate('MainTabs');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Image source={require('../../assets/voltar.png')} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Guia Avalanche</Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Avalanche</Text>
          <Text style={styles.description}>
            Avalanches ocorrem em áreas montanhosas com neve acumulada, geralmente após nevascas ou mudanças bruscas de temperatura. 
            Se estiver em regiões de risco, informe-se sobre as condições climáticas e evite trilhas ou atividades em áreas instáveis.

            Ao notar sinais de avalanche, como rachaduras na neve, sons de estalo ou movimento repentino da neve, afaste-se imediatamente da encosta. 
            Se for pego por uma avalanche, tente se mover lateralmente para sair da trilha da massa de neve. Proteja seu rosto com os braços para 
            criar uma bolsa de ar e tente manter a calma.

            Leve sempre equipamentos de segurança como apito, sonda e localizador. Em grupo, mantenha distância entre os integrantes e saiba usar os 
            equipamentos de resgate. A prevenção, o conhecimento do terreno e a preparação adequada são essenciais para evitar acidentes graves.
          </Text>
        </View>
      </ScrollView>

      {/* Custom Bottom Tab */}
      <CustomBottomTab activeTab="Guia" />
    </SafeAreaView>
  );
};

export default GuiaAvalanche;