import api from './api';

export const tripService = {
  // Get all trips for current user
  getAll: async () => {
    const response = await api.get('/trips');
    return response.data;
  },

  // Get trip by ID
  getById: async (id) => {
    const response = await api.get(`/trips/${id}`);
    return response.data;
  },

  // Create new trip
  create: async (tripData) => {
    const response = await api.post('/trips', tripData);
    return response.data;
  },

  // Update trip
  update: async (id, tripData) => {
    const response = await api.put(`/trips/${id}`, tripData);
    return response.data;
  },

  // Delete trip
  delete: async (id) => {
    const response = await api.delete(`/trips/${id}`);
    return response.data;
  }
};
