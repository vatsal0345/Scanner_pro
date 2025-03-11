import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/HomeScreen';
import LoginScreen from '../screens/login/LoginScreen';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from '../screens/welcome/WelcomeScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import TextRecognition from '../screens/textRecognition/TextRecognition';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const MainRoutes = () => {
  const privateTabRoutes = () => {
    return (
      <Tab.Navigator
        initialRouteName="textRecognition"
        screenOptions={({route}) => ({
          tabBarIcon: () => {
            let icon;
            if (route.name === 'Home') {
              icon = 'home';
            }
            return <Icon name={'up'} size={30} color="red" />;
          },
        })}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="textRecognition"
          component={TextRecognition}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    );
  };
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PrivateTabRoutes"
        component={privateTabRoutes}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainRoutes;
