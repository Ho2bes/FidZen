// src/components/User.js
import React, { useEffect, useState } from 'react';
import { View, Button, TextInput, ScrollView, Text } from 'react-native';
import { addUser, getUser, updateUser } from '../api/user.api';

const User = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [user, setUser] = useState(null);
  const [userId] = useState('123'); // ID de l’utilisateur à récupérer

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser(userId);
        setUser(data);
      } catch (error) {
        console.error('Erreur lors de la récupération de l’utilisateur', error);
      }
    };
    fetchUser();
  }, [userId]);

  const handleAddUser = async () => {
    try {
      const newUser = await addUser({ email, password, name });
      setUser(newUser);
      console.log('Utilisateur ajouté avec succès');
      setEmail('');
      setPassword('');
      setName('');
    } catch (error) {
      console.error('Erreur lors de l’ajout de l’utilisateur', error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      const updatedUser = await updateUser(userId, { email, password, name });
      setUser(updatedUser);
      console.log('Utilisateur mis à jour avec succès');
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l’utilisateur', error);
    }
  };

  return (
    <ScrollView>
      <TextInput value={email} onChangeText={setEmail} placeholder="Email" />
      <TextInput value={password} onChangeText={setPassword} placeholder="Mot de passe" secureTextEntry />
      <TextInput value={name} onChangeText={setName} placeholder="Nom" />

      <Button title="Ajouter l'utilisateur" onPress={handleAddUser} />
      <Button title="Mettre à jour l'utilisateur" onPress={handleUpdateUser} />

      {user && (
        <View>
          <Text>ID: {user.id}</Text>
          <Text>Email: {user.email}</Text>
          <Text>Nom: {user.name}</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default User;
