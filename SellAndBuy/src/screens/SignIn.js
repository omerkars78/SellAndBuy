import React, { useState,useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { signIn } from '../api/UserApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

import UserContext from '../Context/UserContext.js';
const SignIn = ({ navigation }) => {
  const { setUser } = useContext(UserContext);  
useEffect(() => {
  const checkUserSession = async () => {
    const userJson = await AsyncStorage.getItem('@user');
    if (userJson) {
      const user = JSON.parse(userJson);
      setUser(user); // context değerini güncelleme
      if (Date.now() < user.expiresIn) {
        // Oturum süresi geçerliyse, ana sayfaya geçiş yapın
        navigation.navigate('Home');
      } else {
        // Oturum süresi geçersizse, AsyncStorage'deki kullanıcı verilerini temizleyin
        await AsyncStorage.removeItem('@user');
      }
    }
  };

  checkUserSession();
}, []);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      const response = await signIn(email, password);
      // Oturum süresi olarak 1 hafta kullanalım
      const expiresIn = Date.now() + 7 * 24 * 60 * 60 * 1000;
      await AsyncStorage.setItem('@user', JSON.stringify({ ...response, expiresIn }));
      
      // Home sayfasına geçiş yapın
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Error', 'E-mailor password wrong.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <View style={styles.buttonContainer}>
        <Button title="Sign In" onPress={handleSignIn} style={styles.button} />
      </View>
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Hesabınız yok mu? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signUpLink}>Üye Ol</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    marginTop: 10,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#1a73e8',
    elevation: 5, // Android için gölgelendirme
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
  },
  signUpText: {
    fontSize: 16,
    color: '#000',
  },
  signUpLink: {
    fontSize: 16,
    color: '#1a73e8',
  },
});

export default SignIn;
