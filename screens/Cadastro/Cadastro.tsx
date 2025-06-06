import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import styles from './Cadastro.styles';
import authService from '../../src/services/auth.service';

type CadastroScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Cadastro'
>;

type Props = {
  navigation: CadastroScreenNavigationProp;
};

const Cadastro = ({ navigation }: Props) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const emailRef = useRef(null);
  const senhaRef = useRef(null);

  const validateForm = (): boolean => {
    if (!nome.trim()) {
      Alert.alert('Erro', 'Por favor, insira seu nome');
      return false;
    }

    if (!email.trim()) {
      Alert.alert('Erro', 'Por favor, insira seu e-mail');
      return false;
    }

    // Validação básica de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Erro', 'Por favor, insira um e-mail válido');
      return false;
    }

    if (!senha.trim()) {
      Alert.alert('Erro', 'Por favor, insira sua senha');
      return false;
    }

    // Validação de senha conforme a API
    if (senha.length < 6) {
      Alert.alert('Erro', 'A senha deve ter no mínimo 6 caracteres');
      return false;
    }

    const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    if (!senhaRegex.test(senha)) {
      Alert.alert('Erro', 'A senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número');
      return false;
    }

    return true;
  };

  const handleCadastro = async () => {
  if (!validateForm()) {
    return;
  }

  setIsLoading(true);

  try {
    const response = await authService.register({
      name: nome,
      email: email.toLowerCase().trim(),
      password: senha,
    });

    console.log('Cadastro realizado com sucesso:', response);
    
    // Navegar direto para tela de cadastro concluído (sem alert)
    navigation.navigate('CadastroConcluido');

    // Limpar campos
    setNome('');
    setEmail('');
    setSenha('');

  } catch (error: any) {
    console.error('Erro no cadastro:', error);
    
    let errorMessage = 'Erro ao realizar cadastro. Tente novamente.';
    
    if (error.message) {
      if (error.message.includes('Email já cadastrado')) {
        errorMessage = 'Este e-mail já está cadastrado. Faça login ou use outro e-mail.';
      } else {
        errorMessage = error.message;
      }
    }

    Alert.alert('Erro', errorMessage);
  } finally {
    setIsLoading(false);
  }
};

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled>
      <View style={styles.container}>
        {/* ProgressBar */}
        {isLoading && (
          <View style={styles.progressBar}>
            <ActivityIndicator size="large" color="#1DB954" />
          </View>
        )}

        {/* Título */}
        <Text style={styles.title}>Cadastro</Text>

        {/* Campo Nome */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Nome:</Text>
          <TextInput
            style={styles.input}
            placeholder="Insira seu nome"
            placeholderTextColor="#999"
            value={nome}
            onChangeText={setNome}
            autoCapitalize="words"
            returnKeyType="next"
            editable={!isLoading}
          />
        </View>

        {/* Campo E-mail */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>E-mail:</Text>
          <TextInput
            style={styles.input}
            placeholder="Insira seu E-mail"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            ref={emailRef}
            editable={!isLoading}
          />
        </View>

        {/* Campo Senha */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Senha:</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Insira sua senha"
              placeholderTextColor="#999"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={!showPassword}
              ref={senhaRef}
              returnKeyType="done"
              onSubmitEditing={handleCadastro}
              editable={!isLoading}
            />
            <TouchableOpacity 
              style={styles.eyeButton}
              onPress={() => setShowPassword(!showPassword)}
              disabled={isLoading}
            >
              <Image
                source={require('../../assets/ver.png')}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Botão Cadastrar */}
        <TouchableOpacity 
          style={[styles.signupButton, isLoading && { opacity: 0.7 }]} 
          onPress={handleCadastro}
          disabled={isLoading}
        >
          <Text style={styles.signupButtonText}>
            {isLoading ? 'Cadastrando...' : 'Cadastrar'}
          </Text>
        </TouchableOpacity>

        {/* Link para Login */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Já possui cadastro?</Text>
          <TouchableOpacity 
            style={styles.loginButton} 
            onPress={navigateToLogin}
            disabled={isLoading}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Cadastro;