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
import { useAuth } from '../../src/context/authContext';
import styles from './Login.styles';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const Login = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { login } = useAuth(); // Usar o contexto ao invés do service diretamente
  const senhaRef = useRef<TextInput>(null);

  const validateForm = (): boolean => {
    if (!email.trim()) {
      Alert.alert('Erro', 'Por favor, insira seu e-mail');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Erro', 'Por favor, insira um e-mail válido');
      return false;
    }

    if (!senha.trim()) {
      Alert.alert('Erro', 'Por favor, insira sua senha');
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Usar o login do contexto
      await login(email.toLowerCase().trim(), senha);
      
      console.log('Login realizado com sucesso via contexto!');
      
      // Limpar campos
      setEmail('');
      setSenha('');

      // O AuthContext automaticamente atualizará o estado
      // e o App.tsx navegará para MainTabs (aba Clima)

    } catch (error: any) {
      console.error('Erro no login:', error);
      
      let errorMessage = 'Erro ao realizar login. Tente novamente.';
      
      if (error.message) {
        if (error.message.includes('Email ou senha inválidos') || 
            error.message.includes('Unauthorized')) {
          errorMessage = 'E-mail ou senha incorretos. Verifique suas credenciais.';
        } else if (error.message.includes('Network')) {
          errorMessage = 'Erro de conexão. Verifique sua internet.';
        } else {
          errorMessage = error.message;
        }
      }

      Alert.alert('Erro', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Redefinir Senha',
      'Por favor, entre em contato com o suporte para redefinir sua senha.',
      [
        { text: 'OK', style: 'default' }
      ]
    );
  };

  const navigateToCadastro = () => {
    navigation.navigate('Cadastro');
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
        <Text style={styles.title}>Login</Text>

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
            editable={!isLoading}
            onSubmitEditing={() => senhaRef.current?.focus()}
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
              onSubmitEditing={handleLogin}
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
          <TouchableOpacity 
            style={styles.forgotPasswordButton}
            onPress={handleForgotPassword}
            disabled={isLoading}
          >
            <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
          </TouchableOpacity>
        </View>

        {/* Botão Entrar */}
        <TouchableOpacity 
          style={[styles.loginButton, isLoading && { opacity: 0.7 }]} 
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text style={styles.loginButtonText}>
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Text>
        </TouchableOpacity>

        {/* Link para Cadastro */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Não possui cadastro?</Text>
          <TouchableOpacity 
            style={styles.signupButton} 
            onPress={navigateToCadastro}
            disabled={isLoading}
          >
            <Text style={styles.signupButtonText}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;