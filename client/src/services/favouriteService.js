import api from './api';

export const favouriteService = {
  // Get all favourite destinations
  getAll: async () => {
    const response = await api.get('/favourites');
    return response.data;
  },

  // Toggle favourite status
  toggle: async (destinationId) => {
    const response = await api.post('/favourites/toggle', { destinationId });
    return response.data;
  }
};
