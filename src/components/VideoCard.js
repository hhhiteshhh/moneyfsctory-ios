import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Linking,
  Text,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTailwind} from 'tailwind-rn';
import {Colors} from '../assets/colors';
// import {getLinkPreview} from 'link-preview-js';
import Play from '../assets/icons/PlayPause.svg';
const windowWidth = Dimensions.get('window').width;

const VideoCard = ({data}) => {
  const tw = useTailwind();
  const [videoImage, setVideoImage] = useState([]);
  // useEffect(() => {
  //   fetchImage();
  // }, [index]);

  // async function fetchImage() {
  //   getLinkPreview(data.link, {imagesPropertyType: 'og'}).then(data => {
  //     setVideoImage(data.images);
  //   });
  // }
  return (
    <View>
      <View
        style={[
          tw('rounded-md mr-3'),
          {
            width: windowWidth * 0.6,
            height: 160,
            flex: 1,
            justifyContent: 'center',
            position: 'relative',
          },
        ]}>
        <Image
          source={{
            uri: 'https://i.ytimg.com/vi/O6UAY8JLTq8/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGDggYChlMA8=&rs=AOn4CLCcuty_DDEwLD5QmEuXOphNd8n6vQ',
          }}
          style={[
            tw(''),
            {
              width: windowWidth * 0.6,
              height: '100%',
              borderRadius: 10,
              opacity: 0.6,
            },
          ]}
        />
        <View
          style={{
            position: 'absolute',
            left: '40%',
          }}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(data.link);
            }}>
            <Play />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={{color: Colors.white}}>{data.title}</Text>
    </View>
  );
};

export default VideoCard;

const styles = StyleSheet.create({
  backgroundVideo: {
    width: windowWidth * 0.8,
    height: 234,
  },
});
