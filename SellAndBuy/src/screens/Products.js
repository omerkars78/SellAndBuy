import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import {
  getUrunler,
  getCategories,
  getUrunlerByCategory,
  getUrunlerSorted,
} from '../api/UrunApi';
import {Picker} from '@react-native-picker/picker';
import UserContext from '../Context/UserContext';

const Products = () => {
  const [urunler, setUrunler] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const {forceUpdate} = useContext(UserContext);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategories();
        setCategories(categories);
      } catch (error) {
        console.error('Error fetching categories:', error.message);
      }
    };

    fetchCategories();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUrunler();
    setRefreshing(false);
  };

  const fetchUrunler = async () => {
    try {
      let fetchedUrunler;
      if (selectedCategory) {
        fetchedUrunler = await getUrunlerByCategory(selectedCategory);
      } else {
        fetchedUrunler = await getUrunler();
      }

      if (sortOrder) {
        fetchedUrunler = await getUrunlerSorted(sortOrder);
      }

      console.log('API Response:', fetchedUrunler);
      setUrunler(fetchedUrunler);
    } catch (error) {
      console.error('Error fetching urunler:', error.message);
    }
  };

  useEffect(() => {
    fetchUrunler();
  }, [selectedCategory, sortOrder, forceUpdate]);

  const renderItem = ({item}) => (
    <View style={styles.product}>
      <Image source={{uri: item.imageURI}} style={styles.productImage} />
      <Text style={styles.productTitle}>{item.urun_adi}</Text>
      <Text style={styles.productInfo}>{item.urun_bilgisi}</Text>
      <Text style={styles.productPrice}>{item.urun_fiyati} TL</Text>
      <Text style={styles.productCategory}>{item.category_name}</Text>
      <Text style={styles.productUsername}>{item.isim}</Text>
      <Text style={styles.productUsername}>{item.soyisim}</Text>
      <Text style={styles.productEmail}>{item.email}</Text>
      <Text style={styles.productPhone}>{item.tel_no}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCategory}
          style={styles.picker}
          onValueChange={itemValue => setSelectedCategory(itemValue)}>
          <Picker.Item label="Hepsi" value={null} />
          {categories.map(category => (
            <Picker.Item
              key={category.category_id}
              label={category.category_name}
              value={category.category_id}
            />
          ))}
        </Picker>
        <Picker
          selectedValue={sortOrder}
          style={styles.picker}
          onValueChange={itemValue => setSortOrder(itemValue)}>
          <Picker.Item label="Sıralama" value={null} />
          <Picker.Item label="Yeni" value="desc" />
          <Picker.Item label="Eski" value="asc" />
        </Picker>
      </View>
      <FlatList
        data={urunler}
        renderItem={renderItem}
        keyExtractor={item => item.urun_id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#9Bd35A', '#689F38']}
            progressBackgroundColor="#fff"
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },

  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  picker: {
    flex: 1,
    marginRight: 5,
  },
  product: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 5,
    marginBottom: 10,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productInfo: {
    fontSize: 14,
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4caf50',
    marginBottom: 5,
  },
  productCategory: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#757575',
    marginBottom: 5,
  },
  productUsername: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPhone: {
    fontSize: 14,
    color: '#757575',
  },
});

export default Products;
