import React, { useState, useEffect } from 'react';
import { View, Button, TextInput, ScrollView, Text, Image } from 'react-native';
import { addCard, getAllCards } from '../api/cards.api';
import * as ImagePicker from 'expo-image-picker';

const LoyaltyCards = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [storeName, setStoreName] = useState('');
  const [image, setImage] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      const data = await getAllCards();
      setCards(data);
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
    }
  };

  const handleAddCard = async () => {
    try {
      await addCard(cardNumber, storeName, image, 'userId123'); // Remplace par l'ID utilisateur
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
