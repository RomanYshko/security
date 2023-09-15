import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { HomeIcon, ShiftIcon, HomeIconOutline, ShiftIconOutline, LocationIcons, LocationIconOutline } from './TabIcons';
import Header from './Header';


//import Test from '../TestClass.js';
import LoginScreen from '../LoginScreenClass';
import HomeScreen from "../components/HomeScreen";
import ShiftControlScreen from '../components/ShiftControlScreen';
// import LocationTestScreen from '../components/LocationTestScreen';
import NotificationScreen from './NotificationScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Task manager
import * as TaskManager from 'expo-task-manager';
// /task manager


export default function BottomTabNavigator() {

    // ** Define location tracking task
    TaskManager.defineTask('testTask', async ({ data, error }) => {
        if (error) {
            console.log('LOCATION_TRACKING task ERROR:', error);
            return;
        }
        if (data) {
            const { locations } = data;
            let lat = locations[0].coords.latitude;
            let long = locations[0].coords.longitude;

            console.log('test_xtask_run',
                `${new Date(Date.now()).toLocaleString()}: ${lat},${long}`
            );
        }
    });
// /define location tracking task

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({

                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'black',
                tabBarLabelStyle: {
                    fontSize: 10,
                },
                tabBarStyle: {
                    display: 'flex',
                    backgroundColor: 'white',
                },
                tabBarIconStyle: {
                    marginTop: 5,
                },
                tabBarIcon: ({ color, size, focused }) => {
                    switch (route.name) {
                        case 'ShiftControlScreen':
                            return focused ? <ShiftIcon color={color} size={size} /> : <ShiftIconOutline color={color} size={size} />;
                        case 'HomeScreen':
                            return focused ? <HomeIcon color={color} size={size} /> : <HomeIconOutline color={color} size={size} />;
                        // case 'LocationTestScreen':
                        //     return focused ? <LocationIcons color={color} size={size} /> : <LocationIconOutline color={color} size={size} />;
                        case 'NotificationScreen':
                            return focused ? <HomeIcon color={color} size={size} /> : <HomeIconOutline color={color} size={size} />;
                        default:
                            return null;
                    }
                },
            })}
        >
            <Tab.Screen name="LoginScreenTab" options={{
                tabBarLabel: ' ',
                tabBarStyle: { display: 'none' },
                headerShown: false,
            }}>
                {() => (
                    <Stack.Navigator screenOptions={{
                        headerShown: false
                    }}>
                        <Stack.Screen name="LoginScreen" component={LoginScreen} />
                    </Stack.Navigator>
                )}
            </Tab.Screen>
            <Tab.Screen name='HomeScreen' component={HomeScreen} options={{
                tabBarLabel: 'Home',
                header: (props) => <Header {...props} /> }}
            />
            <Tab.Screen name="ShiftControlScreen" component={ShiftControlScreen} options={{
                tabBarLabel: 'Shift',
                header: (props) => <Header {...props} />
            }} />

            {/*<Tab.Screen name="LocationTestScreen" component={LocationTestScreen} options={{*/}
            {/*    tabBarLabel: 'Location',*/}
            {/*    header: (props) => <Header {...props} />*/}
            {/*}} />*/}

            <Tab.Screen name="NotificationScreen" component={NotificationScreen} options={{
                tabBarLabel: 'Shift',
                header: (props) => <Header {...props} />
            }} />

        </Tab.Navigator>
    );
}
