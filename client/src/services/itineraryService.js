import api from './api';

export const itineraryService = {
  // Get itinerary for a trip
  getByTripId: async (tripId) => {
    const response = await api.get(`/itineraries/trip/${tripId}`);
    return response.data;
  },

  // Update itinerary
  update: async (id, data) => {
    const response = await api.put(`/itineraries/${id}`, data);
    return response.data;
  },

  // Add activity
  addActivity: async (id, activityData) => {
    const response = await api.post(`/itineraries/${id}/activities`, activityData);
    return response.data;
  },

  // Update activity
  updateActivity: async (id, actId, activityData) => {
    const response = await api.put(`/itineraries/${id}/activities/${actId}`, activityData);
    return response.data;
  },

  // Toggle activity completion
  toggleComplete: async (id, actId) => {
    const response = await api.put(`/itineraries/${id}/activities/${actId}/toggle`);
    return response.data;
  },

  // Delete activity
  deleteActivity: async (id, actId) => {
    const response = await api.delete(`/itineraries/${id}/activities/${actId}`);
    return response.data;
  }
};
