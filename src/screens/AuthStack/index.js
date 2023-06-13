import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SliderScreen from './SliderScreen';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import OTPScreen from './OTPScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import OTPScreenFP from './OTPScreenFP';
import ResetPassword from './ResetPassword';

const Stack = createNativeStackNavigator();
const AuthScreens = ({oldUser}) => {
  return (
    <Stack.Navigator initialRouteName={oldUser ? 'SignIn' : 'Slider'}>
      <Stack.Screen
        name="Slider"
        component={SliderScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignIn"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OTP"
        component={OTPScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OTPFP"
        component={OTPScreenFP}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Reset"
        component={ResetPassword}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthScreens;
