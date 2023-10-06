/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// import Home from './src/Home';
import { Text, View } from 'react-native';
// import Demo from './src/Demo';


const Stack = createNativeStackNavigator();

function Home(): JSX.Element {
  return <Text>23</Text>;
}

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator><Stack.Screen name='Home' component={Home}/></Stack.Navigator>
      {/* <Stack.Navigator><Stack.Screen name='Demo' component={Demo}/></Stack.Navigator> */}
    </NavigationContainer>
  );
}



export default App;
