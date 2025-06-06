import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIcon: {
    width: 400,
    height: 400,
    marginBottom: -30,
    resizeMode: 'contain',
  },
  successText: {
    fontSize: 28,
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontWeight: 800,
    textAlign: 'center',
    lineHeight: 36,
  },
  redirectText: {
  fontSize: 16,
  color: '#999999',
  fontFamily: 'Montserrat',
  fontWeight: 400,
  textAlign: 'center',
  marginTop: 20,
},
});

export default styles;