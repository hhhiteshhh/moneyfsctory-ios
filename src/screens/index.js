import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '../components/SplashScreen';
import StackNavigator from '../components/StackNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {userAtom} from '../atoms/userAtom';
import {userDataAtom} from '../atoms/userDataAtom';

export default function Routes() {
  const [ready, setReady] = useState(false);
  const [oldUser, setOldUser] = useState(false);
  const setUserData = useSetRecoilState(userDataAtom);
  const user = useRecoilValue(userAtom);
  const setUser = useSetRecoilState(userAtom);

  const toggleMain = () => {
    setTimeout(() => {
      setReady(true);
    }, 3000);
  };

  useEffect(() => {
    toggleMain();
  }, []);

  useEffect(() => {
    checkOldUser();
    checkUserData();
  }, []);
  const checkOldUser = async () => {
    try {
      const value = await AsyncStorage.getItem('oldUser');
      if (value !== null) {
        // value previously stored
        setOldUser(true);
      }
    } catch (e) {
      // error reading value
    }
  };
  const checkUserData = async () => {
    try {
      const value = await AsyncStorage.getItem('UserData');
      const value2 = JSON.parse(value);

      if (value !== null) {
        // value previously stored
        setUserData({
          name: value2.data.name,
          id: value2.data.id,
          data: value2.data,
        });
        setUser(true);
      }
    } catch (e) {
      // error reading value
    }
  };

  if (!ready) {
    return <SplashScreen />;
  }
  return (
    <NavigationContainer>
      <StackNavigator user={user} oldUser={oldUser} />
    </NavigationContainer>
  );
}
