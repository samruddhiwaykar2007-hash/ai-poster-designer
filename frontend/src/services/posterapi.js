import api from "./api";; // the axios instance from earlier

export const generatePoster = async (posterData) => {
  const response = await api.post('/posters/generate', posterData);
  return response.data;
};