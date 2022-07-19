import React from 'react';
import {View, Easing, Animated} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RouteNames} from './src/constants';
import Layout from './src/screens/Layout'

const Stack = createStackNavigator();
export const horizontalAnimation = () => {
  return {
    transitionSpec: {
      duration: 500,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const {layout, position, scene} = sceneProps;

      const thisSceneIndex = scene.index;
      const width = layout.initWidth;

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [-width, 0],
        extrapolate: 'clamp',
      });

      return {
        transform: [{translateX}],
      };
    },
  };
};

const App = () => {
  return (
    <SafeAreaProvider>
      <View style={{display: 'flex', flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              horizontalAnimation,
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