import api from './api';

export const bookingService = {
  // Get all bookings (optional filter by type)
  getAll: async (type = 'all') => {
    const params = type !== 'all' ? { type } : {};
    const response = await api.get('/bookings', { params });
    return response.data;
  },

  // Create booking
  create: async (bookingData) => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },

  // Cancel booking
  cancel: async (id) => {
    const response = await api.put(`/bookings/${id}/cancel`);
    return response.data;
  },

  // Delete booking
  delete: async (id) => {
    const response = await api.delete(`/bookings/${id}`);
    return response.data;
  }
};
