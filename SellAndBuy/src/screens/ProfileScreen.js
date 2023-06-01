import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import UserContext from '../Context/UserContext';
import {getUrunlerByUser, updateSatildi} from '../api/UrunApi';
import {useNavigation} from '@react-navigation/native';

const ProfileScreen = () => {
  const {user, setUser, forceUpdate} = useContext(UserContext);
  const [urunler, setUrunler] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const fetchUrunler = async () => {
    if (user === null) return; // Eğer user null ise fetchUrunler işlemini yapma
  
    try {
      const fetchedUrunler = await getUrunlerByUser(user.user_id);
      setUrunler(fetchedUrunler);
    } catch (error) {
      console.log('Error fetching urunler:', error.message);
    }
  };
  

  useEffect(() => {
    fetchUrunler();
  }, [user]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchUrunler();
    setRefreshing(false);
  };

  const handleSignOut = () => {
    setUser(null);
    navigation.navigate('SignIn');
  };


  const toggleSatildi = async (urun_id, newValue) => {
    try {
      console.log('urun_id:', urun_id, 'satildi_bilgisi:', newValue);
      await updateSatildi(urun_id, newValue);
      setUrunler(
        urunler.map(urun =>
          urun.urun_id === urun_id ? {...urun, satildi_bilgisi: newValue ? 1 : 0} : urun,
        ),
      );
      forceUpdate();
    } catch (error) {
      console.log('Error updating satildi:', error.message);
    }
  };
  
  
  const renderItem = ({item}) => (
    <View style={styles.productContainer}>
      <Image source={{uri: item.imageURI}} style={styles.productImage} />
      <View style={styles.productDetailsContainer}>
        <Text style={styles.productName}>{item.urun_adi}</Text>
        <Text style={styles.productPrice}>{item.urun_fiyati} TL</Text>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={item.satildi_bilgisi === 1}
            onValueChange={newValue => toggleSatildi(item.urun_id, newValue)}
          />
          <Text>Is it sold?</Text>
        </View>
      </View>
    </View>
  );
  
  
  
  

  return (
    <View style={styles.container}>
      {user && (
        <>
          <Text style={styles.title}>Profile Informations</Text>
          <Text>Name: {user.isim}</Text>
          <Text>Surname: {user.soyisim}</Text>
          <Text>Email: {user.email}</Text>
          <Text>Nummer: {user.tel_no}</Text>

          <Text style={styles.title}>My products</Text>
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
          <TouchableOpacity onPress={handleSignOut}>
            <Text style={styles.signOutButton}>Sign out</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333333',
  },
  signOutButton: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: 8,
    borderRadius: 4,
    marginTop: 16,
  },
  productContainer: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productDetailsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 16,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  }
});

export default ProfileScreen;
