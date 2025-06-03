import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

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
  headerTitle: {
    fontSize: 24,
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontWeight: 600,
  },
  profileButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  profileIcon: {
    width: 44,
    height: 44,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center', // Centraliza verticalmente
  },
  subtitle: {
    fontSize: 22,
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontWeight: 600,
    textAlign: 'center',
    marginBottom: 40, // Espaço entre título e grid
    lineHeight: 28,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 100, // Espaço para o bottom tab
  },
  guiaItem: {
    width: (width - 60) / 2, // 50% da largura menos padding
    height: 140,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#1DB954',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  leftItem: {
    marginRight: 10,
  },
  rightItem: {
    marginLeft: 10,
  },
  guiaIcon: {
    width: 50,
    height: 50,
    tintColor: '#FFFFFF',
    marginBottom: 12,
  },
  guiaTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontWeight: 500,
    textAlign: 'center',
  },
});

export default styles;