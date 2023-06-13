import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainStack from '../screens/MainStack';
import AuthStack from '../screens/AuthStack';

const StackNavigator = ({user, oldUser}) => {
  return user ? <MainStack /> : <AuthStack oldUser={oldUser} />;
};

export default StackNavigator;

const styles = StyleSheet.create({});
