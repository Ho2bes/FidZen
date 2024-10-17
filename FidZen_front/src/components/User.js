import React, { useState, useEffect } from 'react';
import { View, Button, TextInput, ScrollView, Text } from 'react-native';
import { getUserById, updateUser, deleteUser } from '../api/users.api'; // Import correct des fonctions

const User = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(''); // Ajout d'un message pour afficher les résultats
  const [userId] = useState('e0f36199-dab0-4663-b33b-85a6c19adb97'); // ID de l'utilisateur à gérer

  // Fonction pour récupérer un utilisateur existant
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserById(userId); // Utilise la fonction correcte getUserById
        setUser(data);
        setMessage('Utilisateur récupéré avec succès');
      } catch (error) {
        console.error('Erreur lors de la récupération de l’utilisateur', error);
        setMessage('Erreur lors de la récupération de l’utilisateur');
      }
    };
    fetchUser();
  }, [userId]);

  // Fonction pour mettre à jour l'utilisateur
  const handleUpdateUser = async () => {
    try {
      const updatedUser = await updateUser(userId, email, password, name); // Utilisation de updateUser avec les paramètres individuels
      setUser(updatedUser);
      setMessage('Utilisateur mis à jour avec succès');
      console.log('Utilisateur mis à jour avec succès :', updatedUser);
      // Réinitialiser les champs après la mise à jour
      setEmail('');
      setPassword('');
      setName('');
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l’utilisateur', error);
      setMessage('Erreur lors de la mise à jour de l’utilisateur');
    }
  };

  // Fonction pour supprimer l'utilisateur
  const handleDeleteUser = async () => {
    try {
      await deleteUser(userId); // Appel à la fonction deleteUser
      setMessage('Utilisateur supprimé avec succès');
      setUser(null); // Efface les informations de l'utilisateur après suppression
      console.log('Utilisateur supprimé avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression de l’utilisateur', error);
      setMessage('Erreur lors de la suppression de l’utilisateur');
    }
  };

  return (
    <ScrollView>
      {/* Champs pour modifier l'utilisateur */}
      <TextInput value={email} onChangeText={setEmail} placeholder="Nouvel Email" />
      <TextInput value={password} onChangeText={setPassword} placeholder="Nouveau Mot de passe" secureTextEntry />
      <TextInput value={name} onChangeText={setName} placeholder="Nouveau Nom" />

      {/* Boutons pour mettre à jour et supprimer */}
      <Button title="Mettre à jour l'utilisateur" onPress={handleUpdateUser} />
      <Button title="Supprimer l'utilisateur" onPress={handleDeleteUser} />

      {/* Affichage du message de confirmation */}
      {message ? <Text>{message}</Text> : null}

      {/* Affichage des informations de l'utilisateur récupéré */}
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
