import axios from 'axios';
import { Platform } from 'react-native';

const API_URL = Platform.OS === 'android' ? 'http://10.0.2.2:3000/cards' : 'http://localhost:3000/cards';

export const getAllCards = async () => {
  try {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des cartes:', error);
    throw error;
  }
};

export const addCard = async (cardNumber, storeName, image, userId) => {
  const formData = new FormData();
  formData.append('cardNumber', cardNumber);
  formData.append('storeName', storeName);
  formData.append('userId', userId);
  formData.append('image', {
    uri: image.uri,
    type: image.type || 'image/jpeg',
    name: image.fileName || 'photo.jpg',
  });

  try {
    const response = await axios.post(`${API_URL}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l’ajout de la carte:', error);
    throw error;
  }
};
