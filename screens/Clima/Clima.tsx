import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  ScrollView,
  Modal,
  FlatList,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useAuth } from '../../src/context/authContext';
import * as Location from 'expo-location';
import styles from './Clima.styles';
import weatherService from '../../src/services/weather.service';
import locationService from '../../src/services/location.service';
import { 
  CurrentWeatherDto, 
  WeatherForecastDto, 
  WeatherAlertDto,
  EnvironmentalRisk 
} from '../../src/types/weather.types';
import { LocationResponseDto } from '../../src/types/location.types';

type ClimaNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Clima = () => {
  const navigation = useNavigation<ClimaNavigationProp>();
  const { user } = useAuth();
  
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherDto | null>(null);
  const [forecast, setForecast] = useState<WeatherForecastDto[]>([]);
  const [alerts, setAlerts] = useState<WeatherAlertDto[]>([]);
  const [environmentalRisks, setEnvironmentalRisks] = useState<EnvironmentalRisk[]>([]);
  const [userLocations, setUserLocations] = useState<LocationResponseDto[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<LocationResponseDto | null>(null);
  const [currentCoords, setCurrentCoords] = useState<{latitude: number, longitude: number} | null>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLocationModalVisible, setIsLocationModalVisible] = useState(false);
  const [tempSelectedLocation, setTempSelectedLocation] = useState<LocationResponseDto | null>(null);

  useEffect(() => {
    initializeWeatherData();
  }, []);

  const initializeWeatherData = async () => {
    setIsLoading(true);
    try {
      await getUserLocation();
      if (user) {
        await fetchUserLocations();
      }
    } catch (error) {
      console.error('Erro ao inicializar dados do clima:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserLocation = async () => {
    try {
      // Solicitar permissão de localização
      let { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permissão de Localização',
          'Permita o acesso à localização para obter o clima atual da sua região.',
          [{ text: 'OK' }]
        );
        return;
      }

      // Obter localização atual
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      
      setCurrentCoords(coords);
      await fetchWeatherData(coords.latitude, coords.longitude);
      
    } catch (error) {
      console.error('Erro ao obter localização:', error);
      Alert.alert('Erro', 'Não foi possível obter sua localização');
    }
  };

  const fetchUserLocations = async () => {
    if (!user) return;
    
    try {
      const locations = await locationService.getUserLocations(user.id);
      setUserLocations(locations);
    } catch (error) {
      console.error('Erro ao buscar localizações:', error);
    }
  };

  const fetchWeatherData = async (latitude: number, longitude: number) => {
    try {
      // Buscar dados completos do clima
      const [weatherData, forecastData, alertsData] = await Promise.all([
        weatherService.getCurrentWeather(latitude, longitude),
        weatherService.getWeatherForecast(latitude, longitude),
        weatherService.getWeatherAlerts(latitude, longitude),
      ]);

      setCurrentWeather(weatherData);
      setForecast(forecastData);
      setAlerts(alertsData);
      
      // Calcular riscos ambientais
      const risks = weatherService.getEnvironmentalRisks(weatherData, alertsData);
      setEnvironmentalRisks(risks);
      
    } catch (error) {
      console.error('Erro ao buscar dados do clima:', error);
      Alert.alert('Erro', 'Não foi possível carregar os dados do clima');
    }
  };

  const fetchWeatherByLocation = async (location: LocationResponseDto) => {
    try {
      setIsLoading(true);
      await fetchWeatherData(location.latitude, location.longitude);
      setSelectedLocation(location);
    } catch (error) {
      console.error('Erro ao buscar clima da localização:', error);
      Alert.alert('Erro', 'Erro ao carregar clima da localização');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      if (selectedLocation) {
        await fetchWeatherByLocation(selectedLocation);
      } else if (currentCoords) {
        await fetchWeatherData(currentCoords.latitude, currentCoords.longitude);
      } else {
        await getUserLocation();
      }
    } catch (error) {
      console.error('Erro ao atualizar:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleProfilePress = () => {
    navigation.navigate('Perfil');
  };

  const openLocationModal = () => {
    setTempSelectedLocation(selectedLocation);
    setIsLocationModalVisible(true);
  };

  const closeLocationModal = () => {
    setIsLocationModalVisible(false);
    setTempSelectedLocation(null);
  };

  const confirmLocationSelection = async () => {
    if (tempSelectedLocation) {
      await fetchWeatherByLocation(tempSelectedLocation);
    } else {
      // Voltar para localização atual
      setSelectedLocation(null);
      if (currentCoords) {
        await fetchWeatherData(currentCoords.latitude, currentCoords.longitude);
      }
    }
    closeLocationModal();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'hoje';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'amanhã';
    } else {
      return date.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');
    }
  };

  const getLastUpdatedText = () => {
    if (!currentWeather) return '';
    
    const now = new Date();
    const updated = new Date(currentWeather.updatedAt);
    const diffMinutes = Math.floor((now.getTime() - updated.getTime()) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Atualizado agora';
    if (diffMinutes === 1) return 'Atualizado há 1 min';
    if (diffMinutes < 60) return `Atualizado há ${diffMinutes} min`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours === 1) return 'Atualizado há 1 hora';
    return `Atualizado há ${diffHours} horas`;
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'crítico': return '#FF0000';
      case 'alto': return '#FF4444';
      case 'moderado': return '#FFA500';
      case 'baixo': return '#1DB954';
      default: return '#1DB954';
    }
  };

  const getIconForRisk = (iconName: string) => {
    switch (iconName) {
      case 'alagamento':
        return require('../../assets/alagamento.png');
      case 'deslizamento':
        return require('../../assets/deslizamento.png');
      case 'seca':
        return require('../../assets/seca.png');
      case 'queimada':
        return require('../../assets/queimada.png');
      case 'tornado':
        return require('../../assets/tornados.png');
      default:
        return require('../../assets/alagamento.png'); // Fallback
    }
  };

  const renderForecastItem = ({ item }: { item: WeatherForecastDto }) => (
    <View style={styles.forecastItem}>
      <Text style={styles.forecastDay}>{formatDate(item.date)}</Text>
      <Image source={{ uri: item.icon }} style={styles.forecastIcon} />
      <Text style={styles.forecastTemp}>{Math.round(item.temperatureMax)}°</Text>
      <Text style={styles.forecastTempMin}>{Math.round(item.temperatureMin)}°</Text>
    </View>
  );

  const renderLocationModalItem = ({ item }: { item: LocationResponseDto | null }) => {
    const isCurrentLocation = item === null;
    const isSelected = tempSelectedLocation === item;
    
    return (
      <TouchableOpacity
        style={[
          styles.locationModalItem,
          isCurrentLocation && styles.currentLocationItem,
          isSelected && styles.locationModalItemSelected,
        ]}
        onPress={() => setTempSelectedLocation(item)}
      >
        <View style={styles.locationModalInfo}>
          <Text style={[
            styles.locationModalName,
            isCurrentLocation && styles.currentLocationText
          ]}>
            {isCurrentLocation ? 'Localização Atual' : item!.name}
          </Text>
          <Text style={styles.locationModalAddress}>
            {isCurrentLocation 
              ? (currentWeather ? `${currentWeather.city}, ${currentWeather.state}` : 'Sua localização')
              : `${item!.city}, ${item!.state}, ${item!.country}`
            }
          </Text>
        </View>
        {item?.isFavorite && <Text style={styles.favoriteIcon}>⭐</Text>}
      </TouchableOpacity>
    );
  };

  if (isLoading && !currentWeather) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Clima</Text>
          <TouchableOpacity style={styles.profileButton} onPress={handleProfilePress}>
            <Image source={require('../../assets/user.png')} style={styles.profileIcon} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1DB954" />
          <Text style={styles.loadingText}>Carregando dados do clima...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!currentWeather) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Clima</Text>
          <TouchableOpacity style={styles.profileButton} onPress={handleProfilePress}>
            <Image source={require('../../assets/user.png')} style={styles.profileIcon} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Não foi possível carregar os dados do clima.{'\n'}Verifique sua conexão e tente novamente.
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={initializeWeatherData}>
            <Text style={styles.retryButtonText}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Clima</Text>
        <TouchableOpacity style={styles.profileButton} onPress={handleProfilePress}>
          <Image source={require('../../assets/user.png')} style={styles.profileIcon} />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              tintColor="#1DB954"
              colors={['#1DB954']}
            />
          }
        >
          {/* Location Section */}
          <View style={styles.locationContainer}>
            <TouchableOpacity style={styles.locationButton} onPress={openLocationModal}>
              <Text style={styles.locationText}>
                {selectedLocation 
                  ? `${selectedLocation.city}, ${selectedLocation.state}`
                  : `${currentWeather.city}, ${currentWeather.state}`
                }
              </Text>
              <Image source={require('../../assets/search.png')} style={styles.searchIcon} />
            </TouchableOpacity>
            <Text style={styles.lastUpdated}>{getLastUpdatedText()}</Text>
          </View>

          {/* Current Weather */}
          <View style={styles.currentWeatherContainer}>
            <View style={styles.temperatureContainer}>
              <Text style={styles.temperature}>{Math.round(currentWeather.temperature)}°C</Text>
              <Image source={{ uri: currentWeather.icon }} style={styles.weatherIcon} />
            </View>
            
            <Text style={styles.weatherDescription}>{currentWeather.description}</Text>
            
            <View style={styles.weatherDetails}>
              <View style={styles.weatherDetailItem}>
                <Text style={styles.weatherDetailLabel}>Sensação</Text>
                <Text style={styles.weatherDetailValue}>{Math.round(currentWeather.feelsLike)}°C</Text>
              </View>
              <View style={styles.weatherDetailItem}>
                <Text style={styles.weatherDetailLabel}>Umidade</Text>
                <Text style={styles.weatherDetailValue}>{Math.round(currentWeather.humidity)}%</Text>
              </View>
            </View>
          </View>

          {/* Forecast Section */}
          {forecast.length > 0 && (
            <View style={styles.forecastContainer}>
              <Text style={styles.forecastTitle}>Próximos 6 dias</Text>
              <FlatList
                data={forecast.slice(0, 6)}
                renderItem={renderForecastItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.forecastList}
              />
            </View>
          )}

          {/* Environmental Risks Section */}
          <View style={styles.alertsContainer}>
            <Text style={styles.alertsTitle}>Riscos ambientais</Text>
            {environmentalRisks.length === 0 ? (
              <View style={styles.emptyPersonalContacts}>
                <Text style={styles.emptyText}>
                  Nenhum risco no momento
                </Text>
              </View>
            ) : (
              <View style={styles.alertsGrid}>
                {environmentalRisks.slice(0, 6).map((risk, index) => (
                  <View 
                    key={risk.id}
                    style={[
                      styles.alertItem,
                      (risk.level === 'alto' || risk.level === 'crítico') && styles.alertItemHigh
                    ]}
                  >
                    <Image 
                      source={getIconForRisk(risk.icon)}
                      style={styles.alertIcon} 
                    />
                    <Text style={styles.alertName}>{risk.name}</Text>
                    <Text style={[
                      styles.alertLevel,
                      (risk.level === 'alto' || risk.level === 'crítico') && styles.alertLevelHigh
                    ]}>
                      {risk.level}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      </View>

      {/* Location Selection Modal */}
      <Modal
        visible={isLocationModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeLocationModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Escolher localização</Text>
            
            <FlatList
              data={[null, ...userLocations]} // null representa localização atual
              renderItem={renderLocationModalItem}
              keyExtractor={(item) => item?.id.toString() || 'current'}
              style={styles.locationsList}
              showsVerticalScrollIndicator={false}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalCancelButton} onPress={closeLocationModal}>
                <Text style={styles.modalCancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalSelectButton} onPress={confirmLocationSelection}>
                <Text style={styles.modalSelectText}>Selecionar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Clima;