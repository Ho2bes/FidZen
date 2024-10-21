import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function FirstPage({ navigation }) {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#00a3cc', '#005f99']} style={styles.gradient}>
        <Image source={require('../assets/logo_fidzen.png')} style={styles.logo} />
        <Text style={styles.subtitle}>Simplified loyalty personalized reminders</Text>

        <TouchableOpacity onPress={() => navigation.navigate('LoginPage')} style={styles.button}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('RegisterPage')} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00a3cc', // Pour assurer une couleur de fond si le gradient échoue
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: '#00a3cc',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
