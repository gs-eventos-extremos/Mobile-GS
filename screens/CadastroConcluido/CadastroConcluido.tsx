import React from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import styles from './CadastroConcluido.styles';

const CadastroConcluido = () => {
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
    </View>
  );
};

export default CadastroConcluido;