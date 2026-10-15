import api from './api';

export const destinationService = {
  // Get all destinations with query params
  getAll: async (params = {}) => {
    const response = await api.get('/destinations', { params });
    return response.data;
  },

  // Get destination by ID
  getById: async (id) => {
    const response = await api.get(`/destinations/${id}`);
    return response.data;
  }
};
