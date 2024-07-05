import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { fetchUser } from './slices/userSlice';

function HomeScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();

  const handlePress = async () => {
    dispatch(fetchUser(username)).then((action) => {
      if (action.meta.requestStatus === 'fulfilled') {
        navigation.navigate('Result', { userData: action.payload });
      }
    });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.iconsContainer}>
        <Image style={styles.menuImage} source={require('./assets/menu.png')} />
        <Image style={styles.userImage} source={require('./assets/user.png')} />
      </View>
      <View style={styles.stepContainer}>
        <Text style={styles.title}>Find<Text style={styles.subtitle}> a Dev</Text></Text>
      </View>
      <View>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search a dev"
            placeholderTextColor="rgba(0, 0, 0, 0.2)"
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <TouchableOpacity style={styles.searchButton} onPress={handlePress}>
          <Text style={styles.buttonText}>Find</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  stepContainer: {
    marginTop: 60,
    marginBottom: 30,
  },
  title: {
    color: 'black',
    fontSize: 32,
    fontWeight: '500',
    lineHeight: 32,
  },
  subtitle: {
    color: 'gray',
    fontSize: 32,
    fontWeight: '500',
  },
  iconsContainer: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  menuImage: {
    width: 15,
    height: 15,
  },
  userImage: {
    width: 35,
    height: 35,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    borderWidth: 0,
    marginBottom: 30,
  },
  searchButton: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 12,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
