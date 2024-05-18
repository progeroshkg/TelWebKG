import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';




export default class Settings extends Component {
  render() {

    
    return (
      <View style={styles.container}>
     <TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate('Profile'as never)}>
  <Image
    source={require('../../img/prof.png')} // Путь к вашей картинке
    style={styles.icon} // Примените ваши стили к иконке
  />
  <Text style={styles.text}>Profile</Text>
</TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => console.log("Premium pressed")}>
        <Image
    source={require('../../img/premum.png')} // Путь к вашей картинке
    style={styles.icon} // Примените ваши стили к иконке
  />
          <Text style={styles.text}>Premium</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => console.log("Folder pressed")}>
        <Image
    source={require('../../img/folder.png')} // Путь к вашей картинке
    style={styles.icon} // Примените ваши стили к иконке
  />
          <Text style={styles.text}>Folder</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => console.log("Advanced pressed")}>
        <Image
    source={require('../../img/Andvanced.png')} // Путь к вашей картинке
    style={styles.icon} // Примените ваши стили к иконке
  />
          <Text style={styles.text}>Advanced</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => console.log("Speaker and Camera pressed")}>
        <Image
    source={require('../../img/Speca_and_camera.png')} // Путь к вашей картинке
    style={styles.icon} // Примените ваши стили к иконке
  />
          <Text style={styles.text}>Speaker and Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => console.log("Battery and Animation pressed")}>
        <Image
    source={require('../../img/Battery.png')} // Путь к вашей картинке
    style={styles.icon} // Примените ваши стили к иконке
  />
          <Text style={styles.text}>Battery and Animation</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => console.log("Defase Interface Scale pressed")}>
        <Image
    source={require('../../img/Scale.png')} // Путь к вашей картинке
    style={styles.icon} // Примените ваши стили к иконке
  />
          <Text style={styles.text}>Defase Interface Scale</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => console.log("FAQ pressed")}>
        <Image
    source={require('../../img/Fqa.png')} // Путь к вашей картинке
    style={styles.icon} // Примените ваши стили к иконке
  />
          <Text style={styles.text}>FAQ</Text>
        </TouchableOpacity>
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#f5f5f5',
    paddingTop: 30,
  },
  item: {
    padding: 15,
    flexDirection: 'row', // Расположение элементов в строку
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 16, // Размер шрифта текста
    color: '#000', // Цвет текста
  marginLeft: 10,
  },
  icon: {
    width: 24, // Ширина иконки
    height: 24, // Высота иконки
  
  },
});
