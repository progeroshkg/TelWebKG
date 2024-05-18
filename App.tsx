import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { initializeApp } from 'firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Login from './android/Screens/Login/Login';
import Register from './android/Screens/Register/Register';
import Home from './android/Screens/Home/Home';
import Settings from './android/Screens/Settings/Settings';
import NotFound from './android/Screens/404/404';
import Profile from './android/Screens/Profile/Profile';

// Импортируем конфигурацию Firebase
import { firebaseConfig } from './Config/Farebase';

// Инициализируем Firebase
initializeApp(firebaseConfig);

// Создаем стек навигации
const Stack = createStackNavigator();

interface AppState {
  userLoggedIn: boolean;
  isLoading: boolean;
}

export default class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      userLoggedIn: false,
      isLoading: true,
    };
  }

  componentDidMount() {
    // Проверяем состояние аутентификации пользователя
    this.checkAuthState();
  }

  async checkAuthState() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Если пользователь аутентифицирован
        this.setState({ userLoggedIn: true, isLoading: false });
        // Сохраняем состояние аутентификации в AsyncStorage
        await AsyncStorage.setItem('userLoggedIn', 'true');
      } else {
        // Если пользователь не аутентифицирован
        this.setState({ userLoggedIn: false, isLoading: false });
        // Сохраняем состояние аутентификации в AsyncStorage
        await AsyncStorage.setItem('userLoggedIn', 'false');
      }
    });
  }

  render() {
    const { userLoggedIn, isLoading } = this.state;

    if (isLoading) {
      // Показываем загрузочный экран, пока приложение проверяет статус аутентификации пользователя
      return <LoadingScreen />;
    }

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={userLoggedIn ? 'Home' : 'Login'}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="NotFound" component={NotFound} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

// Загрузочный экран
const LoadingScreen = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#0088cc" />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
