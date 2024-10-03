import axios from 'axios';

const API_URL = 'http://ton-backend-url/users';

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
