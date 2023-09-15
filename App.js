
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigator from './components/BottomTabNavigator.js';

import { Provider } from "react-redux";
import { Store } from "./store/Store.js";

const Stack = createNativeStackNavigator();

export default function App() {

  return (
      <Provider store={Store}>
        <NavigationContainer>
          <BottomTabNavigator />
        </NavigationContainer>
      </Provider>
  );
}
