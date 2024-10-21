import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CheckBox from '@react-native-community/checkbox';

export default function RegisterPage({ navigation }) {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  // Fonction pour naviguer vers la page TermsContract
  const goToTermsContract = () => {
    navigation.navigate('TermsContract');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Évite que le clavier ne cache la vue
      style={styles.keyboardView}
    >
      <LinearGradient colors={['#00a3cc', '#005f99']} style={styles.gradient}>
        {/* Logo placé au-dessus avec une position absolue */}
        <Image source={require('../assets/logo_fidzen.png')} style={styles.logo} />

        <View style={styles.container}>
          <Text style={styles.title}>Register</Text>

          {/* Champs de saisie avec conteneur de dégradé */}
          <View style={styles.inputContainer}>
            <LinearGradient colors={['#00a3cc', '#005f99']} style={styles.inputGradient}>
              <TextInput
                placeholder="Name"
                placeholderTextColor="#ffffff" // Placeholder en blanc
                style={styles.input}
                value={name}
                onChangeText={setName}
              />
            </LinearGradient>
          </View>
          <View style={styles.inputContainer}>
            <LinearGradient colors={['#00a3cc', '#005f99']} style={styles.inputGradient}>
              <TextInput
                placeholder="Surname"
                placeholderTextColor="#ffffff" // Placeholder en blanc
                style={styles.input}
                value={surname}
                onChangeText={setSurname}
              />
            </LinearGradient>
          </View>
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

          {/* CheckBox */}
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={isChecked}
              onValueChange={setIsChecked}
              style={styles.checkbox}
            />
            <Text style={styles.label}>
              I'm agree with{' '}
              <Text style={styles.link} onPress={goToTermsContract}>
                terms contract
              </Text>
            </Text>
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 10,
  },
  label: {
    color: '#005f99',
  },
  link: {
    color: '#007bff', // Couleur bleue pour le lien
    textDecorationLine: 'underline', // Style souligné pour le lien
  },
  button: {
    width: '60%',
    backgroundColor: '#005f99',
    paddingVertical: 15,
    borderRadius: 25, // Arrondi le bouton
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
