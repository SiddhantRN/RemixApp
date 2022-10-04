import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import * as Progress from 'react-native-progress';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SWIPEABLE_DIMENSIONS} from '../Utils/constants';

type AppProps = {
  progress: number;
};

const ProgressBar = ({progress}: AppProps) => {
  return (
    <View
      style={{
        height: SWIPEABLE_DIMENSIONS,
        width: SWIPEABLE_DIMENSIONS,
        borderRadius: SWIPEABLE_DIMENSIONS,
        position: 'absolute',
        bottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'pink',
      }}>
      <Progress.Circle
        progress={progress}
        thickness={2}
        size={SWIPEABLE_DIMENSIONS}
        color={'#6c4ace'}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#EDE7F6',
          borderRadius: SWIPEABLE_DIMENSIONS / 2,
        }}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            height: SWIPEABLE_DIMENSIONS,
            width: SWIPEABLE_DIMENSIONS,
            borderRadius: SWIPEABLE_DIMENSIONS,
            // backgroundColor: '#EDE7F6',
          }}>
          <Fontisto name={'blood-drop'} size={24} color={'#48319D'} />
          {/* <Ionicons name={'rainy'} size={20} color={'#48319D'} /> */}
        </View>
      </Progress.Circle>
    </View>
  );
};

export default ProgressBar;
