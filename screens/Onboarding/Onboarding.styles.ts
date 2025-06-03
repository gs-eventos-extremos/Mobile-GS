import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  carouselContainer: {
    flex: 1,
    position: 'relative',
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width: width,
    height: height * 0.75, // 75% da altura da tela
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Overlay preto transparente
  },
  textContainer: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    transform: [{ translateY: -50 }],
    paddingHorizontal: 30,
    zIndex: 2,
  },
  slideTitle: {
    fontSize: 28,
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontWeight: 800, // Semibold/Bold
    textAlign: 'center',
    lineHeight: 36,
    letterSpacing: 0.5,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#000000',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: '#1DB954',
    width: 30, // Dot ativo mais largo
  },
  inactiveDot: {
    backgroundColor: '#E0E0E0',
  },
  buttonsContainer: {
    paddingHorizontal: 30,
    paddingVertical: 30,
    backgroundColor: '#000000',
  },
  loginButton: {
    height: 56,
    backgroundColor: '#1DB954',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
    // Sombra sutil
    shadowColor: '#1DB954',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontWeight: 700, // Bold
    letterSpacing: 0.5,
  },
  signupButton: {
    height: 56,
    backgroundColor: '#000000',
    borderWidth: 2,
    borderColor: '#1DB954',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  signupButtonText: {
    fontSize: 18,
    color: '#1DB954',
    fontFamily: 'Montserrat',
    fontWeight: 700, // Bold
    letterSpacing: 0.5,
  },
});

export default styles;