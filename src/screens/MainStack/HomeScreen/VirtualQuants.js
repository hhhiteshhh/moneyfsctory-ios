import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors} from '../../../assets/colors';
import BackIcon from '../../../assets/icons/back.svg';
import {useTailwind} from 'tailwind-rn';
import QuantCard from '../../../components/VirtualQuantCard';
import Button from '../../../components/Button';
import MyStatusBar from '../../../components/MyStatusBar';
import GetApi from '../../../hooks/GetApi';
import apis from '../../../consts/apis';
import {useNavigation} from '@react-navigation/native';
import Header from '../../../components/Header';
import {useRecoilState} from 'recoil';
import {quantsAtom} from '../../../atoms/quantsAtom';
const windowHeight = Dimensions.get('window').height;

const VirtualQuants = () => {
  const tw = useTailwind();
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };

  const [mockData, setMockData] = useRecoilState(quantsAtom);
  const [itemSelected, setItemSelected] = useState();
  const [planSelected, setPlanSelected] = useState('');
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
  const checkboxHandler = (value, index) => {
    let temp = [...mockData];
    temp[value].quants.forEach(quant => {
      quant.checked = false;
    });
    temp[value].quants[index].checked = !temp[value].quants[index].checked;

    if (temp[value].quants[index].checked) {
      setPlanSelected(temp[value].quants[index].name);
      setItemSelected({...temp[value].quants[index], bank: temp[value].bank});
    } else {
      setPlanSelected('');
      setItemSelected('');
    }
    setMockData(temp);
  };

  async function fetchQuants() {
    let temp = [];
    setLoading(true);

    let categories = await GetApi(apis.categories);
    let quants = await GetApi(apis.quants);
    categories.data.map((category, ind) => {
      let tempQuant = [];
      const groupCategories = (ele, id) => {
        for (let i = 0; i < ele.categories?.length; i++) {
          if (ele.categories[i].categoryId._id === category._id) {
            return true;
          }
        }
      };
      quants.data.filter(groupCategories).map(quant => {
        tempQuant.push({checked: false, ...quant});
      });
      temp.push({bank: category.name, quants: tempQuant});
    });
    setMockData(temp);
    setLoading(false);
  }

  useEffect(() => {
    if (mockData?.length > 0) {
    } else {
      fetchQuants();
    }
  }, []);

  return (
    <SafeAreaView style={[tw('h-full w-full'), styles.container]}>
      <View style={[tw('h-full'), styles.container]}>
        <MyStatusBar padding={20} />
        <View style={[tw('mb-3'), {}]}>
          <Header title={`Quants`} back={true} />
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          style={[tw('px-5')]}>
          <View style={tw('flex items-center my-5 justify-center ')}>
            <View style={tw('w-[90%]  flex items-center justify-center')}>
              <Text style={[(tw('text-center font-extrabold'), styles.text1)]}>
                Choose Your Quant
              </Text>
              <Text style={[tw('text-center mt-1 font-medium'), styles.text2]}>
                These offer an AI-optimised portfolio of stocks geared towards
                increasing your profits while decreasing your margin for error.
              </Text>
            </View>
          </View>

          {mockData.map((item, index1) => {
            if (item.bank === 'NIFTY 50')
              return (
                <View
                  style={[
                    tw(
                      'flex flex-row w-full items-center justify-between flex-wrap',
                    ),
                  ]}
                  key={index1}>
                  {item.quants.map((item, index) => (
                    <View style={tw('mb-3 w-[48%]')} key={index}>
                      <QuantCard
                        price={item.price}
                        name={item.name}
                        Image={item.imgUrl}
                        severity={item.risk}
                        data={item}
                        checked={item.checked}
                        checkboxHandler={() => checkboxHandler(index1, index)}
                        index={index}
                      />
                    </View>
                  ))}
                </View>
              );
          })}
          <View
            style={[
              tw('flex items-center w-full justify-between flex-row my-5'),
            ]}>
            <TouchableOpacity
              style={{width: '48%'}}
              onPress={() => {
                goBack();
              }}>
              <View style={[tw('rounded-md mt-3'), styles.deployButton]}>
                <Text style={[tw('py-3 text-center'), styles.iconLabel]}>
                  Previous
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{width: '48%'}}
              onPress={() => {
                if (planSelected && itemSelected) {
                  navigation.navigate('VirtualQuantDetail', {
                    data: itemSelected,
                  });
                }
              }}>
              <Button title="Next" />
            </TouchableOpacity>
          </View>
          <View style={{height: 100}} />
        </ScrollView>
        {renderLoader()}
      </View>
    </SafeAreaView>
  );
};

export default VirtualQuants;

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
  header: {color: Colors.white, fontSize: 24, lineHeight: 33, marginLeft: 20},
  deployButton: {backgroundColor: Colors.primary3},
  iconLabel: {fontSize: 16, lineHeight: 22, color: Colors.white},
  text1: {color: Colors.primary, fontSize: 18, lineHeight: 28},
  text2: {fontSize: 14, lineHeight: 24, color: Colors.white},
});
