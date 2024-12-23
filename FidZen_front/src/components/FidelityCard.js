import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function FidelityCard({ navigation }) {
  const [cardNumber, setCardNumber] = useState('');
  const [storeName, setStoreName] = useState('');

  const handleTakePhoto = () => {
    console.log('Taking a photo of the card');
  };

  const handleAddCard = () => {
    console.log('Card added:', { cardNumber, storeName });
  };

  const handleDeleteCard = () => {
    // Logique pour supprimer la carte
    console.log('Card deleted:', { cardNumber, storeName });
    setCardNumber(''); // Réinitialise le numéro de carte
    setStoreName(''); // Réinitialise le nom du magasin
  };

  return (
    <LinearGradient colors={['#43cea2', '#185a9d']} style={styles.gradient}>
      <Image source={require('../assets/logo_fidzen.png')} style={styles.logo} />

      <View style={styles.container}>
        <Text style={styles.title}>Add Fidelity Card</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Card Number:</Text>
          <TextInput
            style={styles.input}
            value={cardNumber}
            onChangeText={setCardNumber}
            placeholder="Enter card number"
            placeholderTextColor="#c0c0c0"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Store Name:</Text>
          <TextInput
            style={styles.input}
            value={storeName}
            onChangeText={setStoreName}
            placeholder="Enter store name"
            placeholderTextColor="#c0c0c0"
          />
        </View>

        <TouchableOpacity style={styles.photoButton} onPress={handleTakePhoto}>
          <Text style={styles.photoButtonText}>Take a Picture</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addButton} onPress={handleAddCard}>
          <Text style={styles.addButtonText}>Add Card</Text>
        </TouchableOpacity>

        {/* Bouton pour supprimer la carte */}
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteCard}>
          <Text style={styles.deleteButtonText}>Delete Card</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: 150,
    height: 150,
    position: 'absolute',
    top: 50,
  },
  container: {
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    marginTop: 180,
  },
  title: {
    fontSize: 24,
    color: '#005f99',
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#005f99',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 10,
    color: '#005f99',
  },
  photoButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    width: '100%',
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  photoButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#0288d1',
    paddingVertical: 15,
    width: '100%',
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#d32f2f', // Couleur rouge pour le bouton de suppression
    paddingVertical: 15,
    width: '100%',
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
