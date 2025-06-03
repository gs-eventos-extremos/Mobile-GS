import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import styles from './Mapa.styles';

// Sua API Key do Google Maps
const GOOGLE_MAPS_API_KEY = 'AIzaSyDOdkVikQoziiSFfEcF0VBhP__mQABDsI0';

interface Place {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  type: 'hospital' | 'abrigo';
  address: string;
  rating?: number;
  isOpen?: boolean;
}

interface RouteCoordinate {
  latitude: number;
  longitude: number;
}

const Mapa = () => {
  const [userLocation, setUserLocation] = useState<Region | null>(null);
  const [hospitals, setHospitals] = useState<Place[]>([]);
  const [abrigos, setAbrigos] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [showHospitals, setShowHospitals] = useState(true);
  const [showAbrigos, setShowAbrigos] = useState(true);
  const [routeCoordinates, setRouteCoordinates] = useState<RouteCoordinate[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      // Solicita permissão de localização
      let { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permissão negada', 
          'Não é possível mostrar sua localização sem permissão.'
        );
        setLoading(false);
        return;
      }

      getCurrentLocation();
    } catch (error) {
      console.warn('Erro ao solicitar permissão:', error);
      setLoading(false);
    }
  };

  const getCurrentLocation = async () => {
    try {
      // Obtém a localização atual
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = location.coords;
      const region: Region = {
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      
      setUserLocation(region);
      searchNearbyPlaces(latitude, longitude);
    } catch (error) {
      console.log('Erro ao obter localização:', error);
      Alert.alert('Erro', 'Não foi possível obter sua localização.');
      setLoading(false);
    }
  };

  const searchNearbyPlaces = async (latitude: number, longitude: number) => {
    try {
      setLoading(true);
      
      // Buscar hospitais
      const hospitalsData = await searchPlaces(latitude, longitude, 'hospital');
      setHospitals(hospitalsData);

      // Buscar abrigos (usando diferentes termos)
      const abrigosData = await searchAbrigos(latitude, longitude);
      setAbrigos(abrigosData);

    } catch (error) {
      console.error('Erro ao buscar lugares:', error);
      Alert.alert('Erro', 'Não foi possível carregar os locais próximos.');
    } finally {
      setLoading(false);
    }
  };

  const searchPlaces = async (lat: number, lng: number, type: string): Promise<Place[]> => {
    const radius = 5000; // 5km
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${GOOGLE_MAPS_API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === 'OK') {
        return data.results.map((place: any) => ({
          id: place.place_id,
          name: place.name,
          latitude: place.geometry.location.lat,
          longitude: place.geometry.location.lng,
          type: type as 'hospital' | 'abrigo',
          address: place.vicinity || place.formatted_address || '',
          rating: place.rating,
          isOpen: place.opening_hours?.open_now,
        }));
      }
      return [];
    } catch (error) {
      console.error(`Erro ao buscar ${type}:`, error);
      return [];
    }
  };

  const searchAbrigos = async (lat: number, lng: number): Promise<Place[]> => {
    // Buscar diferentes tipos de abrigos
    const searchTerms = ['abrigo', 'defesa civil', 'escola', 'ginásio esportivo'];
    let allAbrigos: Place[] = [];

    for (const term of searchTerms) {
      const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${term}&location=${lat},${lng}&radius=5000&key=${GOOGLE_MAPS_API_KEY}`;
      
      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'OK') {
          const places = data.results.slice(0, 10).map((place: any) => ({
            id: place.place_id,
            name: place.name,
            latitude: place.geometry.location.lat,
            longitude: place.geometry.location.lng,
            type: 'abrigo' as const,
            address: place.formatted_address || '',
            rating: place.rating,
          }));
          allAbrigos = [...allAbrigos, ...places];
        }
      } catch (error) {
        console.error(`Erro ao buscar ${term}:`, error);
      }
    }

    // Remove duplicatas baseado no ID
    const uniqueAbrigos = allAbrigos.filter((abrigo, index, self) => 
      index === self.findIndex((a) => a.id === abrigo.id)
    );

    return uniqueAbrigos.slice(0, 20); // Limita a 20 abrigos
  };

  const getDirections = async (destinationLat: number, destinationLng: number) => {
    if (!userLocation) {
      Alert.alert('Erro', 'Localização do usuário não encontrada.');
      return;
    }

    setIsLoadingRoute(true);
    
    try {
      const origin = `${userLocation.latitude},${userLocation.longitude}`;
      const destination = `${destinationLat},${destinationLng}`;
      
      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${GOOGLE_MAPS_API_KEY}`;
      
      console.log('URL da requisição:', url); // Debug
      
      const response = await fetch(url);
      const data = await response.json();
      
      console.log('Resposta da API:', data); // Debug

      if (data.status === 'OK' && data.routes.length > 0) {
        const points = data.routes[0].overview_polyline.points;
        const decodedPoints = decodePolyline(points);
        setRouteCoordinates(decodedPoints);

        // Ajustar o zoom para mostrar toda a rota
        const coordinates = [
          { latitude: userLocation.latitude, longitude: userLocation.longitude },
          { latitude: destinationLat, longitude: destinationLng },
        ];
        
        mapRef.current?.fitToCoordinates(coordinates, {
          edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
          animated: true,
        });
      } else {
        // Mostrar erro específico da API
        let errorMessage = 'Não foi possível calcular a rota.';
        
        if (data.status === 'REQUEST_DENIED') {
          errorMessage = 'API Key inválida ou Directions API não ativada.';
        } else if (data.status === 'ZERO_RESULTS') {
          errorMessage = 'Nenhuma rota encontrada para este destino.';
        } else if (data.status === 'OVER_QUERY_LIMIT') {
          errorMessage = 'Limite de consultas excedido.';
        } else if (data.status === 'INVALID_REQUEST') {
          errorMessage = 'Parâmetros da requisição inválidos.';
        }
        
        console.error('Erro da API:', data.status, data.error_message);
        Alert.alert('Erro', `${errorMessage}\n\nStatus: ${data.status}`);
      }
    } catch (error) {
      console.error('Erro ao buscar direções:', error);
      Alert.alert('Erro', 'Erro de conexão ao calcular a rota.');
    } finally {
      setIsLoadingRoute(false);
    }
  };

  // Função para decodificar polyline do Google Maps
  const decodePolyline = (encoded: string): RouteCoordinate[] => {
    const points: RouteCoordinate[] = [];
    let index = 0;
    const len = encoded.length;
    let lat = 0;
    let lng = 0;

    while (index < len) {
      let b;
      let shift = 0;
      let result = 0;
      do {
        b = encoded.charAt(index++).charCodeAt(0) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = ((result & 1) !== 0 ? ~(result >> 1) : (result >> 1));
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charAt(index++).charCodeAt(0) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = ((result & 1) !== 0 ? ~(result >> 1) : (result >> 1));
      lng += dlng;

      points.push({
        latitude: lat / 1e5,
        longitude: lng / 1e5,
      });
    }

    return points;
  };

  const handleMarkerPress = (place: Place) => {
    setSelectedPlace(place);
    Alert.alert(
      place.name,
      `${place.type === 'hospital' ? 'Hospital' : 'Abrigo'}\n${place.address}\n\nDeseja ver a rota até este local?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
          onPress: () => setSelectedPlace(null),
        },
        {
          text: 'Ver Rota',
          onPress: () => getDirections(place.latitude, place.longitude),
        },
      ]
    );
  };

  const clearRoute = () => {
    setRouteCoordinates([]);
    setSelectedPlace(null);
    if (userLocation) {
      mapRef.current?.animateToRegion(userLocation, 1000);
    }
  };

  const centerOnUser = () => {
    if (userLocation && mapRef.current) {
      mapRef.current.animateToRegion(userLocation, 1000);
    }
  };

  const toggleHospitals = () => {
    setShowHospitals(!showHospitals);
  };

  const toggleAbrigos = () => {
    setShowAbrigos(!showAbrigos);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1DB954" />
          <Text style={styles.loadingText}>Carregando mapa...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mapa</Text>
      </View>

      {/* Mapa */}
      <View style={styles.mapContainer}>
        {userLocation && (
          <MapView
            ref={mapRef}
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={userLocation}
            showsUserLocation={true}
            showsMyLocationButton={false}
            zoomEnabled={true}
            scrollEnabled={true}
          >
            {/* Polyline para mostrar a rota */}
            {routeCoordinates.length > 0 && (
              <Polyline
                coordinates={routeCoordinates}
                strokeColor="#1DB954"
                strokeWidth={4}
                lineDashPattern={[0]}
              />
            )}

            {/* Marcadores de Hospitais */}
            {showHospitals && hospitals.map((hospital) => (
              <Marker
                key={`hospital-${hospital.id}`}
                coordinate={{
                  latitude: hospital.latitude,
                  longitude: hospital.longitude,
                }}
                title={hospital.name}
                description={`Hospital • ${hospital.address}`}
                pinColor="#FF0000" // Vermelho para hospitais
                onPress={() => handleMarkerPress(hospital)}
              />
            ))}

            {/* Marcadores de Abrigos */}
            {showAbrigos && abrigos.map((abrigo) => (
              <Marker
                key={`abrigo-${abrigo.id}`}
                coordinate={{
                  latitude: abrigo.latitude,
                  longitude: abrigo.longitude,
                }}
                title={abrigo.name}
                description={`Abrigo • ${abrigo.address}`}
                pinColor="#1DB954" // Verde para abrigos
                onPress={() => handleMarkerPress(abrigo)}
              />
            ))}
          </MapView>
        )}

        {/* Controles do Mapa - Agora na parte superior */}
        <View style={styles.topControls}>
          {/* Filtros horizontais */}
          <TouchableOpacity
            style={[styles.topFilterButton, showHospitals && styles.topFilterButtonActive]}
            onPress={toggleHospitals}
          >
            <Text style={[styles.topFilterText, showHospitals && styles.topFilterTextActive]}>
              🏥 {hospitals.length}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.topFilterButton, showAbrigos && styles.topFilterButtonActive]}
            onPress={toggleAbrigos}
          >
            <Text style={[styles.topFilterText, showAbrigos && styles.topFilterTextActive]}>
              🏠 {abrigos.length}
            </Text>
          </TouchableOpacity>

          {/* Botão centralizar */}
          <TouchableOpacity style={styles.topCenterButton} onPress={centerOnUser}>
            <Text style={styles.topCenterButtonText}>📍</Text>
          </TouchableOpacity>
        </View>

        {/* Botão limpar rota - aparece quando há rota ativa */}
        {routeCoordinates.length > 0 && (
          <View style={styles.routeControls}>
            <TouchableOpacity style={styles.clearRouteButton} onPress={clearRoute}>
              <Text style={styles.clearRouteText}>✕ Limpar Rota</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Indicador de carregamento da rota */}
        {isLoadingRoute && (
          <View style={styles.routeLoading}>
            <ActivityIndicator size="small" color="#1DB954" />
            <Text style={styles.routeLoadingText}>Calculando rota...</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Mapa;