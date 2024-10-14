import axios from 'axios';
import { Platform } from 'react-native';

// URL API pour Android ou iOS
const API_URL = Platform.OS === 'android' ? 'http://10.0.2.2:3000/api/auth' : 'http://localhost:3000/api/auth';

// Enregistrement (création de compte)
export const register = async (email, password, name) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      email,
      password,
      name,
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l’enregistrement:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Connexion
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la connexion:', error.response ? error.response.data : error.message);
    throw error;
  }
};