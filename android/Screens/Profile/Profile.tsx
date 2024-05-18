import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native';
import { collection, query, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../../Config/Farebase'; // Импортируем db из файла
import firebase from 'firebase/app';
import { getAuth } from 'firebase/auth';

interface Friend {
  name: string;
}

interface Group {
  name: string;
}

interface User {
  avatar: string;
  username: string;
}

interface Props {
  navigation: any;
  userName: string;
}

interface ProfileState {
  currentUser: {
    avatar?: string;
    username: string;
  } | null;
  newDescription: string;
  status: string;
  isLoading: boolean;
  isOnline: boolean;
  friends: Friend[];
  groups: Group[];
  showPersonalInfo: boolean;
}

export default class Profile extends Component<{}, ProfileState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      currentUser: null,
      newDescription: '',
      status: '',
      isLoading: true,
      isOnline: false,
      friends: [],
      groups: [],
      showPersonalInfo: false,
    };
  }

  
 async componentDidMount() {
  const username = await this.loadCurrentUser(); // Получаем имя пользователя
  if (username) {
    // Если имя пользователя получено успешно, обновляем состояние
    this.setState({ currentUser: { username }, isLoading: false });
  } else {
    // Если имя пользователя не получено, обновляем только isLoading
    this.setState({ isLoading: false });
  }
}

async loadCurrentUser() {
  try {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    // Проверка аутентификации пользователя
    if (!currentUser || !currentUser.uid) {
      throw new Error('Пользователь не аутентифицирован или отсутствует идентификатор пользователя.');
    }
    
    const userDocRef = doc(db, 'users', currentUser.uid);
    console.log('Путь к документу пользователя:', userDocRef.path);

    const userDocSnapshot = await getDoc(userDocRef);

    // Проверка существования документа
    if (!userDocSnapshot.exists()) {
      throw new Error(`Документ пользователя не существует в Firestore: ${userDocRef.path}`);
    }
    
    // Получение данных пользователя
    const userData = userDocSnapshot.data();
    console.log('Данные пользователя из Firestore:', userData);
    const username = userData?.username || '';
    console.log('Полученное имя пользователя:', username);
    return username; // Возвращаем имя пользователя
  } catch (error) {
    console.error('Произошла серьезная ошибка при получении данных из Firestore:', error);
    return null; // Возвращаем null в случае ошибки
  }
}




async printUsersCollection() {
  try {
      const usersCollectionRef = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollectionRef);
      
      usersSnapshot.forEach(doc => {
          console.log('Документ пользователя:', doc.id, '=>', doc.data());
      });
  } catch (error) {
      console.error('Ошибка при получении коллекции пользователей из Firestore:', error);
  }
}






  
  
  
  
  handleDescriptionChange = (text: string) => {
    this.setState({ newDescription: text });
  };

  handleStatusChange = (text: string) => {
    this.setState({ status: text });
  };

  render() {
    const { currentUser, newDescription, status, isLoading, isOnline, friends, groups, showPersonalInfo } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0088cc" />
        ) : (
          <>
            <Text style={styles.header}>Edit Profile</Text>
            <View style={styles.profileHeader}>
              <View style={styles.avatarContainer}>
                {currentUser && currentUser.avatar ? (
                  <>
                    <Image source={{ uri: currentUser.avatar }} style={styles.avatar} />
                    {isOnline && <Text style={styles.onlineIndicator}>Online</Text>}
                  </>
                ) : (
                  <Text>No Avatar</Text>
                )}
              </View>
  
              <View style={styles.profileInfo}>
                {currentUser && (
                  <>
                    {/* Убрал одно из мест, где отображается имя пользователя */}
                    <Text style={styles.label}>Current Description:</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter new description"
                      onChangeText={this.handleDescriptionChange}
                      value={newDescription}
                    />
                  </>
                )}
              </View>
            </View>
            <View style={styles.additionalInfoContainer}>
              <TextInput
                style={styles.statusInput}
                placeholder="Set Status"
                onChangeText={this.handleStatusChange}
                value={status}
              />
              
              <View style={styles.friendsInfo}>
                <Text style={styles.label}>Friends:</Text>
                {friends.map((friend, index) => (
                  <Text key={index} style={styles.friendName}>
                    {friend.name}
                  </Text>
                ))}
              </View>
              <View style={styles.groupsContainer}>
                <Text style={styles.label}>Groups:</Text>
                {groups.map((group, index) => (
                  <Text key={index} style={styles.groupName}>
                    {group.name}
                  </Text>
                ))}
              </View>
              <TouchableOpacity
                style={styles.showPersonalInfoButton}
                onPress={() => this.setState({ showPersonalInfo: !showPersonalInfo })}
              >
                <Text style={styles.buttonText}>
                  {showPersonalInfo ? 'Hide Personal Info' : 'Show Personal Info'}
                </Text>
              </TouchableOpacity>
              {showPersonalInfo && (
                <View style={styles.personalInfoContainer}>{/* Add personal information here */}</View>
              )}
            </View>
          </>
        )}
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0088cc',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    marginRight: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#1eb954',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  profileInfo: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#0088cc',
  },
  currentData: {
    marginBottom: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
  },
  additionalInfoContainer: {
    marginTop: 20,
  },
  statusInput: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
  },
  friendsInfo: {
    marginBottom: 20,
  },
  friendName: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  groupsContainer: {
    marginBottom: 20,
  },
  groupName: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  showPersonalInfoButton: {
    backgroundColor: '#0088cc',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  personalInfoContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
});
