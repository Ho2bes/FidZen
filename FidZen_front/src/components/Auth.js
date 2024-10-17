import React, { useState, useEffect } from 'react';
import { Button, TextInput, Text, ScrollView } from 'react-native';
import { register, login } from '../api/auth.api';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log("Message mis à jour:", message); // Log à chaque changement de `message`
  }, [message]);

  const handleRegister = async () => {
    try {
      console.log("Tentative d'enregistrement avec:", { email, password, name });
      await register(email, password, name);
      setMessage('Enregistrement réussi');
      setEmail('');
      setPassword('');
      setName('');
    } catch (error) {
      setMessage('Erreur lors de l’enregistrement');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      setToken(response.token);
      setMessage('Connexion réussie');
    } catch (error) {
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

      {/* Assurez-vous que message et token sont bien dans un composant <Text> */}
      {message ? <Text>{message}</Text> : null}
      {token ? <Text>Token: {token}</Text> : null}
    </ScrollView>
  );
};

export default Auth;

