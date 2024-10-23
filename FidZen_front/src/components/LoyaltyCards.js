import React, { useState, useEffect } from 'react';
import { View, Button, TextInput, ScrollView, Text, Image } from 'react-native';
import { addCard, getAllCards } from '../api/cards.api';
import * as ImagePicker from 'expo-image-picker';

const LoyaltyCards = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [storeName, setStoreName] = useState('');
  const [image, setImage] = useState(null);
  const [cards, setCards] = useState([]);  // Initialisation avec un tableau vide

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await getAllCards();
        if (Array.isArray(data)) {
          setCards(data);  // S'assurer que les données sont bien un tableau
        } else {
          setCards([]);  // Si les données ne sont pas un tableau, initialiser avec un tableau vide
          console.error('Données récupérées ne sont pas un tableau', data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des cartes', error);
        setCards([]);  // En cas d'erreur, initialiser avec un tableau vide
      }
    };
    fetchCards();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result);
    } else {
      console.log("Sélection d'image annulée");
    }
  };

  const handleAddCard = async () => {
    if (!image) {
      console.error("Aucune image sélectionnée");
      return;
    }

    try {
      await addCard(cardNumber, storeName, image, 'userId123'); // Remplacer par l'ID utilisateur correct
      setCardNumber('');
      setStoreName('');
      setImage(null);
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
      {Array.isArray(cards) && cards.length > 0 ? (  // Vérifier que `cards` est bien un tableau
        cards.map((card) => (
          <View key={card.id}>
            <Text>{card.storeName}</Text>
            <Text>Numéro: {card.cardNumber}</Text>
            {card.imageUrl && <Image source={{ uri: card.imageUrl }} style={{ width: 200, height: 200 }} />}
          </View>
        ))
      ) : (
        <Text>Aucune carte de fidélité trouvée.</Text>
      )}
    </ScrollView>
  );
};

export default LoyaltyCards;
