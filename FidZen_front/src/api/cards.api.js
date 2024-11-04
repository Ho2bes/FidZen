import axios from 'axios';
import { Platform } from 'react-native';

// URL API pour Android ou iOS
const API_URL = Platform.OS === 'android' ? 'http://10.0.3.2:3000/api/cards' : 'http://10.0.3.2:3000/api/cards';

// Fonction pour récupérer toutes les cartes
export const getAllCards = async () => {
  try {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des cartes:', error);
    throw error;
  }
};

// Fonction pour ajouter une carte avec image (corrigée avec FormData)
export const addCard = async (cardNumber, storeName, userId, imageUri) => {
  const data = new FormData();
  data.append('cardNumber', cardNumber);
  data.append('storeName', storeName);
  data.append('userId', userId);
  data.append('image', {
    uri: imageUri,
    type: 'image/jpeg',
    name: 'photo.jpg',
  });

  try {
    const response = await axios.post(`${API_URL}/add`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur d'ajout de carte:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Fonction pour récupérer une carte par ID
export const getCardById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération de la carte:', error);
    throw error;
  }
};
