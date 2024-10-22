import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function FirstPage({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Gradient with a more blue-green combination */}
      <LinearGradient colors={['#43cea2', '#185a9d']} style={styles.gradient}>
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
    backgroundColor: '#43cea2', // Backup background color in case the gradient fails
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
    color: '#43cea2',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
