import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useTailwind} from 'tailwind-rn';
import MenuIcon from '../assets/icons/menu.svg';
import BellIcon from '../assets/icons/bell.svg';
import ProfileIcon from '../assets/icons/ProfileIcon.svg';
import {useRecoilValue} from 'recoil';
import {userDataAtom} from '../atoms/userDataAtom';
import {Colors} from '../assets/colors';
import GetApi from '../hooks/GetApi';
import apis from '../consts/apis';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';
import ProfilePage from '../screens/MainStack/CommonScreens/ProfileStack/ProfilePage';

const windowHeight = Dimensions.get('window').height;
const Header = () => {
  const tw = useTailwind();
  const navigation = useNavigation();

  const user = useRecoilValue(userDataAtom);
  const [orders, setOrders] = useState([]);
  const [profileDrawer, setProfileDrawer] = useState(false);
  const navigateToNotifications = () => {
    navigation.navigate('Notifications');
  };
  useEffect(() => {
    fetchorders();
  }, []);
  async function fetchorders() {
    try {
      let result = await GetApi(`${apis.openOrders}/${user?.id}`);
      if (result.status === 200) {
        setOrders(result.data);
      }
    } catch (error) {}
  }
  return (
    <View style={[tw('flex flex-row items-center justify-between px-5'), {}]}>
      <View style={[tw('flex flex-row items-center flex-1')]}>
        <MenuIcon />
        <Text style={[tw('font-bold ml-3'), styles.header]}>
          Welcome {user.name}!
        </Text>
      </View>
      <TouchableOpacity
        onPress={navigateToNotifications}
        style={[tw('relative')]}>
        <BellIcon />
        {orders?.data?.length > 0 && (
          <View
            style={[
              tw('h-[10px] w-[10px] absolute rounded-full top-0 right-0'),
              {backgroundColor: Colors.red},
            ]}></View>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={{marginLeft: 24}}
        onPress={() => {
          setProfileDrawer(true);
        }}>
        <ProfileIcon />
      </TouchableOpacity>

      <Modal
        isVisible={profileDrawer}
        style={{
          backgroundColor: Colors.eerie,
          marginLeft: '10%',
          margin: 0,
          height: windowHeight,
          width: '90%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        animationOutTiming={500}
        backdropColor="transparent"
        customBackdrop={
          <TouchableOpacity
            style={styles.customBackdrop}
            activeOpacity={1}
            onPress={() => {
              setProfileDrawer(false);
            }}></TouchableOpacity>
        }
        backdropOpacity={0.4}
        onBackdropPress={() => {
          setProfileDrawer(false);
        }}>
        <ProfilePage setProfileDrawer={setProfileDrawer} />
      </Modal>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {color: Colors.white, fontSize: 20, lineHeight: 28},
  customBackdrop: {
    flex: 1,
    backgroundColor: Colors.black,
    opacity: 0.8,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});
