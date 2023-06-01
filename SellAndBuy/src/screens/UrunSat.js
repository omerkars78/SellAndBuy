import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createUrun, getCategories} from '../api/UrunApi.js';
import {launchImageLibrary} from 'react-native-image-picker';
import UserContext from '../Context/UserContext.js';

const UrunSat = () => {
  const {user} = useContext(UserContext); // Kullanıcı verilerini alın
  console.log(user);

  const [urun_adi, setUrunAdi] = useState('');
  const [urun_bilgisi, setUrunBilgisi] = useState('');
  const [urun_fiyati, setUrunFiyati] = useState('');
  const [imageURI, setImageURI] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [satildi_bilgisi, setSatildiBilgisi] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
        console.log(categories);
      } catch (error) {
        console.log('fetchCategories Error:', error.message);
      }
    };

    fetchCategories();
  }, []);

  const handleUrunEkle = async () => {
    if (!categoryId) {
      Alert.alert('Hata', 'Lütfen bir kategori seçin');
      return;
    }
    if (user) {
      console.log(user);
      try {
        const response = await createUrun(
          user.user_id,
          categoryId,
          urun_adi,
          urun_bilgisi,
          urun_fiyati, 
          satildi_bilgisi,
          imageURI,

        );
        Alert.alert('Tebrikler Ürününüz Eklendi');
        console.log(response);

        // İnputların değerlerini sıfırlayın
        setUrunAdi('');
        setUrunBilgisi('');
        setUrunFiyati('');
        setImageURI(null);
        setCategoryId(null);
      } catch (error) {
        console.log('handleUrunEkle Error:', error.message);
      }
    }
  };

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const uri = response.assets[0].uri;
        setImageURI(uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Ürün Sat</Text>
      <Text style={styles.label}>Ürün Adı</Text>
      <TextInput
        style={styles.input}
        value={urun_adi}
        onChangeText={setUrunAdi}
        placeholder="Ürün adını girin"
      />
      <Text style={styles.label}>Ürün Bilgisi</Text>
      <TextInput
        style={styles.input}
        value={urun_bilgisi}
        onChangeText={setUrunBilgisi}
        placeholder="Ürün bilgisini girin"
      />
      <Text style={styles.label}>Ürün Fiyatı</Text>

      <TextInput
        style={styles.input}
        value={urun_fiyati}
        onChangeText={setUrunFiyati}
        placeholder="Ürün fiyatını girin"
        keyboardType="numeric"
      />
      <Text style={styles.label}>Kategori Seçin</Text>
      <Picker
        style={styles.picker}
        selectedValue={categoryId || ''}
        onValueChange={(itemValue, itemIndex) => setCategoryId(itemValue)}>
        <Picker.Item label="Kategori Seçin" value="" />
        {categories.map(category => (
          <Picker.Item
            key={category.category_id}
            label={category.category_name}
            value={category.category_id}
          />
        ))}
      </Picker>

      <TouchableOpacity style={styles.imageButton} onPress={selectImage}>
        <Text style={styles.imageButtonText}>
          {imageURI ? 'Resmi Değiştir' : 'Resim Seç'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.submitButton} onPress={handleUrunEkle}>
        <Text style={styles.submitButtonText}>Ürün Ekle</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
  },
  picker: {
    marginBottom: 20,
  },
  imageButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    elevation: 3, // Android için gölgelendirme
    shadowColor: '#000', // iOS için gölgelendirme
    shadowOffset: {width: 0, height: 2}, // iOS için gölgelendirme
    shadowOpacity: 0.25, // iOS için gölgelendirme
    shadowRadius: 3.84, // iOS için gölgelendirme
  },
  imageButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#28a745',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    elevation: 3, // Android için gölgelendirme
    shadowColor: '#000', // iOS için gölgelendirme
    shadowOffset: {width: 0, height: 2}, // iOS için gölgelendirme
    shadowOpacity: 0.25, // iOS için gölgelendirme
    shadowRadius: 3.84, // iOS için gölgelendirme
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default UrunSat;
