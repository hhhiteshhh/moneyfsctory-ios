import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import {useTailwind} from 'tailwind-rn';
import {Colors} from '../../../../assets/colors';
import BackIcon from '../../../../assets/icons/back.svg';
import Button from '../../../../components/Button';
import MyStatusBar from '../../../../components/MyStatusBar';
import {useRecoilValue} from 'recoil';
import {userDataAtom} from '../../../../atoms/userDataAtom';
import { useNavigation } from '@react-navigation/native';

const MyProfile = ({}) => {
  const tw = useTailwind();
  const navigation = useNavigation();

  const user = useRecoilValue(userDataAtom);
  const goBack = () => {
    navigation.goBack();
  };
  const [firstName, setFirstName] = useState(user?.data?.name);
  const [lastName, setLastName] = useState(user?.data?.last_name);
  const [email, setEmail] = useState(user?.data?.email);
  const [phone, setPhone] = useState(user?.data?.phone_number);

  const handleSubmit = async () => {
    try {
    } catch (error) {}
  };

  return (
    <SafeAreaView style={[tw('h-full w-full'), styles.container]}>
      <View style={[tw('h-full w-full px-5')]}>
        <MyStatusBar padding={0} />
        <View
          style={[tw('flex  flex-row items-center justify-between my-3'), {}]}>
          <View style={[tw('flex flex-row items-center flex-1')]}>
            <TouchableOpacity onPress={goBack}>
              <BackIcon />
            </TouchableOpacity>
            <Text style={[tw('font-bold ml-3'), styles.header]}>
              Personal Information
            </Text>
          </View>
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <View
            style={[tw('relative flex items-center justify-center mt-8 mb-5')]}>
            <Image
              source={{
                uri: user?.data.avatar,
              }}
              style={[tw('rounded-full w-32 h-32')]}
            />
            {/* <TouchableOpacity
            style={[tw('absolute -bottom-2 pl-20')]}
            onPress={openGallery}>
            <Camera />
          </TouchableOpacity> */}
          </View>
          <View style={[tw('relative')]}>
            <TextInput
              editable={false}
              style={styles.input}
              onChangeText={text => {
                setFirstName(text);
              }}
              onBlur={() => {}}
              value={firstName}
            />
            <Text
              style={[
                tw('absolute top-[16px] left-6 px-2 font-medium'),
                {
                  color: Colors.basegray,
                  zIndex: 999,
                  backgroundColor: Colors.eerie,
                  fontSize: 12,
                  lineHeight: 16,
                },
              ]}>
              First Name
            </Text>
          </View>
          <View style={[tw('relative')]}>
            <TextInput
              editable={false}
              style={styles.input}
              onChangeText={text => {
                setLastName(text);
              }}
              onBlur={() => {}}
              value={lastName}
            />
            <Text
              style={[
                tw('absolute top-[16px] left-6 px-2 font-medium'),
                {
                  color: Colors.basegray,
                  zIndex: 999,
                  backgroundColor: Colors.eerie,
                  fontSize: 12,
                  lineHeight: 16,
                },
              ]}>
              Last Name
            </Text>
          </View>
          <View style={[tw('relative')]}>
            <TextInput
              editable={false}
              style={styles.input}
              onChangeText={text => {
                setEmail(text);
              }}
              onBlur={() => {}}
              value={email}
            />
            <Text
              style={[
                tw('absolute top-[16px] left-6 px-2 font-medium'),
                {
                  color: Colors.basegray,
                  zIndex: 999,
                  backgroundColor: Colors.eerie,
                  fontSize: 12,
                  lineHeight: 16,
                },
              ]}>
              Email
            </Text>
          </View>
          <View style={[tw('relative')]}>
            <TextInput
              editable={false}
              keyboardType="number-pad"
              style={styles.input}
              maxLength={10}
              onChangeText={text => {
                setPhone(text);
              }}
              onBlur={() => {}}
              value={phone}
            />
            <Text
              style={[
                tw('absolute top-[16px] left-6 px-2 font-medium'),
                {
                  color: Colors.basegray,
                  zIndex: 999,
                  backgroundColor: Colors.eerie,
                  fontSize: 12,
                  lineHeight: 16,
                },
              ]}>
              Mobile Number
            </Text>
          </View>
          <View
            style={[
              tw('flex items-center justify-between flex-row mt-2'),
              {width: '100%'},
            ]}>
            <TouchableOpacity
              style={{width: '49%'}}
              onPress={() => {
                goBack();
              }}>
              <View
                style={[
                  tw('rounded-md mt-3'),
                  {
                    backgroundColor: Colors.primary3,
                  },
                ]}>
                <Text style={[tw('py-3 text-center'), styles.iconLabel]}>
                  Cancel
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{width: '49%'}}
              onPress={() => {
                handleSubmit();
              }}>
              <Button title="Save" />
            </TouchableOpacity>
          </View>
          <View style={{height: 100}} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.eerie,
  },
  header: {color: Colors.white, fontSize: 20, lineHeight: 28},
  input: {
    height: 50,
    fontSize: 14,
    lineHeight: 22,
    borderWidth: 1,
    borderRadius: 6,
    paddingLeft: 20,
    borderColor: Colors.basegray2,
    color: Colors.white,
    marginTop: 23,
  },
  iconLabel: {fontSize: 16, lineHeight: 22, color: Colors.white},
});
