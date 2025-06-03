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
import styles from './GuiaQueimada.styles';

type GuiaAlagamentoNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'GuiaQueimada'
>;

const GuiaQueimada = () => {
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
          <Text style={styles.headerTitle}>Guia Queimada</Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Queimada</Text>
          <Text style={styles.description}>
            Queimadas podem se espalhar rapidamente e causar riscos à saúde e à vida. Se você mora perto de áreas de mata 
            ou terrenos com vegetação seca, fique atento a sinais de fumaça e cheiro forte no ar. Em caso de queimada 
            próxima, saia do local imediatamente e busque um lugar seguro, longe da fumaça e das chamas.

            Feche portas, janelas e use panos molhados nas frestas para evitar que a fumaça entre em casa. Se estiver na 
            rua, proteja nariz e boca com um pano úmido. Evite inalar a fumaça, pois ela pode causar intoxicação e problemas 
            respiratórios.

            Nunca tente apagar incêndios grandes por conta própria. Avise o Corpo de Bombeiros (193) ou a Defesa Civil e 
            siga suas orientações. Em tempos secos, evite queimar lixo ou mato — a prevenção é essencial para evitar tragédias.
          </Text>
        </View>
      </ScrollView>

      {/* Custom Bottom Tab */}
      <CustomBottomTab activeTab="Guia" />
    </SafeAreaView>
  );
};

export default GuiaQueimada;