import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 24,
    color: '#1DB954',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 32,
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontWeight:800, // ExtraBold
    textAlign: 'center',
    marginTop: 100,
    marginBottom: 60,
  },
  inputContainer: {
    marginBottom: 25,
  },
  inputLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontWeight:400, // Regular
    marginBottom: 8,
    marginLeft: 5,
  },
  input: {
    height: 50,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#1DB954',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Regular',
    fontWeight:400, // Fonte Montserrat Regular
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  passwordInput: {
    flex: 1,
    height: 50,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#1DB954',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Regular',
    fontWeight:400, // Fonte Montserrat Regular
    paddingRight: 50,
  },
  eyeButton: {
    position: 'absolute',
    right: 15,
    padding: 5,
  },
  eyeIcon: {
    width: 20,
    height: 20,
    tintColor: '#1DB954', // Aplica a cor verde na imagem
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Regular',
    fontWeight:400, // Fonte Montserrat Regular
    // Removido o textDecorationLine: 'underline'
  },
  loginButton: {
    height: 50,
    backgroundColor: '#1DB954',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  loginButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    fontWeight:800, // Fonte Montserrat Bold
  },
  signupContainer: {
    alignItems: 'center',
  },
  signupText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Regular',
    fontWeight:400, // Fonte Montserrat Regular
    marginBottom: 15,
  },
  signupButton: {
    height: 50, // Mesmo tamanho do botão Entrar
    borderWidth: 2,
    borderColor: '#1DB954',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    width: '100%', // Largura completa como o botão Entrar
  },
  signupButtonText: {
    fontSize: 16,
    color: '#1DB954',
    fontFamily: 'Montserrat-Bold',
    fontWeight:800, // Fonte Montserrat Bold
  },
  progressBar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 999,
  },
});

export default styles;