// RepositoriesDetailScreen.js
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';

const RepositoriesDetailScreen = ({ route }) => {
  const { repository } = route.params;

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>{repository.name}</Text>
        <Text style={styles.description}>{repository.description}</Text>
        <View style={styles.statsContainer}>
          <Text style={styles.stat}>Stars: {repository.stargazers_count}</Text>
          <Text style={styles.stat}>Forks: {repository.forks_count}</Text>
          <Text style={styles.stat}>Most used language: {repository.language}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => Linking.openURL(repository.html_url)}>
            <Text style={styles.buttonText}>View on GitHub</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
    height: '60%',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  statsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 20,
  },
  stat: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RepositoriesDetailScreen;
