import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const RepositoriesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { username } = route.params;

  const [repositories, setRepositories] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const data = await response.json();
        setRepositories(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRepositories();
  }, [username]);

  const sortedRepositories = useMemo(() => {
    let sortedRepos = [...repositories];
    if (orderBy === 'stars') {
      sortedRepos.sort((a, b) => b.stargazers_count - a.stargazers_count);
    } else if (orderBy === 'name') {
      sortedRepos.sort((a, b) => a.name.localeCompare(b.name));
    }
    return sortedRepos;
  }, [repositories, orderBy]);

  const handleOrderChange = (order) => {
    setOrderBy(order);
    setDropdownVisible(false);
  };

  const renderLanguageIcon = (language) => {
    switch (language) {
      case "HTML":
        return require('./assets/languageIcons/html.png');
      case "CSS":
        return require('./assets/languageIcons/css.png');
      case "JavaScript":
        return require('./assets/languageIcons/javascript.png');
      case "Python":
        return require('./assets/languageIcons/python.png');
      case "C#":
        return require('./assets/languageIcons/csharp.png');
      case "C++":
        return require('./assets/languageIcons/cpp.png');
      case "Java":
        return require('./assets/languageIcons/java.png');
      case "PHP":
        return require('./assets/languageIcons/php.png');
      case "C":
        return require('./assets/languageIcons/c.png');
      case "Swift":
        return require('./assets/languageIcons/swift.png');
      case "Kotlin":
        return require('./assets/languageIcons/kotlin.png');
      default:
        return null;
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.repoContainer} onPress={() => navigation.navigate('RepositoryDetails', { repository: item })}>
      <Text style={styles.repoName}>{item.name}</Text>
      <Text style={styles.repoDescription}>{item.description}</Text>
      <View style={styles.repoSummary}>
        <Text style={styles.repoSummaryLanguage}>
          {renderLanguageIcon(item.language) && (
            <Image source={renderLanguageIcon(item.language)} style={styles.languageIcon} />
          )}
          {!renderLanguageIcon(item.language) && (
            <Text style={styles.languageText}>Language:</Text>
          )}
          {item.language}
        </Text>
        <Text style={styles.repoStars}>
          <Image source={require('./assets/star.png')} style={styles.actionIcon} />
          {item.stargazers_count}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.screen}>
      <View style={styles.orderContainer}>
        <Text>Order by:</Text>
        <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)}>
          <Text style={styles.orderOption}>{orderBy === 'stars' ? 'Stars' : 'Name'}</Text>
        </TouchableOpacity>
        {dropdownVisible && (
          <View style={styles.dropdown}>
            <TouchableOpacity onPress={() => handleOrderChange('name')}>
              <Text style={styles.dropdownItem}>Name</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleOrderChange('stars')}>
              <Text style={styles.dropdownItem}>Stars</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <FlatList
        data={sortedRepositories}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  buttonBack: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
  },
  iconBack: {
    height: 30,
    width: 30,
  },
  orderContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: 10,
  },
  orderOption: {
    marginHorizontal: 10,
    color: '#007AFF',
  },
  dropdown: {
    position: 'absolute',
    top: 25,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    zIndex: 1,
  },
  dropdownItem: {
    padding: 10,
    textAlign: 'center',
  },
  repoContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  repoName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  repoDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  repoSummary: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 15,
    marginBottom: 5,
    paddingVertical: 10,
  },
  languageIcon: {
    height: 20,
    width: 20,
    marginRight: 5,
  },
  languageText: {
    marginRight: 5,
    color: '#666',
    fontWeight: 'bold',
  },
  repoStars: {
    fontSize: 14,
    color: '#666',
  },
  actionIcon: {
    width: 24,
    height: 24,
    tintColor: '#007AFF',
  },
});

export default RepositoriesScreen;
