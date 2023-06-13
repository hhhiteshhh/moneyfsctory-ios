import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import React from 'react';
import Home from '../../assets/icons/home.svg';
import Quant from '../../assets/icons/quants.svg';
import Community from '../../assets/icons/community.svg';
import Profile from '../../assets/icons/profile.svg';
import Map from '../../assets/icons/map.svg';
// import HomeScreen from './homescreenstack/index';
import {Colors} from '../../assets/colors';
import {useTailwind} from 'tailwind-rn';
// import MyQuants from './myquantstack/index';
// import ProfilePage from './myprofilestack/index';
// import Dashboard from './dashboardstack/index';
// import DiscoverQuant from './discoverstack/index';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

const Tab = createBottomTabNavigator();

const Discover = () => {
  const tw = useTailwind();
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      initialRouteName={'HomeScreen'}
      screenOptions={{
        tabBarHideOnKeyboard: true,
      }}
      tabBar={props => <MyTabBar {...props} />}
      backBehavior={'none'}>
      {/* <Tab.Screen
        name="HomeScreen"
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
          tabBarHideOnKeyboard: true,
        }}>
        {props => <HomeScreen {...props} />}
      </Tab.Screen>
      <Tab.Screen
        name="MyQuantScreen"
        options={{
          tabBarLabel: 'Explore',
          headerShown: false,
          tabBarHideOnKeyboard: true,
        }}>
        {props => <MyQuants {...props} />}
      </Tab.Screen>
      <Tab.Screen
        name="Dashboard"
        options={{
          tabBarLabel: 'Booking',
          headerShown: false,
          tabBarHideOnKeyboard: true,
        }}>
        {props => <Dashboard {...props} />}
      </Tab.Screen>

      <Tab.Screen
        name="Discover"
        options={{
          tabBarLabel: 'Profile',
          headerShown: false,
          tabBarHideOnKeyboard: true,
        }}>
        {props => <DiscoverQuant {...props} />}
      </Tab.Screen>
      <Tab.Screen
        name="SettingScreen"
        options={{
          tabBarLabel: 'Profile',
          headerShown: false,
          tabBarHideOnKeyboard: true,
        }}>
        {props => <ProfilePage {...props} />}
      </Tab.Screen> */}
    </Tab.Navigator>
  );
};

export default Discover;

function MyTabBar({navigation, bookingNotifications, ...props}) {
  const iconList = [
    {
      Icon: Home,
      title: 'Home',
      route: 'HomeScreen',
    },
    {
      Icon: Quant,
      title: 'My Quant',
      route: 'MyQuantScreen',
    },

    {
      Icon: Map,
      title: 'Dashboard',
      route: 'Dashboard',
    },
    {
      Icon: Community,
      title: 'Discover',
      route: 'Discover',
    },
    {
      Icon: Profile,
      title: 'My Profile',
      route: 'SettingScreen',
    },
  ];

  const {state} = props;
  return (
    <View
      style={{
        height: Platform.OS === 'ios' ? 110 : 60,
        width: '100%',
        paddingBottom: Platform.OS === 'ios' ? 20 : 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        overflow: 'hidden',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#191919',
        elevation: 15,
        shadowColor: 'rgba(0,0,0,1)',
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 1.4,
        shadowRadius: 10,
      }}>
      {iconList.map(({Icon, title, route}, index) => (
        <TouchableOpacity
          key={`data${index}`}
          accessibilityRole="button"
          onPress={() => {
            navigation.navigate(route);
            navigation.reset({
              index: 0,
              routes: [{name: route}],
            });
          }}
          style={{
            width: windowWidth / 5,
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon />
          <Text style={{fontSize: 12, lineHeight: 16, color: '#ffffff'}}>
            {title}
          </Text>
          {state.index === index && (
            <View
              style={{
                width: 5,
                height: 5,
                borderRadius: 999,
                backgroundColor: '#ffffff',
                marginTop: 4,
              }}></View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
  },
  btnCircle: {
    width: 60,
    height: 60,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.yellow,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
    bottom: 30,
  },
  text: {
    fontSize: 12,
    lineHeight: 16,
    marginTop: 5,
    color: Colors.white,
  },
});
