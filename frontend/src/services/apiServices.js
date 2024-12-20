import api from './api';

export const createEvent = async (eventData) => {
  return api.post('/events', eventData);
};

export const updateEvent = async (id, eventData) => {
  return api.put(`/events/${id}`, eventData);
};

export const deleteEvent = async (id) => {
  return api.delete(`/events/${id}`);
};

export const fetchEvents = async (page, limit) => {
  return api.get(`/events?page=${page}&limit=${limit}`);
};
