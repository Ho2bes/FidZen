import axios from 'axios';

const API_URL = 'http://localhost:3000/receipts';

export const getAllReceipts = async () => {
  try {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des reçus:', error);
    throw error;
  }
};

export const addReceipt = async (userId, cardId, purchaseDate, totalAmount) => {
  try {
    const response = await axios.post(`${API_URL}/`, {
      userId,
      cardId,
      purchaseDate,
      totalAmount,
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l’ajout du reçu:', error);
    throw error;
  }
};

export const getReceiptById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération du reçu:', error);
    throw error;
  }
};
