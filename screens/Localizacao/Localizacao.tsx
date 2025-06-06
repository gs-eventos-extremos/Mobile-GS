import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  FlatList,
  Modal,
  TextInput,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useAuth } from '../../src/context/authContext';
import CustomBottomTab from '../../components/CustomBottomTabNavigation';
import styles from './Localizacao.style';
import locationService from '../../src/services/location.service';
import { LocationResponseDto, CreateLocationByAddressDto } from '../../src/types/location.types';

type LocalizacaoNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Localizacao = () => {
  const navigation = useNavigation<LocalizacaoNavigationProp>();
  const { user } = useAuth();
  
  const [locations, setLocations] = useState<LocationResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingLocation, setEditingLocation] = useState<LocationResponseDto | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form fields
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    state: '',
    country: 'Brasil',
    isFavorite: false,
  });

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const response = await locationService.getUserLocations(user.id);
      setLocations(response);
    } catch (error: any) {
      console.error('Erro ao buscar localizações:', error);
      Alert.alert('Erro', 'Erro ao carregar localizações');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const openAddModal = () => {
    setEditingLocation(null);
    setFormData({
      name: '',
      city: '',
      state: '',
      country: 'Brasil',
      isFavorite: false,
    });
    setIsModalVisible(true);
  };

  const openEditModal = (location: LocationResponseDto) => {
    setEditingLocation(location);
    setFormData({
      name: location.name,
      city: location.city || '',
      state: location.state || '',
      country: location.country || 'Brasil',
      isFavorite: location.isFavorite,
    });
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setEditingLocation(null);
    setFormData({
      name: '',
      city: '',
      state: '',
      country: 'Brasil',
      isFavorite: false,
    });
  };

  const handleSaveLocation = async () => {
    if (!user) return;

    // Validações
    if (!formData.name.trim()) {
      Alert.alert('Erro', 'Nome da localização é obrigatório');
      return;
    }
    if (!formData.city.trim()) {
      Alert.alert('Erro', 'Cidade é obrigatória');
      return;
    }
    if (!formData.state.trim()) {
      Alert.alert('Erro', 'Estado é obrigatório');
      return;
    }

    try {
      setIsSaving(true);

      if (editingLocation) {
        // Atualizar localização existente
        await locationService.updateLocation(user.id, editingLocation.id, {
          name: formData.name,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          isFavorite: formData.isFavorite,
        });
        Alert.alert('Sucesso', 'Localização atualizada com sucesso!');
      } else {
        // Criar nova localização
        const newLocationData: CreateLocationByAddressDto = {
          name: formData.name,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          isFavorite: formData.isFavorite,
        };
        
        await locationService.createLocationByAddress(user.id, newLocationData);
        Alert.alert('Sucesso', 'Localização cadastrada com sucesso!');
      }

      closeModal();
      fetchLocations(); // Recarregar lista
    } catch (error: any) {
      console.error('Erro ao salvar localização:', error);
      let errorMessage = 'Erro ao salvar localização';
      
      if (error.message.includes('não encontrado')) {
        errorMessage = 'Endereço não encontrado. Verifique cidade, estado e país.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      Alert.alert('Erro', errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteLocation = (location: LocationResponseDto) => {
    Alert.alert(
      'Excluir Localização',
      `Tem certeza que deseja excluir "${location.name}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive',
          onPress: () => confirmDeleteLocation(location.id)
        },
      ]
    );
  };

  const confirmDeleteLocation = async (locationId: number) => {
    if (!user) return;

    try {
      await locationService.deleteLocation(user.id, locationId);
      Alert.alert('Sucesso', 'Localização excluída com sucesso!');
      fetchLocations(); // Recarregar lista
    } catch (error: any) {
      console.error('Erro ao excluir localização:', error);
      Alert.alert('Erro', 'Erro ao excluir localização');
    }
  };

  const renderLocationItem = ({ item }: { item: LocationResponseDto }) => (
    <View style={styles.locationItem}>
      {item.isFavorite && (
        <Text style={[styles.favoriteIcon, { color: '#FFD700' }]}>⭐</Text>
      )}
      <View style={styles.locationInfo}>
        <Text style={styles.locationName}>{item.name}</Text>
        <Text style={styles.locationAddress}>
          {item.city}, {item.state}, {item.country}
        </Text>
      </View>
      <View style={styles.locationActions}>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => openEditModal(item)}
        >
          <Image source={require('../../assets/edit.png')} style={styles.editIcon} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => handleDeleteLocation(item)}
        >
          <Image source={require('../../assets/delete.png')} style={styles.deleteIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Image source={require('../../assets/voltar.png')} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Localizações</Text>
        </View>
        
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1DB954" />
          <Text style={styles.loadingText}>Carregando localizações...</Text>
        </View>
        
        <CustomBottomTab activeTab="Guia" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Image source={require('../../assets/voltar.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Localizações</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatarCircle}>
            <Image source={require('../../assets/user.png')} style={styles.avatarIcon} />
          </View>
        </View>

        {/* Add Location Button */}
        <TouchableOpacity 
          style={styles.addLocationContainer}
          onPress={openAddModal}
        >
          <Text style={styles.addLocationText}>Adicionar localização</Text>
          <View style={styles.addLocationButton}>
            <Text style={styles.addLocationIcon}>+</Text>
          </View>
        </TouchableOpacity>

        {/* Locations List */}
        {locations.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Nenhuma localização cadastrada.{'\n'}Toque em "Adicionar localização" para começar.
            </Text>
          </View>
        ) : (
          <FlatList
            data={locations}
            renderItem={renderLocationItem}
            keyExtractor={(item) => item.id.toString()}
            style={styles.locationsList}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      {/* Modal for Add/Edit Location */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {editingLocation ? 'Edite o endereço:' : 'Adicionar localização'}
            </Text>

            <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
              {/* Nome */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nome da localização</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: Casa, Trabalho, Escola..."
                  placeholderTextColor="#999"
                  value={formData.name}
                  onChangeText={(text) => setFormData({ ...formData, name: text })}
                />
              </View>

              {/* Cidade e Estado */}
              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, styles.inputHalf]}>
                  <Text style={styles.inputLabel}>Cidade</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Cidade"
                    placeholderTextColor="#999"
                    value={formData.city}
                    onChangeText={(text) => setFormData({ ...formData, city: text })}
                  />
                </View>

                <View style={[styles.inputGroup, styles.inputHalf]}>
                  <Text style={styles.inputLabel}>Estado</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Estado"
                    placeholderTextColor="#999"
                    value={formData.state}
                    onChangeText={(text) => setFormData({ ...formData, state: text })}
                  />
                </View>
              </View>

              {/* País */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>País</Text>
                <TextInput
                  style={styles.input}
                  placeholder="País"
                  placeholderTextColor="#999"
                  value={formData.country}
                  onChangeText={(text) => setFormData({ ...formData, country: text })}
                />
              </View>

              {/* Favorito */}
              <View style={styles.favoriteContainer}>
                <Text style={styles.favoriteLabel}>Marcar como favorita</Text>
                <TouchableOpacity
                  style={[styles.checkbox, formData.isFavorite && styles.checkboxChecked]}
                  onPress={() => setFormData({ ...formData, isFavorite: !formData.isFavorite })}
                >
                  {formData.isFavorite && <Text style={styles.checkboxText}>✓</Text>}
                </TouchableOpacity>
              </View>
            </ScrollView>

            {/* Buttons */}
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.saveButton, isSaving && { opacity: 0.7 }]} 
                onPress={handleSaveLocation}
                disabled={isSaving}
              >
                <Text style={styles.saveButtonText}>
                  {isSaving ? 'Salvando...' : 'Salvar'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Custom Bottom Tab */}
      <CustomBottomTab activeTab="Guia" />
    </SafeAreaView>
  );
};

export default Localizacao;