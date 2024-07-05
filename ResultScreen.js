import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

const ResultScreen = ({ navigation, route }) => {
  const userData = useSelector((state) => state.user.data);
  const userEmail = useSelector((state) => state.repositories.userEmail);

  const handleSeeRepositories = () => {
    navigation.navigate('Repositories', { username: userData.login });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.iconsContainer}>
        <TouchableOpacity style={styles.iconBookmark}>
          <Image source={require('./assets/bookmark.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <Image
        source={{ uri: userData.avatar_url }}
        style={styles.imageHeader}
      />
      <View style={styles.container}>
        <Text style={styles.nome}>{userData.name}</Text>
        <Text style={styles.email}>{userEmail}</Text>
        <Text style={styles.bio}>{userData.bio}</Text>
        <View style={styles.followContainer}>
          <View style={styles.followers}>
            <Text style={styles.follow}>Followers</Text>
            <Text style={styles.followNumber}>{userData.followers}</Text>
          </View>
          <View style={styles.following}>
            <Text style={styles.follow}>Following</Text>
            <Text style={styles.followNumber}>{userData.following}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSeeRepositories}>
          <Text style={styles.buttonText}>See repositories</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageHeader: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
    height: 350,
  },
  container: {
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
  },
  nome: {
    color: 'black',
    fontSize: 32,
    fontWeight: '500',
    lineHeight: 32,
  },
  email: {
    paddingVertical: 10,
    color: 'black',
    opacity: 0.5,
  },
  bio: {
    color: 'black',
    opacity: 0.6,
  },
  followContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  follow: {
    marginHorizontal: 50,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  followNumber: {
    color: '#08a7ff',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#00c984',
    borderRadius: 5,
    padding: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    position: 'absolute',
    top: 20,
    width: '100%',
    zIndex: 1,
  },
  iconBookmark: {
    marginLeft: 'auto',
  },
  icon: {
    height: 30,
    width: 30,
  },
});

export default ResultScreen;
