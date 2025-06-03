import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    paddingBottom: 120, // Espaço para o bottom tab
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  avatarCircle: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarIcon: {
    width: 70,
    height: 70,
  },
  menuGrid: {
    flex: 1,
    maxHeight: 320, // Limita a altura do grid
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  menuItem: {
    width: (width - 60) / 2, // 50% da largura menos padding e espaçamento
    height: 140,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#1DB954',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  menuText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontWeight: 600,
    textAlign: 'center',
    lineHeight: 24,
  },
  sairButton: {
    borderColor: '#FF0000', // Borda vermelha para o botão Sair
  },
  sairText: {
    color: '#FFFFFF', // Texto branco mesmo com borda vermelha
  },
});

export default styles;