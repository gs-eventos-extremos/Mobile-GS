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
    fontWeight: '600',
  },
  profileButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    width: 44,
    height: 44,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 120, 
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 10,
  },
  // Location section
  locationContainer: {
    marginBottom: 20,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontWeight: '600',
    marginRight: 8,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: '#FFFFFF',
  },
  lastUpdated: {
    fontSize: 14,
    color: '#CCCCCC',
    fontFamily: 'Montserrat',
    fontWeight: '400',
    marginTop: 4,
  },
  // Current weather section
  currentWeatherContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  temperatureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  temperature: {
    fontSize: 72,
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontWeight: '300',
    marginRight: 20,
  },
  weatherIcon: {
    width: 80,
    height: 80,
  },
  weatherDescription: {
    fontSize: 18,
    color: '#CCCCCC',
    fontFamily: 'Montserrat',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 20,
    textTransform: 'capitalize',
  },
  weatherDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  weatherDetailItem: {
    alignItems: 'center',
  },
  weatherDetailLabel: {
    fontSize: 14,
    color: '#CCCCCC',
    fontFamily: 'Montserrat',
    fontWeight: '400',
  },
  weatherDetailValue: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontWeight: '600',
    marginTop: 4,
  },
  // Forecast section
  forecastContainer: {
    marginVertical: 20,
  },
  forecastTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontWeight: '600',
    marginBottom: 15,
  },
  forecastList: {
    paddingHorizontal: 10,
  },
  forecastItem: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 15,
    marginRight: 15,
    alignItems: 'center',
    minWidth: 100,
    borderWidth: 1,
    borderColor: '#333333',
  },
  forecastDay: {
    fontSize: 14,
    color: '#CCCCCC',
    fontFamily: 'Montserrat',
    fontWeight: '500',
    marginBottom: 8,
  },
  forecastIcon: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  forecastTemp: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontWeight: '600',
    marginBottom: 4,
  },
  forecastTempMin: {
    fontSize: 12,
    color: '#CCCCCC',
    fontFamily: 'Montserrat',
    fontWeight: '400',
  },
  // Alerts section
  alertsContainer: {
    marginVertical: 20,
  },
  alertsTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontWeight: '600',
    marginBottom: 15,
  },
  alertsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  alertItem: {
    width: (width - 60) / 2,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#1DB954',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    minHeight: 100,
  },
  alertItemHigh: {
    borderColor: '#FF4444',
    backgroundColor: 'rgba(255, 68, 68, 0.1)',
  },
  alertIcon: {
    width: 32,
    height: 32,
    marginBottom: 8,
    tintColor: '#FFFFFF',
  },
  alertName: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontWeight: '500',
    textAlign: 'center',
  },
  alertLevel: {
    fontSize: 12,
    color: '#1DB954',
    fontFamily: 'Montserrat',
    fontWeight: '400',
    marginTop: 4,
  },
  alertLevelHigh: {
    color: '#FF4444',
  },
  // Empty state for no risks
  emptyPersonalContacts: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#CCCCCC',
    fontFamily: 'Montserrat',
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 24,
  },
  // Location picker modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#1a1a1a',
    borderWidth: 2,
    borderColor: '#1DB954',
    borderRadius: 12,
    padding: 20,
    width: width - 40,
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  locationsList: {
    marginBottom: 20,
  },
  locationModalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
  },
  locationModalItemSelected: {
    borderColor: '#1DB954',
    backgroundColor: 'rgba(29, 185, 84, 0.1)',
  },
  locationModalInfo: {
    flex: 1,
  },
  locationModalName: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontWeight: '600',
    marginBottom: 4,
  },
  locationModalAddress: {
    fontSize: 14,
    color: '#CCCCCC',
    fontFamily: 'Montserrat',
    fontWeight: '400',
  },
  currentLocationItem: {
    borderColor: '#1DB954',
    backgroundColor: 'rgba(29, 185, 84, 0.2)',
  },
  currentLocationText: {
    color: '#1DB954',
  },
  favoriteIcon: {
    fontSize: 16,
    color: '#FFD700',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalCancelButton: {
    flex: 1,
    height: 45,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#1DB954',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  modalCancelText: {
    fontSize: 16,
    color: '#1DB954',
    fontFamily: 'Montserrat',
    fontWeight: '600',
  },
  modalSelectButton: {
    flex: 1,
    height: 45,
    backgroundColor: '#1DB954',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  modalSelectText: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'Montserrat',
    fontWeight: '600',
  },
  // Loading and error states
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    color: '#000000',
    fontFamily: 'Montserrat',
    fontWeight: '600',
  },
});

export default styles;