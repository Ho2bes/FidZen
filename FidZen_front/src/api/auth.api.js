import axios from 'axios';

const API_URL = 'http://localhost:3000/auth';

export const register = async (email, password, name) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      email,
      password,
      name,
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l’enregistrement:', error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    throw error;
  }
};
