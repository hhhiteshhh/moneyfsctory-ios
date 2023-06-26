import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import Invest100 from './StarterPlanDescription';
import StarterPlan from './StarterPlan';
import QuantDetails from '../CommonScreens/QuantDetails';
import MyQuantDetails from '../CommonScreens/MyQuantDetails';
import ProPlan from './ProPlan';
import GrowthPlan from './GrowthPlan';
import SeeAll from '../Discover/SeeAll';
import VirtualPortFolio from './VirtualPortFolio';
import VirtualQuants from './VirtualQuants';
import VirtualQuantDetail from './VirtualQuantDetail';
import DeployVirtualQuant from './DeployVirtualQuant';
import Congratulations from './Congratulations';

const Stack = createNativeStackNavigator();

const HomeScreenStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="StarterPlan"
        component={StarterPlan}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProPlan"
        component={ProPlan}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GrowthPlan"
        component={GrowthPlan}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="QuantDetails"
        component={QuantDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyQuantDetails"
        component={MyQuantDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VirtualPortFolio"
        component={VirtualPortFolio}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VirtualQuants"
        component={VirtualQuants}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VirtualQuantDetail"
        component={VirtualQuantDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DeployVirtualQuant"
        component={DeployVirtualQuant}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Congratulations"
        component={Congratulations}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SeeAll"
        component={SeeAll}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeScreenStack;
