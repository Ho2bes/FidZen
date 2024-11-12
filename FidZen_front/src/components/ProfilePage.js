import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function ProfilePage({ navigation }) {
  const [name, setName] = useState('Betty');
  const [zenSince, setZenSince] = useState('05/02/2024');
  const [lastConnect, setLastConnect] = useState('28/08/24');
  const [email, setEmail] = useState('Holbies@holbies.com');
  const [login, setLogin] = useState('BettyStyle');
  const [password, setPassword] = useState('*******');

  const handleDelete = () => {
    console.log('Profile Deleted');
  };

  const handleSave = () => {
    console.log('Profile updated:', { name, zenSince, lastConnect, email, login, password });
  };

  return (
    <LinearGradient colors={['#43cea2', '#185a9d']} style={styles.gradient}>
      <Image source={require('../assets/logo_fidzen.png')} style={styles.logo} />

      {/* Ajout du ScrollView pour le contenu défilant */}
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>My Profile</Text>

          {/* Champs de saisie pour le profil */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Zen since:</Text>
            <TextInput
              style={styles.input}
              value={zenSince}
              onChangeText={setZenSince}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Last connect:</Text>
            <TextInput
              style={styles.input}
              value={lastConnect}
              onChangeText={setLastConnect}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Login:</Text>
            <TextInput
              style={styles.input}
              value={login}
              onChangeText={setLogin}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password:</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          {/* Bouton pour enregistrer les modifications */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>

          {/* Bouton de suppression du profil */}
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </ScrollView>
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
    width: 200,
    height: 200,
    position: 'absolute',
    top: 50,
  },
  container: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 15,
    marginTop: 250,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  scrollContainer: {
    alignItems: 'center',
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
    backgroundColor: '#f0f0f0', // Couleur de fond gris clair pour les champs
    borderRadius: 10,
    paddingHorizontal: 10,
    color: '#005f99',
  },
  saveButton: {
    backgroundColor: '#4CAF50', // Couleur verte pour enregistrer les modifications
    paddingVertical: 15,
    width: '100%',
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 15,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#ff3b30', // Couleur rouge pour le bouton de suppression
    paddingVertical: 15,
    width: '100%',
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 15,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
