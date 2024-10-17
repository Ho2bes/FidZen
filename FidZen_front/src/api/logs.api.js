// src/api/logs.api.js
import axios from 'axios';
import { Platform } from 'react-native';

// URL API pour Android ou iOS
const API_URL = Platform.OS === 'android' ? 'http://10.0.2.2:3000/api/logs' : 'http://localhost:3000/api/logs';

// Créer un log
export const createLog = async (userId, action) => {
  try {
    const response = await axios.post(`${API_URL}/`, {
      userId,
      action,
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création du log:', error);
    throw error;
  }
};

// Récupérer les logs d'un utilisateur
export const getLogsByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des logs:', error);
    throw error;
  }
};

// Supprimer un log
export const deleteLog = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la suppression du log:', error);
    throw error;
  }
};
