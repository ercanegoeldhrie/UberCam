import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import DriverSignupScreen from '../screens/driver/DriverSignupScreen';
import DriverPendingScreen from '../screens/driver/DriverPendingScreen';
import RiderHomeScreen from '../screens/rider/RiderHomeScreen';
import RideTrackingScreen from '../screens/rider/RideTrackingScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="DriverSignup" component={DriverSignupScreen} />
        <Stack.Screen name="DriverPending" component={DriverPendingScreen} />
        <Stack.Screen name="RiderHome" component={RiderHomeScreen} />
        <Stack.Screen name="RideTracking" component={RideTrackingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
