import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './store';
import HomeScreen from './HomeScreen';
import ResultScreen from './ResultScreen';
import RepositoriesScreen from './RepositoriesScreen';
import RepositoryDetailsScreen from './RepositoryDetailsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Result" component={ResultScreen} />
          <Stack.Screen name="Repositories" component={RepositoriesScreen} />
          <Stack.Screen name="RepositoryDetails" component={RepositoryDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
