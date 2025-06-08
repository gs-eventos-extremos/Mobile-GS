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
import styles from './AlterarSenha.styles';
import authService from '../../src/services/auth.service';

type AlterarSenhaScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AlterarSenha'
>;

type Props = {
  navigation: AlterarSenhaScreenNavigationProp;
};

const AlterarSenha = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const novaSenhaRef = useRef<TextInput>(null);
  const confirmarSenhaRef = useRef<TextInput>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    return password.length >= 6 && passwordRegex.test(password);
  };

  const getPasswordStrength = (password: string): { strength: string; color: string } => {
    if (password.length === 0) {
      return { strength: '', color: '' };
    }
    
    if (password.length < 6) {
      return { strength: 'Muito fraca', color: 'strengthWeak' };
    }
    
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    const criteriaMet = [hasLower, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;
    
    if (criteriaMet >= 4 && password.length >= 8) {
      return { strength: 'Forte', color: 'strengthStrong' };
    } else if (criteriaMet >= 3 || (criteriaMet >= 2 && password.length >= 8)) {
      return { strength: 'Média', color: 'strengthMedium' };
    } else {
      return { strength: 'Fraca', color: 'strengthWeak' };
    }
  };

  const validateForm = (): boolean => {
    if (!email.trim()) {
      Alert.alert('Erro', 'Por favor, insira seu e-mail');
      return false;
    }

    if (!validateEmail(email)) {
      Alert.alert('Erro', 'Por favor, insira um e-mail válido');
      return false;
    }

    if (!novaSenha.trim()) {
      Alert.alert('Erro', 'Por favor, insira a nova senha');
      return false;
    }

    if (!validatePassword(novaSenha)) {
      Alert.alert('Erro', 'A nova senha deve ter no mínimo 6 caracteres, incluindo uma letra maiúscula, uma minúscula e um número');
      return false;
    }

    if (!confirmarSenha.trim()) {
      Alert.alert('Erro', 'Por favor, confirme a nova senha');
      return false;
    }

    if (novaSenha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return false;
    }

    return true;
  };

  const handleChangePassword = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await authService.updatePassword(email.toLowerCase().trim(), novaSenha);
      
      console.log('Senha alterada com sucesso');
      setIsSuccess(true);

      // Limpar campos
      setEmail('');
      setNovaSenha('');
      setConfirmarSenha('');

    } catch (error: any) {
      console.error('Erro ao alterar senha:', error);
      
      let errorMessage = 'Erro ao alterar senha. Tente novamente.';
      
      if (error.message) {
        if (error.message.includes('Usuário não encontrado') || 
            error.message.includes('Not Found')) {
          errorMessage = 'E-mail não encontrado. Verifique se o e-mail está correto.';
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

  const handleBackPress = () => {
    navigation.goBack();
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  const passwordStrength = getPasswordStrength(novaSenha);

  if (isSuccess) {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled>
        <View style={styles.container}>
          <View style={styles.successContainer}>
            <Image
              source={require('../../assets/ok.png')}
              style={styles.successIcon}
            />
            <Text style={styles.successTitle}>Senha Alterada!</Text>
            <Text style={styles.successText}>
              Sua senha foi alterada com sucesso.{'\n'}Agora você pode fazer login com sua nova senha.
            </Text>
            <TouchableOpacity style={styles.successButton} onPress={navigateToLogin}>
              <Text style={styles.successButtonText}>Ir para Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }

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

        {/* Botão Voltar */}
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>

        {/* Título */}
        <Text style={styles.title}>Alterar Senha</Text>

        {/* Subtítulo */}
        <Text style={styles.subtitle}>
          Digite seu e-mail e crie uma nova senha para recuperar o acesso à sua conta.
        </Text>

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
            onSubmitEditing={() => novaSenhaRef.current?.focus()}
          />
        </View>

        {/* Campo Nova Senha */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Nova Senha:</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Insira sua nova senha"
              placeholderTextColor="#999"
              value={novaSenha}
              onChangeText={setNovaSenha}
              secureTextEntry={!showNewPassword}
              ref={novaSenhaRef}
              returnKeyType="next"
              onSubmitEditing={() => confirmarSenhaRef.current?.focus()}
              editable={!isLoading}
            />
            <TouchableOpacity 
              style={styles.eyeButton}
              onPress={() => setShowNewPassword(!showNewPassword)}
              disabled={isLoading}
            >
              <Image
                source={require('../../assets/ver.png')}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>
          
          {/* Indicador de força da senha */}
          {novaSenha.length > 0 && (
            <View style={styles.passwordStrengthContainer}>
              <Text style={[styles.passwordStrengthText, styles[passwordStrength.color as keyof typeof styles]]}>
                Força da senha: {passwordStrength.strength}
              </Text>
            </View>
          )}

          {/* Dicas da senha */}
          <View style={styles.passwordHints}>
            <Text style={styles.hintText}>
              A senha deve conter:
              {'\n'}• No mínimo 6 caracteres
              {'\n'}• Uma letra maiúscula
              {'\n'}• Uma letra minúscula
              {'\n'}• Um número
            </Text>
          </View>
        </View>

        {/* Campo Confirmar Senha */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Confirmar Nova Senha:</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Confirme sua nova senha"
              placeholderTextColor="#999"
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              secureTextEntry={!showConfirmPassword}
              ref={confirmarSenhaRef}
              returnKeyType="done"
              onSubmitEditing={handleChangePassword}
              editable={!isLoading}
            />
            <TouchableOpacity 
              style={styles.eyeButton}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              disabled={isLoading}
            >
              <Image
                source={require('../../assets/ver.png')}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Botão Alterar Senha */}
        <TouchableOpacity 
          style={[styles.changePasswordButton, isLoading && { opacity: 0.7 }]} 
          onPress={handleChangePassword}
          disabled={isLoading}
        >
          <Text style={styles.changePasswordButtonText}>
            {isLoading ? 'Alterando...' : 'Alterar Senha'}
          </Text>
        </TouchableOpacity>

        {/* Link para voltar ao Login */}
        <View style={styles.backToLoginContainer}>
          <Text style={styles.backToLoginText}>Lembrou da senha?</Text>
          <TouchableOpacity 
            style={styles.backToLoginButton} 
            onPress={navigateToLogin}
            disabled={isLoading}
          >
            <Text style={styles.backToLoginButtonText}>Voltar ao Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AlterarSenha;