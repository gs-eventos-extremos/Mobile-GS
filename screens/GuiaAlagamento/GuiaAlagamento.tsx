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
import { CommonActions } from '@react-navigation/native';
import CustomBottomTab from '../../components/CustomBottomTabNavigation';
import styles from './GuiaAlagamento.styles';

type GuiaAlagamentoNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'GuiaAlagamento'
>;

const GuiaAlagamento = () => {
  const navigation = useNavigation<GuiaAlagamentoNavigationProp>();

  const handleBackPress = () => {
    // Navegar para MainTabs com a aba Guia ativa
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
              index: 1, // Índice 1 = Guia
            },
          },
        ],
      })
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Image source={require('../../assets/voltar.png')} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Guia Alagamento</Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Alagamento</Text>
          <Text style={styles.description}>
            Em situações de alagamento, a segurança vem em primeiro lugar. Evite sair de casa e nunca tente atravessar ruas alagadas, mesmo a pé ou de carro — a força da água pode ser maior do que parece. Desligue a energia elétrica e o gás se a água começar a entrar no imóvel. Mantenha documentos e objetos importantes em locais elevados. Se precisar sair, procure abrigo em áreas altas e seguras. Siga sempre as orientações da Defesa Civil e ligue para o 199 em caso de emergência.
          </Text>
        </View>
      </ScrollView>

      {/* Custom Bottom Tab */}
      <CustomBottomTab activeTab="Guia" />
    </SafeAreaView>
  );
};

export default GuiaAlagamento;