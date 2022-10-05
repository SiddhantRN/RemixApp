import React from 'react';
import {View, StyleSheet} from 'react-native';
import * as Progress from 'react-native-progress';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {SWIPEABLE_DIMENSIONS} from '../Utils/constants';

type AppProps = {
  progress: number;
};

const ProgressBar: React.FC<AppProps> = ({progress}) => {
  return (
    <View style={styles.container}>
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
        <View style={styles.iconContainer}>
          <Fontisto name={'blood-drop'} size={24} color={'#48319D'} />
        </View>
      </Progress.Circle>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: SWIPEABLE_DIMENSIONS,
    width: SWIPEABLE_DIMENSIONS,
    borderRadius: SWIPEABLE_DIMENSIONS,
    position: 'absolute',
    bottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
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
  },
});

export default ProgressBar;
