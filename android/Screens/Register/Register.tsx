import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; // Импортируем необходимые функции для аутентификации

type CountryCities = {
  [key: string]: { label: string; value: string }[];
};

const citiesByCountry: CountryCities = {
  USA: [
    { label: 'New York', value: 'New York' },
    { label: 'Los Angeles', value: 'Los Angeles' },
    { label: 'Chicago', value: 'Chicago' },
  ],
  Canada: [
    { label: 'Toronto', value: 'Toronto' },
    { label: 'Vancouver', value: 'Vancouver' },
    { label: 'Montreal', value: 'Montreal' },
  ],
  UK: [
    { label: 'London', value: 'London' },
    { label: 'Manchester', value: 'Manchester' },
    { label: 'Birmingham', value: 'Birmingham' },
  ],
  Australia: [
    { label: 'Sydney', value: 'Sydney' },
    { label: 'Melbourne', value: 'Melbourne' },
    { label: 'Brisbane', value: 'Brisbane' },
  ],
  Kyrgyzstan: [
    { label: 'Бишкек', value: 'Бишкек' },
    { label: 'Ош', value: 'Ош' },
    { label: 'Кара-суу', value: 'Кара-суу' },
    { label: 'Баткен', value: 'Баткен' },
    { label: 'Нарын', value: 'Нарын' },
    { label: 'Таласс', value: 'Таласс' },
    { label: 'Джалал-Абад', value: 'Джалал-Абад' },
    { label: 'Иссык-Куль', value: 'Иссык-Куль' },
    // Add other cities of Kyrgyzstan here
  ],
};

const countries = [
  { label: 'Выберите страну', value: '' },
  { label: 'USA', value: 'USA' },
  { label: 'Canada', value: 'Canada' },
  { label: 'UK', value: 'UK' },
  { label: 'Australia', value: 'Australia' },
  { label: 'Kyrgyzstan', value: 'Kyrgyzstan' }, // Add Kyrgyzstan to the list of countries
  // Add other countries here
];

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [preferences, setPreferences] = useState('');
  const [age, setAge] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [invalidAge, setInvalidAge] = useState(false);
  const navigation = useNavigation();

  function generateUserId() {
    const timestamp = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * 10000);
    const userId = `${timestamp}-${randomNumber}`;
    return userId;
  }

  const handleRegister = async () => {
    try {
      setLoading(true);

      if (!validateForm()) {
        return;
      }

      if (!validateAge()) {
        setInvalidAge(true);
        return;
      }

      const auth = getAuth(); // Получаем объект аутентификации
      const db = getFirestore();
      const usersCollection = collection(db, 'users');
         // Регистрируем пользователя с помощью email и пароля
         await createUserWithEmailAndPassword(auth, email, password);

         const userId = auth.currentUser?.uid; // Используем UID зарегистрированного пользователя


         const userRef = await addDoc(usersCollection, {
          userId,
          username,
          email,
          phoneNumber,
          gender,
          preferences,
          age: Number(age),
          country,
          city,
        });

        console.log('User registered successfully:', userRef.id);

        navigation.navigate('Home' as never);
      } catch (error) {
        setError('An error occurred during registration. Please try again.');
        console.error('Registration error:', error);
        Alert.alert('Error', 'An error occurred during registration. Please try again.');
      } finally {
        setLoading(false);
      }
    };

  const goToLogin = () => {
    navigation.navigate('Login' as never);
  };

  const goToAgreement = () => {
    // Implement agreement screen navigation here
  };

  const validateForm = () => {
    if (!email || !username || !password || !phoneNumber || !gender || !age || !country || !city || !preferences) {
      Alert.alert('Error', 'Please fill out all fields.');
      return false;
    }
    return true;
  };

  const validateAge = () => {
    const parsedAge = parseInt(age);
    return !isNaN(parsedAge) && parsedAge >= 18 && parsedAge <= 100;
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Регистрация</Text>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#666"
          value={email}
          onChangeText={setEmail}
          onBlur={() => setEmail(email.trim())}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#666"
          value={username}
          onChangeText={setUsername}
          onBlur={() => setUsername(username.trim())}
        />
        <TextInput
          style={styles.input}
          placeholder="Пароль"
          placeholderTextColor="#666"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          onBlur={() => setPassword(password.trim())}
        />
        <View style={styles.input}>
          <TextInput
            placeholder="Номер телефона"
            keyboardType="phone-pad"
            placeholderTextColor="#666"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            onBlur={() => setPhoneNumber(phoneNumber.trim())}
          />
        </View>
        <Picker
          style={styles.input}
          selectedValue={gender}
          onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
        >
          <Picker.Item label="Выберите пол" value="" />
          <Picker.Item label="Мужчина" value="male" />
          <Picker.Item label="Женщина" value="female" />
        </Picker>
        <Picker
          style={styles.input}
          selectedValue={age}
          onValueChange={(itemValue, itemIndex) => setAge(itemValue)}
        >
          <Picker.Item label="Выберите возраст" value="" />
          {Array.from({ length: 100 - 18 + 1 }, (_, i) => (
            <Picker.Item key={18 + i} label={`${18 + i} лет`} value={`${18 + i}`} />
          ))}
        </Picker>
        {invalidAge && <Text style={styles.errorText}>Введите корректный возраст от 18 до 100 лет.</Text>}
        <Picker
          style={styles.input}
          selectedValue={country}
          onValueChange={(itemValue, itemIndex) => setCountry(itemValue)}
        >
          {countries.map(country => (
            <Picker.Item key={country.value} label={country.label} value={country.value} />
          ))}
        </Picker>
        <Picker
          style={styles.input}
          selectedValue={city}
          onValueChange={(itemValue, itemIndex) => setCity(itemValue)}
        >
          {citiesByCountry[country] &&
            citiesByCountry[country].map(city => (
              <Picker.Item key={city.value} label={city.label} value={city.value} />
            ))}
        </Picker>
        <TextInput
          style={styles.input}
          placeholder="О себе"
          placeholderTextColor="#666"
          value={preferences}
          onChangeText={setPreferences}
          onBlur={() => setPreferences(preferences.trim())}
        />
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Зарегистрироваться</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToLogin}>
          <Text style={styles.loginLink}>Уже есть аккаунт? Войти</Text>
        </TouchableOpacity>
        <Text style={styles.agreementText}>
          Нажимая кнопку "Зарегистрироваться", вы соглашаетесь с <TouchableOpacity onPress={goToAgreement}><Text style={styles.agreementLink}>пользовательским соглашением</Text></TouchableOpacity>.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5', // Новый цвет фона контейнера
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28, // Увеличил размер шрифта заголовка
    fontWeight: 'bold',
    marginBottom: 30, // Увеличил отступ для заголовка
    color: '#1A1A1A', // Новый цвет текста заголовка
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#FFFFFF', // Новый цвет фона инпута
    marginBottom: 20, // Увеличил отступ для инпута
    paddingVertical: 15,
    paddingHorizontal: 20, // Увеличил внутренние отступы для инпута
    borderRadius: 8, // Немного уменьшил радиус скругления для инпута
    color: '#333333', // Новый цвет текста инпута
  },
  registerButton: {
    backgroundColor: '#FF6347', // Новый цвет кнопки регистрации
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 8, // Немного уменьшил радиус скругления для кнопки
    marginBottom: 20, // Увеличил отступ для кнопки
  },
  registerButtonText: {
    color: '#FFFFFF', // Новый цвет текста кнопки регистрации
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginLink: {
    color: '#FF6347', // Новый цвет ссылки для входа
    textDecorationLine: 'underline',
    fontSize: 14,
    marginBottom: 20, // Увеличил отступ для ссылки на вход
  },
  agreementText: {
    color: '#666666', // Новый цвет текста соглашения
    textAlign: 'center',
    marginTop: 20, // Увеличил отступ для текста соглашения
  },
  agreementLink: {
    color: '#FF6347', // Новый цвет ссылки в соглашении
    textDecorationLine: 'underline',
  },
  errorText: {
    color: '#FF0000', // Новый цвет текста ошибки
    marginBottom: 20, // Увеличил отступ для текста ошибки
    textAlign: 'center', // Центрирование текста ошибки
  },
});


export default RegisterScreen;
