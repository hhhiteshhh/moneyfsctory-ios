import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useTailwind} from 'tailwind-rn';
import {Colors} from '../../../assets/colors';
import MenuIcon from '../../../assets/icons/menu.svg';
import BellIcon from '../../../assets/icons/bell.svg';
import Filter from '../../../assets/icons/filter.svg';
import Search from '../../../assets/icons/search.svg';
import MyQuantCard from '../../../components/MyQuantCard';
import apis from '../../../consts/apis';
import GetApi from '../../../hooks/GetApi';
import MyStatusBar from '../../../components/MyStatusBar';
import {useNavigation} from '@react-navigation/native';
import {useRecoilValue} from 'recoil';
import {userDataAtom} from '../../../atoms/userDataAtom';
import Header from '../../../components/Header';

const windowHeight = Dimensions.get('window').height;
const MyQuants = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const user = useRecoilValue(userDataAtom);
  const renderLoader = () => {
    if (loading) {
      return (
        <View style={[styles.containerLoader, styles.horizontal]}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      );
    }
  };
  const tw = useTailwind();
  const [quants, setQuants] = useState([]);

  async function fetchMyQuants() {
    setLoading(true);
    let result = await GetApi(`${apis.myQuants}/${user?.id}`);
    if (result.status === 200) {
      setQuants(result.data);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchMyQuants();
  }, []);
  const navigateToNotifications = () => {
    navigation.navigate('Notifications');
  };
  return (
    <SafeAreaView style={[tw('h-full w-full'), styles.container]}>
      <View style={[tw('h-full '), styles.container]}>
        <MyStatusBar padding={20} />
        <Header title={`My Quants`} back={true} />
        <View style={[tw(' my-3 px-5 relative')]}>
          <TextInput
            placeholder="Search"
            placeholderTextColor={Colors.basegray}
            style={styles.input}
            onChangeText={text => {
              // setEmail(text);
              // setEmailError(checkEmail(text) ? '' : 'Invalid Email');
            }}
            // value={email}
          />
          <Search style={tw(`absolute top-3 left-9`)} />
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          {quants?.activeQuants?.map((ele, index) => {
            return <MyQuantCard key={index} data={ele} />;
          })}

          <View style={{height: 10}} />
        </ScrollView>
      </View>
      {renderLoader()}
    </SafeAreaView>
  );
};

export default MyQuants;

const styles = StyleSheet.create({
  containerLoader: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.eerie,

    opacity: 0.5,
    height: windowHeight,
    position: 'absolute',
    width: '100%',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  container: {
    backgroundColor: Colors.eerie,
  },
  header: {color: Colors.white, fontSize: 20, lineHeight: 28},
  input: {
    height: 50,
    fontSize: 14,
    borderWidth: 1,
    borderRadius: 6,
    paddingLeft: 55,
    borderColor: Colors.basegray2,
    color: Colors.white,
  },
});
