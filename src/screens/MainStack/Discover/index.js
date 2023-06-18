import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DiscoverScreen from './DiscoverScreen';
import SeeAll from './SeeAll';
import QuantDetails from '../CommonScreens/QuantDetails';
import MyQuants from '../CommonScreens/MyQuants';
import MyQuantDetails from '../CommonScreens/MyQuantDetails';

const Stack = createNativeStackNavigator();

const HomeScreenStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DiscoverQuantsScreen"
        component={DiscoverScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SeeAll"
        component={SeeAll}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="QuantDetails"
        component={QuantDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyQuants"
        component={MyQuants}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyQuantDetails"
        component={MyQuantDetails}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeScreenStack;
