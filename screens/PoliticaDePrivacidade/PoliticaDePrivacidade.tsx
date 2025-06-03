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
import styles from './PoliticaDePrivacidade.style';

type GuiaAlagamentoNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PoliticaDePrivacidade'
>;

const PoliticaDePrivacidade = () => {
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
          <Text style={styles.headerTitle}>Política de Privacidade</Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Nossos termos de privacidade</Text>
          <Text style={styles.description}>
            Seu uso do nosso aplicativo de clima é seguro e respeita sua privacidade. 
            Coletamos apenas informações essenciais, como sua localização aproximada, 
            para fornecer previsões do tempo precisas para a sua região. Esses dados não 
            são compartilhados com terceiros e são usados exclusivamente para melhorar 
            sua experiência no app.
          </Text>
          <Text style={styles.description}>
            Não coletamos dados pessoais como nome, e-mail ou documentos. 
            Todas as informações são tratadas com segurança e de forma anônima. 
            Você pode desativar o acesso à localização a qualquer momento nas 
            configurações do seu dispositivo, mas isso pode limitar algumas 
            funcionalidades do app.
          </Text>
          <Text style={styles.description}>
            Ao continuar usando nosso aplicativo, você concorda com esta política. 
            Em caso de dúvidas, entre em contato conosco pelo canal de suporte disponível no app.
          </Text>
        </View>
      </ScrollView>

      {/* Custom Bottom Tab */}
      <CustomBottomTab activeTab="Guia" />
    </SafeAreaView>
  );
};

export default PoliticaDePrivacidade;