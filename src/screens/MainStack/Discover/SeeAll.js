import {
  StyleSheet,
  SafeAreaView,
  TextInput,
  Dimensions,
  View,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Header from '../../../components/Header';
import {useTailwind} from 'tailwind-rn';
import {Colors} from '../../../assets/colors';
import Search from '../../../assets/icons/search.svg';
import MyStatusBar from '../../../components/MyStatusBar';
import QuantCard from '../../../components/QuantCard';

const windowHeight = Dimensions.get('window').height;

const SeeAll = ({route}) => {
  const params = route.params;
  const {data} = params;
  const navigation = useNavigation();

  const tw = useTailwind();

  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = searchTerm => {
    const results = [data].reduce((acc, obj) => {
      const matchingQuants = obj.quants.filter(q =>
        q.name.toString().toLowerCase().includes(searchTerm.toLowerCase()),
      );
      if (matchingQuants.length > 0) {
        acc.push({bank: obj.bank, quants: matchingQuants});
      }
      return acc;
    }, []);
    setFilteredData(...results);
  };

  return (
    <SafeAreaView style={[tw('h-full w-full'), styles.container]}>
      <View style={[tw('h-full '), styles.container]}>
        <MyStatusBar padding={20} />
        <Header title={`${filteredData.bank}`} back={true} />
        <View style={[tw('px-5 mt-3 relative')]}>
          <TextInput
            placeholder="Search"
            placeholderTextColor={Colors.basegray}
            style={styles.input}
            onChangeText={text => {
              if (text) {
                handleSearch(text);
              } else {
                setFilteredData(data);
              }
            }}
          />
          <Search style={tw(`absolute top-3 left-9`)} />
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              paddingLeft: 20,
              marginTop: 20,
            }}>
            {filteredData.quants.map((item, index) => {
              return (
                <View style={[tw('mr-3'), {width: '45%'}]} key={index}>
                  <QuantCard
                    price={item.price}
                    name={item.name}
                    Image={item.imgUrl}
                    severity={item.risk}
                    data={item}
                  />
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SeeAll;

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
  input: {
    height: 50,
    fontSize: 14,
    borderWidth: 1,
    borderRadius: 6,
    paddingLeft: 55,
    borderColor: Colors.basegray2,
    color: Colors.white,
  },
  subheader: {color: Colors.white, fontSize: 18, lineHeight: 25},
});
