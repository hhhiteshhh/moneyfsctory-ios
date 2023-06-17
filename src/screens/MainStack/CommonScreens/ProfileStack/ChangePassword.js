import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import {useTailwind} from 'tailwind-rn';
import {Colors} from '../../../../assets/colors';
import BackIcon from '../../../../assets/icons/back.svg';
import PasswordShow from '../../../../assets/icons/password_show.svg';
import PasswordHide from '../../../../assets/icons/password_hide.svg';
import Button from '../../../../components/Button';
import apis from '../../../../consts/apis';
import PutApi from '../../../../hooks/PutApi';
import {userAtom} from '../../../../atoms/userAtom';
import {useSetRecoilState} from 'recoil';
import MyStatusBar from '../../../../components/MyStatusBar';
import {useNavigation} from '@react-navigation/native';
import {useRecoilValue} from 'recoil';
import {userDataAtom} from '../../../../atoms/userDataAtom';

const windowHeight = Dimensions.get('window').height;

const ChangePassword = () => {
  const navigation = useNavigation();
  const user = useRecoilValue(userDataAtom);
  const tw = useTailwind();
  const goBack = () => {
    navigation.goBack();
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const setUser = useSetRecoilState(userAtom);
  const [loading, setLoading] = useState(false);
  const renderLoader = () => {
    if (loading) {
      return (
        <View style={[styles.containerLoader, styles.horizontal]}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      );
    }
  };
  const resetPassword = async () => {
    setLoading(true);

    if (newPassword !== confirmpassword) {
      alert('Confirm Password does not match with the given password');
      setLoading(false);
      return;
    } else if (newPassword.length < 6) {
      alert('Password must be more than 6 characters');
      setLoading(false);
      return;
    } else {
      var curphone = user?.data?.phone_number;
      const options = {
        phone: curphone,
        password: newPassword,
      };
      try {
        let result = await PutApi(apis.resetPassword, options);
        if (result.status === 200) {
          setLoading(false);
          alert('password changed successfully. Need to login again');
          setTimeout(() => {
            setUser(false);
          }, 2000);
        } else {
          alert('password not updated');
          setLoading(false);
        }
      } catch (error) {
        alert('Network Error');
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={[tw('h-full w-full'), styles.container]}>
      <View style={[tw('h-full px-5'), styles.container]}>
        <MyStatusBar padding={0} />
        <View
          style={[tw('flex  flex-row items-center justify-between my-3'), {}]}>
          <View style={[tw('flex flex-row items-center flex-1')]}>
            <TouchableOpacity onPress={goBack}>
              <BackIcon />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={[tw('font-bold'), styles.header]}>Change Password</Text>
        {/* <View style={tw('mt-9 relative')}>
        <TextInput
          secureTextEntry={!showPassword}
          //   placeholder="Old Password"
          placeholderTextColor="gray"
          style={styles.input}
          onChangeText={text => {
            setPassword(text);
          }}
          value={password}
        />
        <Text
          style={[
            tw('absolute -top-2 left-6 px-2 font-medium'),
            {
              color: Colors.basegray,
              zIndex: 999,
              backgroundColor: Colors.eerie,
              fontSize: 12,
              lineHeight: 16,
            },
          ]}>
          Old Password
        </Text>
        <TouchableOpacity
          onPress={() => {
            setShowPassword(!showPassword);
          }}
          style={tw(`absolute top-3 right-4`)}>
          {showPassword ? <PasswordHide /> : <PasswordShow />}
        </TouchableOpacity>
      </View> */}
        <View style={tw('mt-9 relative')}>
          <TextInput
            secureTextEntry={!showNewPassword}
            //   placeholder="Old Password"
            placeholderTextColor="gray"
            style={styles.input}
            onChangeText={text => {
              setNewPassword(text);
            }}
            value={newPassword}
          />
          <Text
            style={[
              tw('absolute -top-2 left-6 px-2 font-medium'),
              {
                color: Colors.basegray,
                zIndex: 999,
                backgroundColor: Colors.eerie,
                fontSize: 12,
                lineHeight: 16,
              },
            ]}>
            New Password
          </Text>
          <TouchableOpacity
            onPress={() => {
              setShowNewPassword(!showNewPassword);
            }}
            style={tw(`absolute top-3 right-4`)}>
            {showNewPassword ? <PasswordHide /> : <PasswordShow />}
          </TouchableOpacity>
        </View>
        <View style={tw('mt-9 relative')}>
          <TextInput
            secureTextEntry={!showNewPassword}
            //   placeholder="Old Password"
            placeholderTextColor="gray"
            style={styles.input}
            onChangeText={text => {
              setConfirmPassword(text);
            }}
            value={confirmpassword}
          />
          <Text
            style={[
              tw('absolute -top-2 left-6 px-2 font-medium'),
              {
                color: Colors.basegray,
                zIndex: 999,
                backgroundColor: Colors.eerie,
                fontSize: 12,
                lineHeight: 16,
              },
            ]}>
            Confirm New Password
          </Text>
        </View>
        <TouchableOpacity
          style={[tw('mt-6')]}
          disabled={!confirmpassword || !newPassword}
          onPress={() => {
            // if (checked === 'true') {
            //   setUserData({name: 'Mustafa'});
            //   setUser(true);
            //   setDeployedAtom(true);
            // } else {
            //   setUserData({name: 'Mustafa'});
            //   setUser(true);
            // }
            //   handleSubmit();
            resetPassword();
          }}>
          <Button title="Change Password" />
        </TouchableOpacity>
      </View>
      {renderLoader()}
    </SafeAreaView>
  );
};

export default ChangePassword;

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
  container: {
    backgroundColor: Colors.eerie,
  },
  header: {color: Colors.white, fontSize: 24, lineHeight: 32},
  input: {
    height: 50,
    fontSize: 14,
    borderWidth: 1,
    borderRadius: 6,
    paddingLeft: 20,
    borderColor: Colors.basegray2,
    color: Colors.white,
  },
});
