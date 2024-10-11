// src/components/Receipts.js
import React, { useEffect, useState } from 'react';
import { View, Button, TextInput, ScrollView, Text } from 'react-native';
import { getReceipts, addReceipt } from '../api/receipts.api';

const Receipts = () => {
  const [purchaseDate, setPurchaseDate] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [receipts, setReceipts] = useState([]);

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const data = await getReceipts();
        setReceipts(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des reçus', error);
      }
    };
    fetchReceipts();
  }, []);

  const handleAddReceipt = async () => {
    try {
      await addReceipt({ userId: '123', cardId: '456', purchaseDate, totalAmount });
      setPurchaseDate('');
      setTotalAmount('');
    } catch (error) {
      console.error('Erreur lors de l’ajout du reçu', error);
    }
  };

  return (
    <ScrollView>
      <TextInput value={purchaseDate} onChangeText={setPurchaseDate} placeholder="Date d'achat" />
      <TextInput value={totalAmount} onChangeText={setTotalAmount} placeholder="Montant total" />
      <Button title="Ajouter le reçu" onPress={handleAddReceipt} />

      {receipts.map((receipt) => (
        <View key={receipt.id}>
          <Text>Date: {new Date(receipt.purchaseDate).toLocaleString()}</Text>
          <Text>Montant total: {receipt.totalAmount}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default Receipts;
