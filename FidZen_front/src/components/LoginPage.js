import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function LoginPage({ navigation }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardView}
    >
      {/* Utilisation du même dégradé bleu-vert que sur la FirstPage */}
      <LinearGradient colors={['#43cea2', '#185a9d']} style={styles.gradient}>
        <Image source={require('../assets/logo_fidzen.png')} style={styles.logo} />

        <View style={styles.container}>
          <Text style={styles.title}>Sign in</Text>

          {/* Champs de saisie pour Login */}
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Login"
              placeholderTextColor="#005f99" // Texte en bleu foncé
              style={styles.input}
              value={login}
              onChangeText={setLogin}
            />
          </View>

          {/* Champs de saisie pour Password */}
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#005f99" // Texte en bleu foncé
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
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
    borderRadius: 15,
    paddingVertical: 30,
    marginTop: 180,
  },
  logo: {
    width: 200,
    height: 200,
    position: 'absolute',
    top: 20,
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
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f0f0f0', // Fond gris clair
    paddingHorizontal: 10,
    color: '#005f99', // Texte en bleu foncé
    borderRadius: 5,
  },
  button: {
    width: '60%',
    backgroundColor: '#005f99',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
