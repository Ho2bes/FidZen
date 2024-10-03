// src/components/Auth.js
import React, { useState } from 'react';
import { Button, TextInput, Text, ScrollView } from 'react-native';
import { registerUser, loginUser } from '../api/auth.api';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await registerUser({ email, password, name });
      setMessage(response.message || 'Enregistrement réussi');
      setEmail('');
      setPassword('');
      setName('');
    } catch (error) {
      console.error('Erreur lors de l’enregistrement', error);
      setMessage('Erreur lors de l’enregistrement');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await loginUser({ email, password });
      setToken(response.token);
      setMessage('Connexion réussie');
    } catch (error) {
      console.error('Erreur lors de la connexion', error);
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
