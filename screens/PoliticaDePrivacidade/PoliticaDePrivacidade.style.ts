import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#1DB954',
  },
  headerTitle: {
    fontSize: 24,
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontWeight: 600,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contentContainer: {
    paddingVertical: 30,
    paddingBottom: 120, // Espaço extra para o bottom tab
  },
  title: {
    fontSize: 22,
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontWeight: 700, // Bold
    marginBottom: 30,
  },
  description: {
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontWeight: 500, // Medium
    lineHeight: 28,
    textAlign: 'justify',
    letterSpacing: 0.3,
    marginBottom:10,
  },
});

export default styles;