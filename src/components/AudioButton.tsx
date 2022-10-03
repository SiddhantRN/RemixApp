import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Text,
  Touchable,
  //   TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedGestureHandler,
  runOnJS,
} from 'react-native-reanimated';
import {snapPoint} from 'react-native-redash';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  TouchableOpacity,
} from 'react-native-gesture-handler';

import {
  SWIPEABLE_DIMENSIONS,
  BUTTON_PADDING,
  height,
  width,
  BUTTON_HEIGHT,
  BUTTON_WIDTH,
} from '../Utils/constants';

type AppProps = {
  name: string;
  onPressButton: (name: string) => void;
};

const snapPointsY = [0, -height * 0.15];

const AudioButton = ({handleChange}) => {
  const [volumeOn, setVolumeOn] = useState(false);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const toggleStyle = useAnimatedStyle(() => ({
    backgroundColor: '#F00',
    width: SWIPEABLE_DIMENSIONS,
    height: SWIPEABLE_DIMENSIONS,
    aspectRatio: 1,
    borderRadius: SWIPEABLE_DIMENSIONS / 2,
    position: 'absolute',
    zIndex: 3,
    // left: 15,
    bottom: BUTTON_PADDING,
    transform: [{translateX: translateX.value}, {translateY: translateY.value}],
  }));

  const handleComplete = (isToggled: Boolean) => {
    console.log('translateY.value', translateY.value);
    if (isToggled) {
      // TrackPlayer.play();
      //   console.log('yes');
    } else {
      //   console.log('no');
      // TrackPlayer.pause();
    }
  };

  const clamp = (value: number, min: number, max: number) => {
    'worklet';
    return Math.min(Math.max(value, min), max);
  };

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {x: number; y: number}
  >({
    onStart: (_event, ctx) => {
      ctx.y = translateY.value;
    },
    onActive: ({translationX, translationY}, ctx) => {
      translateY.value = clamp(
        ctx.y + translationY,
        -(height * 0.45 - SWIPEABLE_DIMENSIONS - 2 * BUTTON_PADDING),
        0,
      );
      //   translateY.value = ctx.y + translationY;
    },
    onEnd: ({translationY, translationX, velocityX, velocityY}) => {
      if (!volumeOn) {
        if (translateY.value > -height * 0.075) {
          translateY.value = withSpring(0);
          // console.log('less');
          // runOnJS(setVolumeOn)(false);
          runOnJS(handleChange)(false);
        } else {
          translateY.value = withSpring(-height * 0.15);
          runOnJS(setVolumeOn)(true);
          runOnJS(handleChange)(true);
        }
      } else {
        if (
          translateY.value > -height * 0.2 &&
          translateY.value < -height * 0.075
        ) {
          translateY.value = withSpring(-height * 0.15);
          // runOnJS(setVolumeOn)(false);
        } else if (translateY.value > -height * 0.075) {
          translateY.value = withSpring(0);
          runOnJS(setVolumeOn)(false);
          //   runOnJS(handleChange)(true);
        }
      }
      //   if (!volumeOn) {
      //     const snapPointY = snapPoint(translateY.value, velocityY, snapPointsY);
      //     translateY.value = withSpring(
      //       snapPointY,
      //       {velocity: velocityY},
      //       isFinished => {
      //         if (translateY.value == 0) {
      //           console.log('not finished', translateY.value);
      //         } else {
      //           console.log('finished', translateY.value);
      //           runOnJS(setVolumeOn)(true);
      //         }
      //       },
      //     );
      //   } else {
      //     if (
      //       translateY.value > -height * 0.2 &&
      //       translateY.value < -height * 0.075
      //     ) {
      //       translateY.value = withSpring(-height * 0.15);
      //       // runOnJS(setVolumeOn)(false);
      //     } else if (translateY.value > -height * 0.075) {
      //       translateY.value = withSpring(0);
      //       runOnJS(setVolumeOn)(false);
      //       //   runOnJS(handleChange)(true);
      //     }
      //   }
    },
  });

  return (
    <>
      {/* {translateY.value == 0 ? null : <View style={styles.musicToggle}></View>} */}
      <TouchableOpacity
        style={{height: 40, width: 40, backgroundColor: 'pink'}}
        onPress={
          () => console.log(translateY.value == -113.89090909090909)
          //   setVolumeOn(false)
        }></TouchableOpacity>
      <View style={styles.musicToggle}>
        {volumeOn && <View style={styles.volume}></View>}
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View style={toggleStyle}>
            {/* <TouchableOpacity
              onPress={() => console.log('pressed')}></TouchableOpacity> */}
          </Animated.View>
        </PanGestureHandler>
      </View>

      {/* <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={toggleStyle} />
      </PanGestureHandler> */}
    </>
  );
};

const styles = StyleSheet.create({
  musicToggle: {
    flexDirection: 'column',
    // height: BUTTON_HEIGHT,
    height: height * 0.45,
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
  volume: {
    flexDirection: 'column',
    // height: BUTTON_HEIGHT,
    height: height * 0.3,
    width: BUTTON_WIDTH,
    backgroundColor: 'blue',
    borderRadius: BUTTON_WIDTH,
    // padding: BUTTON_PADDING,
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
    // bottom: 600,
    top: 0,
  },
});

export default AudioButton;
