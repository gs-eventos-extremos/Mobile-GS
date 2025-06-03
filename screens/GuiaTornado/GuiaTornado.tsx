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
import styles from './GuiaTornado.style';

type GuiaAlagamentoNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'GuiaTornado'
>;

const GuiaTornado = () => {
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
          <Text style={styles.headerTitle}>Guia Tornado</Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Tornado</Text>
          <Text style={styles.description}>
            Tornados podem surgir de forma repentina e causar grandes destruições. 
            Ao receber um alerta de tornado, procure imediatamente um abrigo seguro. 
            O ideal é se proteger em um cômodo sem janelas, como um porão ou banheiro no centro da casa. 
            Se estiver em uma construção frágil, como trailers ou barracos, saia imediatamente e vá para 
            um local mais resistente.

            Evite ficar próximo de janelas e objetos que possam se soltar com o vento. 
            Cubra a cabeça e o corpo com almofadas ou colchões para se proteger de destroços. 
            Se estiver ao ar livre e não houver abrigo próximo, deite-se em uma vala ou depressão 
            no solo e proteja a cabeça com os braços.

            Fique atento às previsões meteorológicas e siga sempre as orientações da Defesa Civil e 
            autoridades locais. A rapidez na resposta pode fazer toda a diferença em situações de tornado.
          </Text>
        </View>
      </ScrollView>

      {/* Custom Bottom Tab */}
      <CustomBottomTab activeTab="Guia" />
    </SafeAreaView>
  );
};

export default GuiaTornado;