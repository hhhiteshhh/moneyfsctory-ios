import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {userAtom} from '../../atoms/userAtom';
import {useSetRecoilState} from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const setUser = useSetRecoilState(userAtom);

  const logout = async () => {
    setUser(false);
    await AsyncStorage.removeItem('UserData');
  };
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={logout}>
        <Text>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
