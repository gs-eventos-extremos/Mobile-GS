import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import styles from './CadastroConcluido.styles';

type CadastroConcluidoNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CadastroConcluido'
>;

const CadastroConcluido = () => {
  const navigation = useNavigation<CadastroConcluidoNavigationProp>();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // Contador regressivo
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          navigation.navigate('Login');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Limpar o interval se o componente for desmontado
    return () => clearInterval(interval);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Ícone de sucesso */}
      <Image
        source={require('../../assets/ok.png')}
        style={styles.successIcon}
      />

      {/* Texto de sucesso */}
      <Text style={styles.successText}>
        Cadastro realizado{'\n'}com sucesso!
      </Text>

      {/* Texto de redirecionamento (opcional) */}
      <Text style={styles.redirectText}>
        Redirecionando para login em {countdown}...
      </Text>
    </View>
  );
};

export default CadastroConcluido;