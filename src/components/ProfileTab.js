import {StyleSheet, Text, Switch, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors';
import {useTailwind} from 'tailwind-rn';
import Arrow from '../assets/icons/arrow_right.svg';
const ProfileTab = ({title, Icon, last = false, toggle = false, action}) => {
  const tw = useTailwind();

  return (
    <TouchableOpacity
      style={[
        tw('flex flex-row py-5 items-center justify-between'),
        !last && styles.border,
      ]}
      onPress={action}
      disabled={toggle}>
      <View style={[tw('flex flex-row items-center justify-start')]}>
        <View
          style={[
            tw('p-2 w-10 h-10 rounded-full flex items-center justify-center'),
            styles.back,
          ]}>
          <Icon />
        </View>
        <Text style={[tw('font-medium  ml-3'), styles.buttonText]}>
          {title}
        </Text>
      </View>
      {toggle ? (
        <Switch
          trackColor={{false: Colors.dullwhite, true: Colors.yellow}}
          thumbColor={Colors.white}
          value={true}
        />
      ) : (
        <Arrow />
      )}
    </TouchableOpacity>
  );
};

export default ProfileTab;

const styles = StyleSheet.create({
  buttonText: {color: Colors.dullwhite, fontSize: 16, lineHeight: 22},
  border: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.basegray2,
  },
  back: {backgroundColor: Colors.ellipses},
});
