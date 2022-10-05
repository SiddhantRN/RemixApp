import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
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
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  SWIPEABLE_DIMENSIONS,
  BUTTON_PADDING,
  height,
  BUTTON_WIDTH,
} from '../Utils/constants';

type ComponentProps = {
  handleChange: (value: boolean) => void;
  handleChangeVolume: (volume: number) => void;
};

const AudioButton: React.FC<ComponentProps> = ({
  handleChange,
  handleChangeVolume,
}) => {
  const [volumeOn, setVolumeOn] = useState<boolean>(false);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const toggleStyle = useAnimatedStyle(() => ({
    backgroundColor: '#EDE7F6',
    width: SWIPEABLE_DIMENSIONS,
    height: SWIPEABLE_DIMENSIONS,
    aspectRatio: 1,
    borderRadius: SWIPEABLE_DIMENSIONS / 2,
    position: 'absolute',
    zIndex: 3,
    borderWidth: 3,
    borderColor: '#6c4ace',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: BUTTON_PADDING,
    transform: [{translateX: translateX.value}, {translateY: translateY.value}],
  }));

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
      if (volumeOn) {
        const swipeablePosition = translateY.value - SWIPEABLE_DIMENSIONS;
        if (
          swipeablePosition < -height * 0.2 &&
          swipeablePosition > -height * 0.25
        ) {
          runOnJS(handleChangeVolume)(0.6);
        }
        if (
          swipeablePosition < -height * 0.25 &&
          swipeablePosition > -height * 0.3
        ) {
          runOnJS(handleChangeVolume)(0.7);
        }
        if (
          swipeablePosition < -height * 0.3 &&
          swipeablePosition > -height * 0.35
        ) {
          runOnJS(handleChangeVolume)(0.8);
        }
        if (
          swipeablePosition < -height * 0.35 &&
          swipeablePosition > -height * 0.4
        ) {
          runOnJS(handleChangeVolume)(0.9);
        }
        if (
          swipeablePosition < -height * 0.4 &&
          swipeablePosition > -height * 0.45
        ) {
          runOnJS(handleChangeVolume)(1);
        }
      }
    },
    onEnd: ({translationY, translationX, velocityX, velocityY}) => {
      if (!volumeOn) {
        if (translateY.value > -height * 0.075) {
          translateY.value = withSpring(0);
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
        } else if (translateY.value > -height * 0.075) {
          translateY.value = withSpring(0);
          runOnJS(setVolumeOn)(false);
          runOnJS(handleChange)(false);
        }
      }
    },
  });

  return (
    <View style={styles.musicToggle}>
      {volumeOn && (
        <View style={styles.volume}>
          <View style={{position: 'absolute', top: 10}}>
            <Ionicons name={'volume-medium'} size={24} color={'#EDE7F6'} />
          </View>
          <View style={{position: 'absolute', bottom: 10}}>
            <Ionicons name={'volume-low'} size={24} color={'#EDE7F6'} />
          </View>
        </View>
      )}
      <View style={styles.volumeOff}>
        <MaterialCommunityIcons
          name={'volume-mute'}
          size={26}
          color={'#EDE7F6'}
        />
      </View>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={toggleStyle}>
          <Fontisto name={'blood-drop'} size={24} color={'#48319D'} />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  musicToggle: {
    flexDirection: 'column',
    height: height * 0.45,
    width: BUTTON_WIDTH,
    borderRadius: BUTTON_WIDTH,
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 10,
  },
  volume: {
    flexDirection: 'column',
    height: height * 0.3,
    width: BUTTON_WIDTH,
    backgroundColor: '#48319d',
    borderRadius: BUTTON_WIDTH,
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#6c4ace',
    elevation: 3,
    top: 0,
  },
  volumeOff: {
    position: 'absolute',
    bottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AudioButton;
