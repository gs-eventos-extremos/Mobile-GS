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
  TextInput,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useAuth } from '../../src/context/authContext';
import styles from './Emergencia.styles';
import emergencyContactService from '../../src/services/emergencyContact.service';
import { EmergencyContactResponseDto, CreateEmergencyContactDto, DefaultEmergencyContact } from '../../src/types/emergencyContact.types';

type EmergenciaNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Contatos padrão do sistema
const DEFAULT_CONTACTS: DefaultEmergencyContact[] = [
  { id: 'defesa-civil', name: 'Defesa Civil', phoneNumber: '199', isDefault: true },
  { id: 'bombeiros', name: 'Bombeiros', phoneNumber: '193', isDefault: true },
  { id: 'samu', name: 'SAMU', phoneNumber: '192', isDefault: true },
  { id: 'policia-militar', name: 'Polícia Militar', phoneNumber: '190', isDefault: true },
  { id: 'cge', name: 'CGE', phoneNumber: '181', description: 'Central de Gestão de Emergências', isDefault: true },
  { id: 'energia-eletrica', name: 'Companhia de Energia Elétrica', phoneNumber: '0800-771-0100', isDefault: true },
  { id: 'agua-esgoto', name: 'Concessionária de água/esgoto', phoneNumber: '195', isDefault: true },
];

const Emergencia = () => {
  const navigation = useNavigation<EmergenciaNavigationProp>();
  const { user } = useAuth();
  
  const [personalContacts, setPersonalContacts] = useState<EmergencyContactResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingContact, setEditingContact] = useState<EmergencyContactResponseDto | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form fields
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    country: 'Brasil',
    relationship: '',
    isPrimary: false,
  });

  useEffect(() => {
    fetchPersonalContacts();
  }, []);

  const fetchPersonalContacts = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const response = await emergencyContactService.getUserContacts(user.id);
      setPersonalContacts(response);
    } catch (error: any) {
      console.error('Erro ao buscar contatos:', error);
      Alert.alert('Erro', 'Erro ao carregar contatos de emergência');
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfilePress = () => {
    navigation.navigate('Perfil');
  };

  const makePhoneCall = (phoneNumber: string) => {
    const phoneUrl = `tel:${phoneNumber}`;
    
    Linking.canOpenURL(phoneUrl)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(phoneUrl);
        } else {
          Alert.alert('Erro', 'Não é possível fazer chamadas neste dispositivo');
        }
      })
      .catch((err) => {
        console.error('Erro ao fazer ligação:', err);
        Alert.alert('Erro', 'Erro ao tentar fazer a ligação');
      });
  };

  const openAddModal = () => {
    setEditingContact(null);
    setFormData({
      name: '',
      phoneNumber: '',
      country: 'Brasil',
      relationship: '',
      isPrimary: false,
    });
    setIsModalVisible(true);
  };

  const openEditModal = (contact: EmergencyContactResponseDto) => {
    setEditingContact(contact);
    setFormData({
      name: contact.name,
      phoneNumber: contact.phoneNumber,
      country: 'Brasil', // A API já retorna com countryCode, mas vamos usar Brasil como padrão
      relationship: contact.relationship || '',
      isPrimary: contact.isPrimary,
    });
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setEditingContact(null);
    setFormData({
      name: '',
      phoneNumber: '',
      country: 'Brasil',
      relationship: '',
      isPrimary: false,
    });
  };

  const handleSaveContact = async () => {
    if (!user) return;

    // Validações
    if (!formData.name.trim()) {
      Alert.alert('Erro', 'Nome é obrigatório');
      return;
    }
    if (!formData.phoneNumber.trim()) {
      Alert.alert('Erro', 'Número de telefone é obrigatório');
      return;
    }

    try {
      setIsSaving(true);

      const contactData: CreateEmergencyContactDto = {
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        country: formData.country,
        relationship: formData.relationship,
        isPrimary: formData.isPrimary,
      };

      if (editingContact) {
        // Atualizar contato existente
        await emergencyContactService.updateContact(user.id, editingContact.id, contactData);
        Alert.alert('Sucesso', 'Contato atualizado com sucesso!');
      } else {
        // Criar novo contato
        await emergencyContactService.createContact(user.id, contactData);
        Alert.alert('Sucesso', 'Contato cadastrado com sucesso!');
      }

      closeModal();
      fetchPersonalContacts(); // Recarregar lista
    } catch (error: any) {
      console.error('Erro ao salvar contato:', error);
      let errorMessage = 'Erro ao salvar contato';
      
      if (error.message) {
        errorMessage = error.message;
      }
      
      Alert.alert('Erro', errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteContact = (contact: EmergencyContactResponseDto) => {
    Alert.alert(
      'Excluir Contato',
      `Tem certeza que deseja excluir "${contact.name}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive',
          onPress: () => confirmDeleteContact(contact.id)
        },
      ]
    );
  };

  const confirmDeleteContact = async (contactId: number) => {
    if (!user) return;

    try {
      await emergencyContactService.deleteContact(user.id, contactId);
      Alert.alert('Sucesso', 'Contato excluído com sucesso!');
      fetchPersonalContacts(); // Recarregar lista
    } catch (error: any) {
      console.error('Erro ao excluir contato:', error);
      Alert.alert('Erro', 'Erro ao excluir contato');
    }
  };

  const renderDefaultContact = (contact: DefaultEmergencyContact) => (
    <View key={contact.id} style={styles.contactItem}>
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{contact.name}</Text>
        <Text style={styles.contactPhone}>{contact.phoneNumber}</Text>
        {contact.description && (
          <Text style={styles.contactRelationship}>{contact.description}</Text>
        )}
      </View>
      <TouchableOpacity 
        style={styles.phoneButton}
        onPress={() => makePhoneCall(contact.phoneNumber)}
      >
        <Image source={require('../../assets/tel.png')} style={styles.phoneIcon} />
      </TouchableOpacity>
    </View>
  );

  const renderPersonalContact = (contact: EmergencyContactResponseDto) => (
    <View key={contact.id} style={styles.personalContactItem}>
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{contact.name}</Text>
        <Text style={styles.contactPhone}>
          {contact.countryCode} {contact.phoneNumber}
        </Text>
        {contact.relationship && (
          <Text style={styles.contactRelationship}>{contact.relationship}</Text>
        )}
        {contact.isPrimary && (
          <View style={styles.primaryBadge}>
            <Text style={styles.primaryText}>PRINCIPAL</Text>
          </View>
        )}
      </View>
      <View style={styles.personalContactActions}>
        <TouchableOpacity 
          style={styles.phoneButton}
          onPress={() => makePhoneCall(contact.phoneNumber)}
        >
          <Image source={require('../../assets/tel.png')} style={styles.phoneIcon} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => openEditModal(contact)}
        >
          <Image source={require('../../assets/edit.png')} style={styles.editIcon} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleDeleteContact(contact)}
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
          <Text style={styles.headerTitle}>Emergência</Text>
          <TouchableOpacity style={styles.profileButton} onPress={handleProfilePress}>
            <Image source={require('../../assets/user.png')} style={styles.profileIcon} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1DB954" />
          <Text style={styles.loadingText}>Carregando contatos...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Emergência</Text>
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
        >
          {/* Default Emergency Contacts */}
          <Text style={styles.sectionTitle}>Contatos de emergência</Text>
          {DEFAULT_CONTACTS.map(renderDefaultContact)}

          {/* Personal Emergency Contacts */}
          <View style={styles.personalContactsHeader}>
            <Text style={styles.sectionTitle}>Contatos pessoais</Text>
            <TouchableOpacity style={styles.addContactButton} onPress={openAddModal}>
              <Text style={styles.addContactText}>Adicionar</Text>
              <Text style={styles.addIcon}>+</Text>
            </TouchableOpacity>
          </View>

          {personalContacts.length === 0 ? (
            <View style={styles.emptyPersonalContacts}>
              <Text style={styles.emptyText}>
                Nenhum contato pessoal cadastrado.{'\n'}Adicione contatos de familiares ou amigos.
              </Text>
            </View>
          ) : (
            personalContacts.map(renderPersonalContact)
          )}
        </ScrollView>
      </View>

      {/* Modal for Add/Edit Contact */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {editingContact ? 'Editar contato' : 'Adicionar contato'}
            </Text>

            <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
              {/* Nome */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nome *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: João (Pai), Maria (Mãe)..."
                  placeholderTextColor="#999"
                  value={formData.name}
                  onChangeText={(text) => setFormData({ ...formData, name: text })}
                />
              </View>

              {/* Telefone e País */}
              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, styles.inputHalf]}>
                  <Text style={styles.inputLabel}>Telefone *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="(11) 99999-9999"
                    placeholderTextColor="#999"
                    value={formData.phoneNumber}
                    onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
                    keyboardType="phone-pad"
                  />
                </View>

                <View style={[styles.inputGroup, styles.inputHalf]}>
                  <Text style={styles.inputLabel}>País</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="País"
                    placeholderTextColor="#999"
                    value={formData.country}
                    onChangeText={(text) => setFormData({ ...formData, country: text })}
                  />
                </View>
              </View>

              {/* Relacionamento */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Relacionamento</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: Pai, Mãe, Irmão, Amigo..."
                  placeholderTextColor="#999"
                  value={formData.relationship}
                  onChangeText={(text) => setFormData({ ...formData, relationship: text })}
                />
              </View>

              {/* Contato Principal */}
              <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>Contato principal</Text>
                <TouchableOpacity
                  style={[
                    styles.switch,
                    formData.isPrimary ? styles.switchActive : styles.switchInactive
                  ]}
                  onPress={() => setFormData({ ...formData, isPrimary: !formData.isPrimary })}
                >
                  <View style={[
                    styles.switchThumb,
                    {
                      alignSelf: formData.isPrimary ? 'flex-end' : 'flex-start',
                      backgroundColor: formData.isPrimary ? '#000000' : '#CCCCCC'
                    }
                  ]} />
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
                onPress={handleSaveContact}
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
    </SafeAreaView>
  );
};

export default Emergencia;