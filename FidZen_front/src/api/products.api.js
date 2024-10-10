import axios from 'axios';

const API_URL = 'http://localhost:3000/products';

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    throw error;
  }
};

export const addProduct = async (name, code, price, receiptId) => {
  try {
    const response = await axios.post(`${API_URL}/`, {
      name,
      code,
      price,
      receiptId,
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l’ajout du produit:', error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération du produit:', error);
    throw error;
  }
};
