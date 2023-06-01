import React,{useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import Home from './src/screens/Home';
import UserContext from './src/Context/UserContext';

const Stack = createStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{
            title: 'Giriş Yap',
            headerTitleAlign: 'center',
            headerLeft: null,
          
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ title: 'Üye Ol' }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Anasayfa' ,headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </UserContext.Provider>
  );
};

const styles = StyleSheet.create({
  signUpText: {
    fontSize: 16,
    color: '#1a73e8',
  },
});

export default App;
