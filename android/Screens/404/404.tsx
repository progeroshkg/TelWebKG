import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NotFound = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>Отсутствует подключение к интернету</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Цвет фона
  },
  message: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333', // Цвет текста
  },
});

export default NotFound;
