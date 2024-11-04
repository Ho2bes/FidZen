import React, { useState, useEffect } from 'react';
import { View, Button, TextInput, ScrollView, Text, Image, Alert } from 'react-native';
import { addCard, getAllCards } from '../api/cards.api'; // Importation des API cards

const LoyaltyCards = () => {
  const [cardNumber, setCardNumber] = useState('');  // État pour le numéro de carte
  const [storeName, setStoreName] = useState('');    // État pour le nom du magasin
  const [image, setImage] = useState(null);          // État pour stocker l'image sélectionnée
  const [cards, setCards] = useState([]);            // État pour stocker les cartes récupérées

  // Récupérer toutes les cartes à l'initialisation du composant
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await getAllCards();  // Récupérer les cartes via l'API
        setCards(data);  // Mettre à jour l'état avec les cartes récupérées
      } catch (error) {
        console.error('Erreur lors de la récupération des cartes', error);
      }
    };
    fetchCards();
  }, []);

  // Fonction pour simuler la sélection d'une image via une URL
  const pickImage = async () => {
    const imageUrl = "https://plus.unsplash.com/premium_photo-1728488389835-2f9568c5d76a?q=80&w=1895&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";  // URL de test
    setImage({ uri: imageUrl });  // Simule la sélection d'une image avec une URL
    console.log("Image sélectionnée :", imageUrl);
  };

  // Fonction pour ajouter une carte avec les informations de la carte et l'image
  const handleAddCard = async () => {
    console.log('Tentative d’ajout de la carte'); // Vérification de l'appel
    if (!image) {
      console.error("Aucune image sélectionnée");
      return;
    }

    try {
      const response = await addCard(cardNumber, storeName, '44073275-771f-4ddb-9681-b323391a00d9', image.uri);  // Appel API pour ajouter la carte
      setCardNumber('');  // Réinitialiser les champs
      setStoreName('');
      setImage(null);
      console.log('Carte ajoutée avec succès:', response);

      // Afficher une alerte de confirmation
      Alert.alert('Succès', 'La carte a été ajoutée avec succès !');
    } catch (error) {
      console.error('Erreur lors de l’ajout de la carte', error);
    }
  };

  return (
    <ScrollView>
      <TextInput value={cardNumber} onChangeText={setCardNumber} placeholder="Numéro de carte" />
      <TextInput value={storeName} onChangeText={setStoreName} placeholder="Nom du magasin" />
      <Button title="Choisir une image" onPress={pickImage} />
      {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
      <Button title="Ajouter la carte" onPress={handleAddCard} />
      {cards.map((card) => (
        <View key={card.id}>
          <Text>{card.storeName}</Text>
          <Text>Numéro: {card.cardNumber}</Text>
          {card.imageUrl && <Image source={{ uri: card.imageUrl }} style={{ width: 200, height: 200 }} />}
        </View>
      ))}
    </ScrollView>
  );
};

export default LoyaltyCards;
