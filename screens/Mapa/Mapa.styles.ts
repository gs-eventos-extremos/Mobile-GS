import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
    backgroundColor: '#000000',
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 24,
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontWeight: 600,
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
    fontWeight: 500,
    marginTop: 20,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
    width: width,
    height: height - 200, // Ajusta para header e bottom tab
  },
  topControls: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2,
  },
  topFilterButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    minWidth: 60,
  },
  topFilterButtonActive: {
    backgroundColor: '#1DB954',
    borderColor: '#1DB954',
  },
  topFilterText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontWeight: 600,
    textAlign: 'center',
  },
  topFilterTextActive: {
    color: '#000000',
    fontWeight: 700,
  },
  topCenterButton: {
    width: 45,
    height: 45,
    backgroundColor: '#1DB954',
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  topCenterButtonText: {
    fontSize: 18,
    color: '#000000',
  },
  routeControls: {
    position: 'absolute',
    bottom: 120, // Acima do bottom tab
    left: 20,
    right: 20,
    zIndex: 2,
  },
  clearRouteButton: {
    backgroundColor: '#FF0000',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  clearRouteText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontWeight: 600,
    textAlign: 'center',
  },
  routeLoading: {
    position: 'absolute',
    top: 80,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  routeLoadingText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontWeight: 500,
    marginLeft: 10,
  },
});

export default styles;