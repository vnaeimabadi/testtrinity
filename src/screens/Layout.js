import {View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import * as screen from './';
import {RouteNames} from '../constants';
import {horizontalAnimation} from '../../App';


const Stack = createStackNavigator();
const Layout = () => {


  return (
    <SafeAreaProvider>
      <View style={{display: 'flex', flex: 1}}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            horizontalAnimation,
          }}
          initialRouteName={RouteNames.PageOne}>
          <Stack.Screen name={RouteNames.PageOne} component={screen.PageOne} />
          <Stack.Screen name={RouteNames.PageTwo} component={screen.PageTwo} />
        </Stack.Navigator>
      </View>
    </SafeAreaProvider>
  );
};

export default Layout;
