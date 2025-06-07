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
import styles from './GuiaDeslizamento.style';

type GuiaDeslizamentoNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'GuiaDeslizamento'
>;

const GuiaDeslizamento = () => {
  const navigation = useNavigation<GuiaDeslizamentoNavigationProp>();

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
          <Text style={styles.headerTitle}>Guia Deslizamento</Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Deslizamento</Text>
          <Text style={styles.description}>
           Deslizamentos costumam acontecer em épocas de muita chuva, principalmente em áreas de encosta ou morros. 
           Por isso, é fundamental estar atento a sinais de risco, como rachaduras no chão, muros e paredes, portas 
           e janelas que emperram, árvores ou postes inclinados, e sons estranhos vindos do solo.

           Se perceber qualquer um desses sinais, saia imediatamente do local e avise os vizinhos. Vá para um lugar 
           seguro, longe de barrancos e áreas inclinadas. Nunca tente atravessar áreas onde já ocorreu o deslizamento 
           — o solo pode continuar instável.

           Mantenha sempre um kit de emergência com documentos, lanternas, água e itens essenciais. E, acima de tudo, 
           siga as orientações da Defesa Civil da sua cidade. A prevenção e a ação rápida são as melhores formas de 
           se proteger e salvar vidas. 
          </Text>
        </View>
      </ScrollView>

      {/* Custom Bottom Tab */}
      <CustomBottomTab activeTab="Guia" />
    </SafeAreaView>
  );
};

export default GuiaDeslizamento;