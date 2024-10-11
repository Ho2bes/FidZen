import React, { useState } from 'react';
import { Button, TextInput, Text, ScrollView } from 'react-native';
import { register, login } from '../api/auth.api';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      // Correction de l'appel de la fonction register avec les bons paramètres
      const response = await register(email, password, name);
      setMessage(response.message || 'Enregistrement réussi');
      setEmail('');
      setPassword('');
      setName('');
    } catch (error) {
      // Ajout d'une meilleure gestion des erreurs pour capturer plus de détails
      console.error('Erreur lors de l’enregistrement', error.response ? error.response.data : error.message);
      setMessage('Erreur lors de l’enregistrement');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await login({ email, password });
      setToken(response.token);
      setMessage('Connexion réussie');
    } catch (error) {
      console.error('Erreur lors de la connexion', error.response ? error.response.data : error.message);
      setMessage('Erreur lors de la connexion');
    }
  };

  return (
    <ScrollView>
      <TextInput value={email} onChangeText={setEmail} placeholder="Email" />
      <TextInput value={password} onChangeText={setPassword} placeholder="Mot de passe" secureTextEntry />
      <TextInput value={name} onChangeText={setName} placeholder="Nom" />

      <Button title="S'enregistrer" onPress={handleRegister} />
      <Button title="Se connecter" onPress={handleLogin} />

      {message ? <Text>{message}</Text> : null}
      {token ? <Text>Token: {token}</Text> : null}
    </ScrollView>
  );
};

export default Auth;
