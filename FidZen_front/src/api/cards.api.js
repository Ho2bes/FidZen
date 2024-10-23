import axios from 'axios';
//import { API_URL } from '@env';  // Ne modifie pas ça, il va lire automatiquement dans ton .env
import { Platform } from 'react-native';

// Définir l'URL de l'API selon la configuration souhaitée
// Pour utilisation avec Expo et tunnel
//const API_URL = 'https://l5lpq68-anonymous-8081.exp.direct/cards'; // Remplace l'URL ici

// Pour utilisation avec un appareil physique Android sur le même réseau home
// const API_URL = Platform.OS === 'android' ? 'http://172.17.203.192:3000/cards' : 'http://172.17.203.192:3000/cards'; // Utiliser l'IP locale

// Pour utilisation avec un émulateur Android
const API_URL = Platform.OS === 'android' ? 'http://10.0.2.2:3000/cards' : 'http://localhost:3000/cards'; // Utiliser localhost ou 10.0.2.2 pour Android

export const getAllCards = async () => {
  try {
    const response = await axios.get(`${API_URL}/`);
    return response.data;  // Retourner directement les données reçues
  } catch (error) {
    console.error('Erreur lors de la récupération des cartes:', error);
    throw error;  // Propager l'erreur pour qu'elle soit gérée dans le composant appelant
  }
};

export const addCard = async (cardNumber, storeName, image, userId) => {
  const formData = new FormData();
  formData.append('cardNumber', cardNumber);
  formData.append('storeName', storeName);
  formData.append('userId', userId);

  // Ajout de l'image dans le formData
  formData.append('image', {
    uri: image.uri,
    type: image.type || 'image/jpeg',  // Utiliser un type par défaut si non spécifié
    name: image.fileName || 'photo.jpg',  // Nommer l'image
  });

  try {
    const response = await axios.post(`${API_URL}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',  // Indiquer le bon type de contenu
      },
    });
    return response.data;  // Retourner les données de réponse si l'ajout est réussi
  } catch (error) {
    console.error('Erreur lors de l’ajout de la carte:', error);
    throw error;  // Propager l'erreur pour qu'elle soit gérée dans le composant appelant
  }
};
