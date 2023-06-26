import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import QuantCard from '../../../components/QuantCard';
import {useTailwind} from 'tailwind-rn';
import {Colors} from '../../../assets/colors';
import Search from '../../../assets/icons/search.svg';
import apis from '../../../consts/apis';
import GetApi from '../../../hooks/GetApi';
import MyStatusBar from '../../../components/MyStatusBar';
import {useRecoilState, useRecoilValue} from 'recoil';
import {quantsAtom} from '../../../atoms/quantsAtom';
import Header from '../../../components/Header';
import {useNavigation} from '@react-navigation/native';
import {userDataAtom} from '../../../atoms/userDataAtom';
const windowHeight = Dimensions.get('window').height;

const Discover = () => {
  const navigation = useNavigation();
  const user = useRecoilValue(userDataAtom);

  const tw = useTailwind();
  const renderItem = ({item}) => (
    <QuantCard
      price={item.price}
      name={item.name}
      Image={item.imgUrl}
      severity={item.risk}
      data={item}
    />
  );

  const [loading, setLoading] = useState(false);
  const [quants, setQuants] = useRecoilState(quantsAtom);
  const renderLoader = () => {
    if (loading) {
      return (
        <View style={[styles.containerLoader, styles.horizontal]}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      );
    }
  };

  async function fetchQuants() {
    if (quants.length > 0) {
      setFilteredData(quants);
    } else {
      let temp = [];
      setLoading(true);
      let categories = await GetApi(apis.categories);
      let quants = await GetApi(apis.quants);
      categories.data.map((category, ind) => {
        let tempQuant = [];
        const groupCategories = (ele, id) => {
          for (let i = 0; i < ele.categories.length; i++) {
            if (ele.categories[i].categoryId._id === category._id) {
              return true;
            }
          }
        };
        quants.data.filter(groupCategories).map(quant => {
          tempQuant.push(quant);
        });
        temp.push({bank: category.name, quants: tempQuant});
      });

      setFilteredData(temp);
      setQuants(temp);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (quants.length > 0) {
    } else {
      fetchQuants();
    }
  }, [quants]);

  const [filteredData, setFilteredData] = useState(quants);
  const handleSearch = searchTerm => {
    const results = quants.reduce((acc, obj) => {
      const matchingQuants = obj.quants.filter(q =>
        q.name.toString().toLowerCase().includes(searchTerm.toLowerCase()),
      );
      if (matchingQuants.length > 0) {
        acc.push({bank: obj.bank, quants: matchingQuants});
      }
      return acc;
    }, []);
    setFilteredData(results);
  };
  return (
    <SafeAreaView style={[tw('h-full w-full'), styles.container]}>
      <View style={[tw('h-full '), styles.container]}>
        <MyStatusBar padding={20} />
        <Header title={`Hello ${user.name.split(' ')[0]}!`} back={false} />
        <View style={[tw('px-5 mt-3 relative')]}>
          <TextInput
            placeholder="Search"
            placeholderTextColor={Colors.basegray}
            style={styles.input}
            onChangeText={text => {
              if (text) {
                handleSearch(text);
              } else {
                setFilteredData(quants);
              }
            }}
          />
          <Search style={tw(`absolute top-3 left-9`)} />
          <Text style={[tw('font-bold mt-3 mb-3'), styles.subheader]}>
            MoneyFactory Quants
          </Text>
        </View>
        <FlatList
          style={[tw('pl-5')]}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={filteredData}
          renderItem={({item}) => (
            <View>
              <View
                style={[
                  tw(
                    'flex flex-row w-full items-center justify-between mt-3 mb-3',
                  ),
                ]}>
                <Text style={[tw('font-bold'), styles.name]}>{item.bank}</Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('SeeAll', {data: item});
                  }}>
                  <Text style={[tw('font-bold'), styles.seeAll]}>See All</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={item.quants}
                renderItem={renderItem}
                keyExtractor={item => item._id}
              />
            </View>
          )}
          keyExtractor={item => item.bank}
        />
      </View>
      {renderLoader()}
    </SafeAreaView>
  );
};

export default Discover;

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
  header: {color: Colors.white, fontSize: 20, lineHeight: 28},
  subheader: {color: Colors.white, fontSize: 18, lineHeight: 25},
  name: {color: Colors.basegray, fontSize: 18, lineHeight: 24},
  seeAll: {
    color: Colors.primary,
    paddingRight: 10,
    fontSize: 14,
    lineHeight: 19,
  },
});
