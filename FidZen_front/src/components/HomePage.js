import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function HomePage({ navigation }) {
  // État pour stocker les cartes de fidélité
  const [fidelityCards, setFidelityCards] = useState([
    { id: 1, name: 'Fidelity Card 1' },
    { id: 2, name: 'Fidelity Card 2' },
    { id: 3, name: 'Fidelity Card 3' },
  ]);

  // Fonction pour naviguer vers les détails de la carte
  const navigateToCardDetails = (cardName) => {
    navigation.navigate('FidelityCardDetails', { cardName });
  };

  return (
    <LinearGradient colors={['#43cea2', '#185a9d']} style={styles.gradient}>
      {/* En-tête avec le logo et l'icône de profil */}
      <View style={styles.header}>
        <Image source={require('../assets/logo_fidzen.png')} style={styles.logo} />

        {/* Icône Profil en haut à droite */}
        <TouchableOpacity style={styles.profileIcon} onPress={() => navigation.navigate('ProfilePage')}>
          <Image source={require('../assets/profile_icon.png')} style={styles.iconImage} />
        </TouchableOpacity>
      </View>

      {/* Conteneur des cartes de fidélité */}
      <View style={styles.container}>
        <Text style={styles.title}>My Fidelity Cards</Text>

        {/* Liste défilante de cartes de fidélité */}
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={true}>
          {fidelityCards.map((card) => (
            <TouchableOpacity key={card.id} style={styles.card} onPress={() => navigateToCardDetails(card.name)}>
              {/* Dégradé de gris pour les cartes */}
              <LinearGradient colors={['#f5f5f5', '#555555']} style={styles.cardGradient}>
                <Text style={styles.cardText}>{card.name}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Bouton Add a Fidelity Card */}
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            setFidelityCards([
              ...fidelityCards,
              { id: fidelityCards.length + 1, name: `Fidelity Card ${fidelityCards.length + 1}` },
            ])
          }
        >
          <Text style={styles.buttonText}>Add a Fidelity Card</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  logo: {
    width: 100,
    height: 100,
  },
  profileIcon: {
    width: 40,
    height: 40,
  },
  iconImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20, // Pour rendre l'icône ronde
  },
  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    marginTop: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    color: '#005f99',
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  card: {
    marginBottom: 15,
  },
  cardGradient: {
    padding: 20,
    borderRadius: 15,
    height: 100, // Hauteur ajustée pour ressembler à une carte
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 18,
    color: '#005f99',
  },
  button: {
    backgroundColor: '#0288d1',
    paddingVertical: 15,
    width: '100%',
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
