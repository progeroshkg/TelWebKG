import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image,ScrollView,FlatList  } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

   // Массив данных с информацией о постах
   const posts = [
    { id: 1, image: require('../../img/12.jpg'), text: 'Текст для поста 1' },
    { id: 2, image: require('../../img/12.jpg'), text: 'Текст для поста 2' },
    // Добавьте другие посты здесь
  ];

  const openPost = (postId:number) => {
    // Здесь можно добавить навигацию к экрану с подробной информацией о посте
    console.log(`Открыть пост с id ${postId}`);
  };
  type ItemType = {
    id: number;
    image: any; // Замените 'any' на тип изображения (например, string)
    text: string;
  };
  
   // Функция для рендеринга элемента списка (поста)
   const renderItem = ({ item }: { item: ItemType }) => (
    
    <TouchableOpacity onPress={() => openPost(item.id)} style={styles.postItem}>
      <Image source={item.image} style={styles.postImage} />
      <Text style={styles.postText}>{item.text}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContentContainer}
      />


       <View style={styles.bottomMenu}>
         <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home' as never)}>
           <Image source={require('../../img/home1.png')} style={styles.icon} />
           <Text style={styles.menuText}>Главное</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Chat' as never)}>
           <Image source={require('../../img/chat1.png')} style={styles.icon} />
           <Text style={styles.menuText}>Сообщения</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('AddFriends' as never)}>
           <Image source={require('../../img/friend1.png')} style={styles.icon} />
           <Text style={styles.menuText}>Друзья</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Music' as never)}>
           <Image source={require('../../img/muzik.png')} style={styles.icon} />
           <Text style={styles.menuText}>Музыка</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Settings' as never)}>
           <Image source={require('../../img/Settings1.png')} style={styles.icon} />
           <Text style={styles.menuText}>Настройки</Text>
         </TouchableOpacity>
       </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-end', // Выравнивание по нижнему краю
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#E7E7E7',
    backgroundColor: '#FFFFFF',
    borderRadius: 20, // Скругление углов
    paddingHorizontal: 20, // Горизонтальный отступ
  },
  menuItem: {
    alignItems: 'center',
  },
  menuText: {
    color: '#5B5B5B', // Цвет текста
    fontSize: 12, // Размер шрифта
    marginTop: 4, // Отступ между иконкой и текстом
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 2, // Отступ между иконкой и верхней границей
  },
  listContentContainer: {
    paddingHorizontal: 10, // Горизонтальный отступ для элементов списка
    paddingBottom: 80, // Отступ вниз для предотвращения перекрытия меню контентом
  },
  postItem: {
    marginBottom: 20, // Отступ между постами
  },
  postImage: {
    width: '100%', // Ширина изображения равна 50% ширины родительского элемента
    height: 200, // Фиксированная высота изображения
    aspectRatio: 2, // Соотношение сторон 16:9 (50% * 2 = 100%)
    borderRadius: 10, // Скругление углов для изображений
  },
  postText: {
    marginHorizontal: 10, // Горизонтальный отступ для текста поста
    marginTop: 10, // Вертикальный отступ для текста поста
  },
  
});

export default Home;
