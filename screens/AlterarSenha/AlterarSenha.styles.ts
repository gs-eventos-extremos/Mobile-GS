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
    fontWeight: '800', // ExtraBold
    textAlign: 'center',
    marginTop: 100,
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 16,
    color: '#CCCCCC',
    fontFamily: 'Montserrat',
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 25,
  },
  inputLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontWeight: '400', // Regular
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
    fontFamily: 'Montserrat',
    fontWeight: '400', // Regular
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
    fontFamily: 'Montserrat',
    fontWeight: '400', // Regular
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
  passwordStrengthContainer: {
    marginTop: 8,
    marginLeft: 5,
  },
  passwordStrengthText: {
    fontSize: 12,
    fontFamily: 'Montserrat',
    fontWeight: '400',
  },
  strengthWeak: {
    color: '#FF4444',
  },
  strengthMedium: {
    color: '#FFA500',
  },
  strengthStrong: {
    color: '#1DB954',
  },
  passwordHints: {
    marginTop: 10,
    marginLeft: 5,
  },
  hintText: {
    fontSize: 12,
    color: '#CCCCCC',
    fontFamily: 'Montserrat',
    fontWeight: '400',
    lineHeight: 18,
  },
  changePasswordButton: {
    height: 50,
    backgroundColor: '#1DB954',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  changePasswordButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontWeight: '800', // ExtraBold
  },
  backToLoginContainer: {
    alignItems: 'center',
  },
  backToLoginText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontWeight: '400', // Regular
    marginBottom: 15,
  },
  backToLoginButton: {
    height: 50, // Mesmo tamanho do botão principal
    borderWidth: 2,
    borderColor: '#1DB954',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    width: '100%', // Largura completa
  },
  backToLoginButtonText: {
    fontSize: 16,
    color: '#1DB954',
    fontFamily: 'Montserrat',
    fontWeight: '800', // ExtraBold
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
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  successIcon: {
    width: 100,
    height: 100,
    marginBottom: 30,
    tintColor: '#1DB954',
  },
  successTitle: {
    fontSize: 28,
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 20,
  },
  successText: {
    fontSize: 16,
    color: '#CCCCCC',
    fontFamily: 'Montserrat',
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  successButton: {
    height: 50,
    backgroundColor: '#1DB954',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    width: '100%',
  },
  successButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontWeight: '800',
  },
});

export default styles;