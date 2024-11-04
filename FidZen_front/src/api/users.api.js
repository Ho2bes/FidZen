import axios from 'axios';
import { Platform } from 'react-native';

// URL API pour Android ou iOS
const API_URL = Platform.OS === 'android' ? 'http://10.0.3.2:3000/api/users' : 'http://10.0.3.2:3000/api/user';

export const createUser = async (email, password, name) => {
  try {
    const response = await axios.post(`${API_URL}/`, {
      email,
      password,
      name,
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de l’utilisateur:', error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération de l’utilisateur:', error);
    throw error;
  }
};

export const updateUser = async (id, email, password, name) => {
  try {
    const data = { email, name };
    if (password) {
      data.password = password;
    }
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l’utilisateur:', error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la suppression de l’utilisateur:', error);
    throw error;
  }
};
