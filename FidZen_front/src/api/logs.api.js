import axios from 'axios';

const API_URL = 'http://ton-backend-url/logs';

export const createLog = async (userId, action) => {
  try {
    const response = await axios.post(`${API_URL}/logs`, {
      userId,
      action,
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création du log:', error);
    throw error;
  }
};

export const getLogsByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/logs/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des logs:', error);
    throw error;
  }
};

export const deleteLog = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/logs/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la suppression du log:', error);
    throw error;
  }
};
