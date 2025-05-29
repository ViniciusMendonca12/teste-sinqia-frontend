import axios from "axios";

const API_TOURIST_SPOT = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/TouristSpot`,
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
});

class TouristSpotApi {
  static async getAll() {
    const response = await API_TOURIST_SPOT.get("");
    return response.data;
  }

  static async getById(id) {
    const response = await API_TOURIST_SPOT.get(`/${id}`);
    return response.data;
  }

  static async create(data) {
    const response = await API_TOURIST_SPOT.post("/", data);
    return response.data;
  }

  static async update(id, data) {
    const response = await API_TOURIST_SPOT.put(`/${id}`, data);
    return response.data;
  }

  static async delete(id) {
    const response = await API_TOURIST_SPOT.delete(`/${id}`);
    return response.data;
  }
}

export default TouristSpotApi;
