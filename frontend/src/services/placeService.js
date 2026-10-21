import axios from 'axios';

// Backend API base URL
// In development, Vite proxies '/api' to 'http://localhost:8080' or uses direct fallback
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/places';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const placeService = {
  // Fetch dashboard statistics
  async getStats() {
    const response = await apiClient.get('/stats');
    return response.data;
  },

  // Fetch all places with optional search and filter
  async getAllPlaces(search = '', status = '', category = '') {
    const params = {};
    if (search && search.trim()) params.search = search.trim();
    if (status && status !== 'All') params.status = status;
    if (category && category !== 'All') params.category = category;

    const response = await apiClient.get('', { params });
    return response.data;
  },

  // Fetch recent places (top 5)
  async getRecentPlaces() {
    const response = await apiClient.get('/recent');
    return response.data;
  },

  // Fetch unique categories
  async getCategories() {
    const response = await apiClient.get('/categories');
    return response.data;
  },

  // Fetch single place by ID
  async getPlaceById(id) {
    const response = await apiClient.get(`/${id}`);
    return response.data;
  },

  // Create new place record
  async createPlace(placeData) {
    const response = await apiClient.post('', placeData);
    return response.data;
  },

  // Update existing place record
  async updatePlace(id, placeData) {
    const response = await apiClient.put(`/${id}`, placeData);
    return response.data;
  },

  // Update place status only
  async updatePlaceStatus(id, status) {
    const response = await apiClient.patch(`/${id}/status`, { status });
    return response.data;
  },

  // Delete place record
  async deletePlace(id) {
    const response = await apiClient.delete(`/${id}`);
    return response.data;
  },
};

export default placeService;
