import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedGestureHandler,
  runOnJS,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import {snapPoint} from 'react-native-redash';
import TrackPlayer, {State} from 'react-native-track-player';
import RNFetchBlob from 'rn-fetch-blob';
var RNFS = require('react-native-fs');

import {BUTTON_PADDING, height, width} from '../Utils/constants';
import {startDownload, requestToPermissions} from '../Utils/downloadAudio';
import {freeSoundLogin} from '../services/Auth';
import {
  BUTTON_HEIGHT,
  BUTTON_WIDTH,
  SWIPEABLE_DIMENSIONS,
  H_SWIPE_RANGE,
  H_WAVE_RANGE,
} from '../Utils/constants';
import AudioButton from '../components/AudioButton';
import Test from '../components/Test';

// const SIZE = width * 0.1;
const snapPointsX = [0, 0];
// const snapPointsY = [height - 10 - SIZE, height - height * 0.2 + SIZE - 10];
const snapPointsY = [0, -height * 0.15];

type ComponentProps = {};

const tracks = [
  {
    id: 1,
    url: 'https://res.cloudinary.com/dy71m2dro/video/upload/v1664697440/Remix%20app/346641__inspectorj__rain-on-windows-interior-b_kztywl.wav',
    // url: 'https://res.cloudinary.com/dy71m2dro/video/upload/v1664697440/Remix%20app/346641__inspectorj__rain-on-windows-interior-b_kztywl.wav',
    title: 'RainSound',
  },
];

const PlayerScreen = ({}: ComponentProps) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  useEffect(() => {
    // setUpTrackPlayer();
  }, []);

  const setUpTrackPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add(tracks);
      console.log('Tracks added');
    } catch (e) {
      console.log(e);
    }
  };

  const toggleStyle = useAnimatedStyle(() => ({
    backgroundColor: '#F00',
    width: SWIPEABLE_DIMENSIONS,
    height: SWIPEABLE_DIMENSIONS,
    aspectRatio: 1,
    borderRadius: SWIPEABLE_DIMENSIONS / 2,
    position: 'absolute',
    zIndex: 3,
    bottom: BUTTON_PADDING,
    transform: [{translateX: translateX.value}, {translateY: translateY.value}],
  }));

  const handleChange = (isToggled: Boolean) => {
    if (isToggled) {
      // TrackPlayer.play();
    } else {
      // TrackPlayer.pause();
    }
  };

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {x: number; y: number}
  >({
    onStart: (_event, ctx) => {
      ctx.y = translateY.value;
    },
    onActive: ({translationX, translationY}, ctx) => {
      translateY.value = ctx.y + translationY;
    },
    onEnd: ({translationY, translationX, velocityX, velocityY}) => {
      if (translateY.value > -height * 0.075) {
        translateY.value = withSpring(0);
        // console.log('less');
        // runOnJS(handleComplete)(false);
      } else {
        translateY.value = withSpring(-height * 0.15);
        // runOnJS(handleComplete)(true);
      }

      // const snapPointY = snapPoint(translateY.value, velocityY, snapPointsY);
      // translateY.value = withSpring(
      //   snapPointY,
      //   {velocity: velocityY},
      //   isFinished => {
      //     if (translateY.value == 0) {
      //       console.log('not finished', translateY.value);
      //       runOnJS(setToggle)(false);
      //       // runOnJS(PlayPause);
      //     } else {
      //       console.log('finished', translateY.value);
      //       runOnJS(setToggle)(true);
      //       // runOnJS(handleComplete);
      //       // runOnJS(TrackPlayer.play());
      //     }
      //   },
      // );
      // console.log(translateY);
    },
  });

  return (
    <View style={styles.container}>
      <Text style={{marginTop: 40, fontSize: 20}}>Main Screen</Text>

      <AudioButton handleChange={handleChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    width: width,
  },
  box: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    height: height * 0.07,
    width: height * 0.07,
    borderRadius: height * 0.035,
    backgroundColor: 'yellow',
  },
  songButton: {
    // position: 'absolute',
    // bottom: 20,
    // left: 20,
    // height: height * 0.07,
    // width: height * 0.07,
    borderRadius: height * 0.035,
    flex: 1,
    backgroundColor: 'pink',
  },
  musicToggle: {
    flexDirection: 'column',
    height: BUTTON_HEIGHT,
    width: BUTTON_WIDTH,
    backgroundColor: 'pink',
    borderRadius: BUTTON_WIDTH,
    // padding: BUTTON_PADDING,
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
    // bottom: 600,
    bottom: 10,
    left: 10,
  },
});

export default PlayerScreen;
