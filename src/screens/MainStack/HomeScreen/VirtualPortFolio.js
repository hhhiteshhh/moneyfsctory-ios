import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../assets/colors';
import BackIcon from '../../../assets/icons/back.svg';
import {useTailwind} from 'tailwind-rn';
import forgotPassword from '../../../assets/images/virtual_portfolio.png';
import CheckBox from '@react-native-community/checkbox';
import Button from '../../../components/Button';
import MyStatusBar from '../../../components/MyStatusBar';
import Header from '../../../components/Header';
import {useNavigation} from '@react-navigation/native';

const VirtualPortFolio = () => {
  const tw = useTailwind();
  const navigation = useNavigation();
  const [planSelected, setPlanSelected] = useState('');
  const checkboxHandler = (value, index) => {
    const newValue = plans.map((plan, i) => {
      if (i !== index)
        return {
          ...plan,
          checked: false,
        };
      if (i === index) {
        const item = {
          ...plan,
          checked: !plan.checked,
        };
        if (!plan.checked) {
          setPlanSelected(plan.title);
        } else setPlanSelected('');
        return item;
      }

      return plan;
    });
    setPlans(newValue);
  };
  const [plans, setPlans] = useState([
    {title: '₹ 5 Lakh', checked: false},
    {title: '₹ 10 Lakh', checked: false},
    {title: '₹ 20 Lakh', checked: false},
    {title: '₹ 50 Lakh', checked: false},
    {title: '₹ 1 cr', checked: false},
  ]);

  return (
    <SafeAreaView style={[tw('h-full w-full '), styles.container]}>
      <View style={[tw('h-full'), styles.container]}>
        <MyStatusBar padding={20} />
        <View style={[tw('mb-3')]}>
          <Header title={`Virtual PortFolio`} back={true} />
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={tw('mb-5 px-5')}>
          <View style={tw('flex items-center mt-10 mb-6 justify-center')}>
            <Image
              source={forgotPassword}
              style={[tw('mt-3'), styles.image]}
              resizeMode="contain"
            />
            <View style={tw('w-[85%] flex mt-5 justify-center items-center')}>
              <Text style={[(tw('text-center font-extrabold'), styles.text1)]}>
                Select your portfolio amount
              </Text>
              <Text style={[tw('text-center mt-1 font-medium'), styles.text2]}>
                How big do you want your portfolio to be?
              </Text>
              <Text style={[tw('text-center'), styles.text2]}>
                Select an amount based on your goals, risk appetite, and current
                investment capacity.
              </Text>
            </View>
          </View>
          {plans.map((plan, index) => (
            <TouchableOpacity
              key={index}
              style={[
                tw('flex items-center justify-between flex-row p-5 my-2'),
                styles.checkbox,
              ]}
              onPress={e => {
                checkboxHandler(e, index);
              }}>
              <View>
                <Text style={[tw(''), styles.portfolio]}>Portfolio Value</Text>
                <Text style={[tw('font-bold '), styles.title]}>
                  {plan.title}
                </Text>
              </View>
              <CheckBox
                boxType="square"
                style={{
                  transform: [{scaleX: 0.8}, {scaleY: 0.8}],
                }}
                tintColor={Colors.primary4}
                onCheckColor={Colors.white}
                onFillColor={Colors.primary4}
                onTintColor={Colors.primary4}
                value={plan.checked}
                // onValueChange={e => {
                //   checkboxHandler(e, index);
                // }}
              />
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            onPress={() => {
              if (planSelected) {
                navigation.navigate('VirtualQuants');
              } else {
                alert('Please select a plan.');
              }
            }}>
            <Button title="Next" />
          </TouchableOpacity>
          <View style={{height: 100}} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default VirtualPortFolio;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.eerie,
  },
  header: {color: Colors.white, fontSize: 24, lineHeight: 33, marginLeft: 20},
  text1: {color: Colors.primary, fontSize: 18, lineHeight: 28},
  text2: {fontSize: 14, lineHeight: 24, color: Colors.white},
  checkbox: {backgroundColor: Colors.lightBlack},
  portfolio: {fontSize: 14, lineHeight: 18, color: Colors.dullwhite},
  title: {fontSize: 20, lineHeight: 26, color: Colors.white},
});
