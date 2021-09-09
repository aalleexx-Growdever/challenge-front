import axios from 'axios';

class ApiService {
  constructor() {
    this.API_URL = 'https://challenge-database.herokuapp.com';
  }

  doGet = async (url) => {
    try {
      const response = await axios.get(`${this.API_URL}${url}`);

      if (response.data.success === true) {
        return response.data.data;
      }

      return 'ERROR';
    } catch (error) {
      return error.response;
    }
  }

  doPost = async (url, data) => {
    try {
      const response = await axios.post(`${this.API_URL}${url}`).send({ data });

      if (response.data.success === true) {
        return response.data.data;
      }

      return 'ERROR';
    } catch (error) {
      return error.response;
    }
  }
}

export default new ApiService();
