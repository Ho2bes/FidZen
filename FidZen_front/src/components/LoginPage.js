import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function LoginPage({ navigation }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Évite que le clavier ne cache la vue
      style={styles.keyboardView}
    >
      <LinearGradient colors={['#00a3cc', '#005f99']} style={styles.gradient}>
        {/* Logo placé au-dessus avec une position absolue */}
        <Image source={require('../assets/logo_fidzen.png')} style={styles.logo} />

        <View style={styles.container}>
          <Text style={styles.title}>Sign in</Text>

          {/* Champs de saisie avec conteneur de dégradé */}
          <View style={styles.inputContainer}>
            <LinearGradient colors={['#00a3cc', '#005f99']} style={styles.inputGradient}>
              <TextInput
                placeholder="Login"
                placeholderTextColor="#ffffff" // Placeholder en blanc
                style={styles.input}
                value={login}
                onChangeText={setLogin}
              />
            </LinearGradient>
          </View>
          <View style={styles.inputContainer}>
            <LinearGradient colors={['#00a3cc', '#005f99']} style={styles.inputGradient}>
              <TextInput
                placeholder="Password"
                placeholderTextColor="#ffffff" // Placeholder en blanc
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </LinearGradient>
          </View>

          {/* Bouton Enter */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('HomePage')}
          >
            <Text style={styles.buttonText}>Enter</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  container: {
    width: '90%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15, // Pour arrondir l'arrière-plan des champs
    paddingVertical: 30,
    marginTop: 180, // Ajouter un espace pour que le logo ne se superpose pas
  },
  logo: {
    width: 200,  // Largeur du logo ajustée
    height: 200, // Hauteur du logo ajustée
    position: 'absolute', // Le logo flottant au-dessus
    top: 20, // Position du logo en haut
  },
  title: {
    fontSize: 32,
    color: '#005f99',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  inputGradient: {
    borderRadius: 5, // Même arrondi que les champs
    padding: 2, // Ajoute un léger padding pour l'effet de bord
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'transparent', // Fond transparent pour laisser le dégradé
    paddingHorizontal: 10,
    color: '#ffffff', // Texte en blanc
    borderRadius: 5,
  },
  button: {
    width: '60%',
    backgroundColor: '#005f99',
    paddingVertical: 15,
    borderRadius: 25, // Arrondi le bouton
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
