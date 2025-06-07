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
import styles from './GuiaSeca.style';

type GuiaSecaNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'GuiaSeca'
>;

const GuiaSeca = () => {
  const navigation = useNavigation<GuiaSecaNavigationProp>();

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
          <Text style={styles.headerTitle}>Guia Seca</Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Seca</Text>
          <Text style={styles.description}>
            Durante períodos de seca, é fundamental economizar água e adotar hábitos conscientes no dia a dia. Evite desperdícios: 
            feche a torneira ao escovar os dentes, tome banhos curtos e reutilize a água sempre que possível, como a da máquina de 
            lavar para limpar o chão.

            Mantenha a hidratação bebendo bastante água, principalmente em dias muito quentes. Cuide da alimentação com alimentos leves 
            e evite esforço físico excessivo nas horas mais quentes do dia. Em regiões rurais, proteja o solo com cobertura vegetal e armazene 
            água da chuva sempre que possível.

            Além disso, evite fazer queimadas, pois o tempo seco favorece incêndios. Siga orientações da Defesa Civil e fique atento 
            a avisos sobre o abastecimento de água. Com atitudes simples, é possível enfrentar a seca com mais segurança e responsabilidade.
          </Text>
        </View>
      </ScrollView>

      {/* Custom Bottom Tab */}
      <CustomBottomTab activeTab="Guia" />
    </SafeAreaView>
  );
};

export default GuiaSeca;