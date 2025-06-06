import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
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
    fontWeight: '600',
    flex: 1,
  },
  content: {
    flex: 1,
    paddingBottom: 120, // Espaço para o bottom tab
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  avatarCircle: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  avatarIcon: {
    width: 70,
    height: 70,
  },
  userInfoContainer: {
    marginBottom: 40,
  },
  infoItem: {
    marginBottom: 30,
  },
  infoLabel: {
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontWeight: '600',
    marginBottom: 8,
  },
  infoValue: {
    fontSize: 16,
    color: '#CCCCCC',
    fontFamily: 'Montserrat',
    fontWeight: '400',
  },
  deleteButtonContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  deleteButton: {
    height: 50,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FF4444',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 16,
    color: '#FF4444',
    fontFamily: 'Montserrat',
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  loadingText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontWeight: '500',
    marginTop: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    paddingHorizontal: 40,
  },
  errorText: {
    fontSize: 16,
    color: '#FF4444',
    fontFamily: 'Montserrat',
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 24,
  },
  retryButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#1DB954',
    borderRadius: 8,
  },
  retryButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontWeight: '600',
  },
});

export default styles;