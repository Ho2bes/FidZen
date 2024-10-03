import axios from 'axios';

const API_URL = 'http://ton-backend-url/notifications';

export const createNotification = async (userId, message) => {
  try {
    const response = await axios.post(`${API_URL}/notifications`, {
      userId,
      message,
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de la notification:', error);
    throw error;
  }
};

export const getNotificationsByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/notifications/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des notifications:', error);
    throw error;
  }
};

export const markNotificationAsRead = async (id) => {
  try {
    const response = await axios.put(`${API_URL}/notifications/${id}/read`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la notification:', error);
    throw error;
  }
};

export const deleteNotification = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/notifications/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la suppression de la notification:', error);
    throw error;
  }
};
