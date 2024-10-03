import axios from 'axios';

const API_URL = 'http://ton-backend-url/cards';

export const getAllCards = async () => {
  try {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des cartes:', error);
    throw error;
  }
};

export const addCard = async (cardNumber, storeName, userId) => {
  try {
    const response = await axios.post(`${API_URL}/`, {
      cardNumber,
      storeName,
      userId,
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l’ajout de la carte:', error);
    throw error;
  }
};

export const getCardById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération de la carte:', error);
    throw error;
  }
};
