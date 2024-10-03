// src/components/LoyaltyCards.js
import React, { useEffect, useState } from 'react';
import { View, Button, TextInput, ScrollView, Text } from 'react-native';
import { addCard, getCards } from '../api/cards.api';

const LoyaltyCards = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [storeName, setStoreName] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await getCards();
        setCards(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des cartes', error);
      }
    };
    fetchCards();
  }, []);

  const handleAddCard = async () => {
    try {
      await addCard({ cardNumber, storeName, userId: '123' });
      console.log('Carte ajoutée avec succès');
      setCardNumber('');
      setStoreName('');
    } catch (error) {
      console.error('Erreur lors de l’ajout de la carte', error);
    }
  };

  return (
    <ScrollView>
      <TextInput value={cardNumber} onChangeText={setCardNumber} placeholder="Numéro de carte" />
      <TextInput value={storeName} onChangeText={setStoreName} placeholder="Nom du magasin" />
      <Button title="Ajouter la carte" onPress={handleAddCard} />

      {cards.map((card) => (
        <View key={card.id}>
          <Text>{card.storeName}</Text>
          <Text>Numéro: {card.cardNumber}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default LoyaltyCards;
