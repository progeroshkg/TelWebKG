import React, { useState } from 'react';
import { Animated, Easing, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Импорт метода аутентификации Firebase
import { db } from '../../../Config/Farebase';

const Login = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [password, setPassword] = useState('');
  const buttonScale = new Animated.Value(1);
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const auth = getAuth();

  const handleLogin = async () => {
    try {
      Animated.sequence([
        Animated.timing(buttonScale, {
          toValue: 0.9,
          duration: 50,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(buttonScale, {
          toValue: 1,
          duration: 50,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]).start();

      // Ваша функция аутентификации Firebase
      await signInWithEmailAndPassword(auth, username, password);

      // Перенаправление на другой экран после успешного входа
      navigation.navigate('Home' as never);
    } catch (error) {
      console.error('Ошибка входа:', error);
    }
  };

  const goToRegister = () => {
    navigation.navigate('Register' as never);
  };

  return (
    <View style={[styles.container, { backgroundColor: '#E1F5FE' }]}>
      <Text style={[styles.title, { color: '#01579B' }]}>TelWebKG</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { backgroundColor: isDarkMode ? '#4a235a' : '#ffffff', color: isDarkMode ? '#ffffff' : '#01579B' }]}
          placeholder="email"
          placeholderTextColor={isDarkMode ? '#cccccc' : '#666666'}
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={[styles.input, { backgroundColor: isDarkMode ? '#4a235a' : '#ffffff', color: isDarkMode ? '#ffffff' : '#01579B' }]}
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor={isDarkMode ? '#cccccc' : '#666666'}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <Animated.View style={[styles.loginButtonContainer, { transform: [{ scale: buttonScale }] }]}>
        <TouchableOpacity style={[styles.loginButton, { backgroundColor: isDarkMode ? '#4CAF50' : '#388E3C' }]} onPress={handleLogin}>
          <Text style={[styles.loginButtonText, { color: isDarkMode ? '#ffffff' : '#ffffff' }]}>Login</Text>
        </TouchableOpacity>
      </Animated.View>
      <TouchableOpacity onPress={goToRegister}>
        <Text style={{ color: '#01579B', marginTop: 20 }}>Not registered yet? Register here!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    width: '100%',
  },
  loginButtonContainer: {
    alignItems: 'center',
  },
  loginButton: {
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 10,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Login;
