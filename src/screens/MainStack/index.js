import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import Dashboard from './Dashboard';
import DiscoverScreen from './Discover';
import {Colors} from '../../assets/colors';
import LinearGradient from 'react-native-linear-gradient';
import HomeIcon from '../../assets/icons/home.svg';
import DashboardIcon from '../../assets/icons/map.svg';
import DiscoverIcon from '../../assets/icons/community.svg';
import Notifications from './CommonScreens/Notifications';
import MyProfile from './CommonScreens/ProfileStack/MyProfile';
import Refer from './CommonScreens/ProfileStack/Refer';
import ChangePassword from './CommonScreens/ProfileStack/ChangePassword';
import MyInvoices from './CommonScreens/ProfileStack/MyInvoices';
import MyOrders from './CommonScreens/ProfileStack/MyOrders';
import SubscribedPlan from './CommonScreens/ProfileStack/SubscribedPlan';
import MyQuants from './CommonScreens/MyQuants';
import MyQuantDetails from './CommonScreens/MyQuantDetails';
import QuantDetails from './CommonScreens/QuantDetails';
import StarterPlanDescription from './HomeScreen/StarterPlanDescription';
import GrowthPlanDescription from './HomeScreen/GrowthPlanDescription';
import ProPlanDescription from './HomeScreen/ProPlanDescription';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <MyTabBar {...props} />}
      screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Discover" component={DiscoverScreen} />
    </Tab.Navigator>
  );
};

const MyTabBar = ({state, descriptors, navigation}) => {
  return (
    <LinearGradient
      colors={[Colors.color1, Colors.primary]}
      start={{x: 0, y: 1}}
      end={{x: 0, y: 0}}
      style={styles.bottomBar}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const {options} = descriptors[route.key];

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const color = isFocused ? Colors.dark : Colors.gray;

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            testID={options.tabBarTestID}
            accessibilityRole="button">
            <BottomTab
              Icon={
                index === 0
                  ? HomeIcon
                  : index === 1
                  ? DashboardIcon
                  : DiscoverIcon
              }
              isFocused={isFocused}
              data={route}
            />
          </TouchableOpacity>
        );
      })}
    </LinearGradient>
  );
};

const BottomTab = ({Icon, isFocused, data}) => {
  return (
    <View style={styles.bottomIconContainer}>
      <View style={styles.icon}>
        <Icon />
      </View>
      <Text style={{fontSize: 12, lineHeight: 16, color: Colors.white}}>
        {data.name}
      </Text>
      {isFocused && (
        <View
          style={{
            width: 5,
            height: 5,
            borderRadius: 999,
            backgroundColor: Colors.white,
            marginTop: 4,
          }}></View>
      )}
    </View>
  );
};
const Login = () => {
  return (
    <Stack.Navigator initialRouteName={'BottomTabs'}>
      <Stack.Group>
        <Stack.Screen
          name="BottomTabs"
          component={TabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MyProfile"
          component={MyProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Refer"
          component={Refer}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MyInvoices"
          component={MyInvoices}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MyOrders"
          component={MyOrders}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SubscribedPlan"
          component={SubscribedPlan}
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
        <Stack.Screen
          name="QuantDetails"
          component={QuantDetails}
          options={{headerShown: false}}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen
          name="Invest100"
          component={StarterPlanDescription}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="GrowthPlanDescription"
          component={GrowthPlanDescription}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProPlanDescription"
          component={ProPlanDescription}
          options={{headerShown: false}}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default Login;

const styles = StyleSheet.create({
  bottomBar: {
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  middleIcon: {
    bottom: 18,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.6,
    elevation: 8,
  },

  bottomIconContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
