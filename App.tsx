import React from 'react';
import {View, Easing, Animated} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RouteNames} from './src/constants';
import Layout from './src/screens/Layout';

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <View style={{display: 'flex', flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName={RouteNames.Layout}>
            <Stack.Screen name={RouteNames.Layout} component={Layout} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
};

export default App;
