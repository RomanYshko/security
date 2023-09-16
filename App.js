import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigator from './components/BottomTabNavigator.js';

import { Provider } from "react-redux";

// Custom classes
import Test from './TestClass.js';
import LoginScreen from './LoginScreenClass';

import { Store } from "./store/Store.js";

import HomeScreen from "./components/HomeScreen";
import AboutScreen from "./components/AboutScreen";
import ShiftControlScreen from "./components/ShiftControlScreen";
import BackgroundFetchScreen from "./components/BackgroundTaskScreen";
import LocationTestScreen from "./components/LocationTestScreen";

// Test notifications
import NotificationScreen from "./components/NotificationScreen";
// end test notifications

const Stack = createNativeStackNavigator();

export default function App() {


  return (
      <Provider store={Store}>
        <NavigationContainer>
              {/* <Stack.Navigator screenOptions={{ headerShown: false }}>
            
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="LocationTestScreen" component={LocationTestScreen} />
              <Stack.Screen name="ShiftControlScreen" component={ShiftControlScreen} />
              <Stack.Screen name="Home" component={Test} />
              <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
            

            
          </Stack.Navigator> */}

          <BottomTabNavigator />

        </NavigationContainer>
      </Provider>
  );
}

