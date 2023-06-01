import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.53:3000',
});

export const signIn = async (email, password) => {
    try {
      const response = await api.post('/users/signin', { email, password });
      return response.data;
    } catch (error) {
      console.log('signIn API Error:', error.message);
      throw error;
    }
  };
  
  export const signUp = async (email, isim, soyisim, tel_no, password) => {
    try {
      const response = await api.post('/users/signup', { email, isim, soyisim, tel_no, password });
      return response.data;
    } catch (error) {
      console.log('signUp API Error:', error.message);
      throw error;
    }
  };
  

  