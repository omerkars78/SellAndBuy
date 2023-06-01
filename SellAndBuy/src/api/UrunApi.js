import axios from 'axios';

const api = axios.create({
  baseURL: 'http:/194.27.64.113:3000',
});

// Kategorileri getir
export const getCategories = async () => {
    try {
      const response = await api.get('urunler/categories');
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log('getCategories API Error:', error.message);
      throw error;
    }
  };

  // Ürün ekleme
export const createUrun = async (
    user_id,
    category_id,
    urun_adi,
    urun_bilgisi,
    urun_fiyati,
    satildi_bilgisi,
    imageURI
    
  ) => {
    try {
      const response = await api.post('/urunler', {
        user_id,
        category_id,
        urun_adi,
        urun_bilgisi,
        urun_fiyati,
        satildi_bilgisi,
        imageURI
      });
      return response.data;
    } catch (error) {
      console.log('createUrun API Error:', error.message);
      throw error;
    }
  };
  
  // Satışta olan ürünleri getir
export const getUrunler = async () => {
    try {
      const response = await api.get('/urunler/satistaki-urunler');
      return response.data;
    } catch (error) {
      console.log('getUrunler API Error:', error.message);
      throw error;
    }
  }
  // Kategoriye göre ürünleri getir
  export const getUrunlerByCategory = async (category_id) => {
    try {
      const response = await api.get(`/urunler/by-category/${category_id}`);
      return response.data;
    } catch (error) {
      console.log('getUrunlerByCategory API Error:', error.message);
      throw error;
    }
  };
  // Ürünleri id ye göre sırala
  export const getUrunlerSorted = async (order) => {
    try {
      const response = await api.get(`/urunler/sorted?order=${order}`);
      return response.data;
    } catch (error) {
      console.log('getUrunlerSorted API Error:', error.message);
      throw error;
    }
  };
  
// Kullanıcıya göre ürünleri getir
export const getUrunlerByUser = async (user_id) => {
  try {
    const response = await api.get(`/urunler/by-user/${user_id}`);
    return response.data;
  } catch (error) {
    console.log('getUrunlerByUser API Error:', error.message);
    throw error;
  }
};


export const updateSatildi = async (urun_id, satildi_bilgisi) => {
  try {
    const response = await api.put(`/urunler/satildi/${urun_id}`, {
      satildi_bilgisi: satildi_bilgisi ? 1 : 0,
    });
    return response.data;
  } catch (error) {
    console.log('updateSatildi API Error:', error.message);
    throw error;
  }
};



    