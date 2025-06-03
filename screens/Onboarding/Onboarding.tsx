import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import styles from './Onboarding.styles';

type OnboardingScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Onboarding'
>;

type Props = {
  navigation: OnboardingScreenNavigationProp;
};

const { width } = Dimensions.get('window');

const onboardingData = [
  {
    id: 1,
    image: require('../../assets/landing1.jpg'),
    title: 'Fique sempre informado sobre o clima',
  },
  {
    id: 2,
    image: require('../../assets/landing2.jpg'),
    title: 'Receba alertas de desastres naturais',
  },
  {
    id: 3,
    image: require('../../assets/landing3.jpg'),
    title: 'Encontre abrigos, hospitais e contatos de emergência',
  },
];

const Onboarding = ({ navigation }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  // Auto scroll a cada 4 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex === onboardingData.length - 1 ? 0 : prevIndex + 1;
        scrollViewRef.current?.scrollTo({
          x: nextIndex * width,
          animated: true,
        });
        return nextIndex;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setCurrentIndex(index);
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  const navigateToCadastro = () => {
    navigation.navigate('Cadastro');
  };

  const scrollToIndex = (index: number) => {
    setCurrentIndex(index);
    scrollViewRef.current?.scrollTo({
      x: index * width,
      animated: true,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Carrossel de imagens */}
      <View style={styles.carouselContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
          style={styles.scrollView}
        >
          {onboardingData.map((item, index) => (
            <View key={item.id} style={styles.slide}>
              <Image source={item.image} style={styles.slideImage} />
              <View style={styles.overlay} />
              <View style={styles.textContainer}>
                <Text style={styles.slideTitle}>{item.title}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Indicadores de pontos */}
        <View style={styles.dotsContainer}>
          {onboardingData.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dot,
                currentIndex === index ? styles.activeDot : styles.inactiveDot,
              ]}
              onPress={() => scrollToIndex(index)}
            />
          ))}
        </View>
      </View>

      {/* Botões de ação */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={navigateToLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signupButton} onPress={navigateToCadastro}>
          <Text style={styles.signupButtonText}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;