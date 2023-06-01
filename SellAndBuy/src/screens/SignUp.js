import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { signUp } from '../api/UserApi';

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isim, setIsim] = useState('');
  const [soyisim, setSoyisim] = useState('');
  const [tel_no, setTelNo] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    if (!email.endsWith('@ogr.deu.edu.tr')) {
      Alert.alert('Hata', 'Lütfen @ogr.deu.edu.tr uzantılı bir e-posta adresi kullanın.');
      return;
    }
    try {
      const response = await signUp(email, isim, soyisim, tel_no, password);
      console.log('SignUp Response:', response);
      Alert.alert('Tebrikler', 'Başarıyla üyeliğiniz gerçekleşti.');
      navigation.navigate('SignIn');
    } catch (error) {
      console.log(error);
      Alert.alert('Hata', 'Üyelik oluşturulamadı.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="E-posta"
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="İsim"
        onChangeText={setIsim}
      />
      <TextInput
        style={styles.input}
        placeholder="Soyisim"
        onChangeText={setSoyisim}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefon Numarası"
        onChangeText={setTelNo}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title="Üye Ol" onPress={handleSignUp} />
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
});

export default SignUp;