import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import TrackPlayer, {State, RepeatMode} from 'react-native-track-player';
var RNFS = require('react-native-fs');
import LinearGradient from 'react-native-linear-gradient';

import {height, width} from '../Utils/constants';
import AudioButton from '../components/AudioButton';
import ProgressBar from '../components/progressBar';
import {downloadAudioUrl, localStorageUrl} from '../Utils/urls';
import {requestToPermissions} from '../Utils/helpers';

type ComponentProps = {};

const tracks = [
  {
    id: 1,
    // url: 'https://res.cloudinary.com/dy71m2dro/video/upload/v1664871529/Remix%20app/RainAudio_klitvo.wav',
    url: localStorageUrl,
    title: 'RainSound',
  },
];

const PlayerScreen: React.FC<ComponentProps> = ({}) => {
  const [audioExists, setAudioExists] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [downloadProgress, setdownloadProgress] = useState<number>(0);
  useEffect(() => {
    lifeCycleFunc();
    //check if file exists
    //true - > setup Player ,enable button.
    //false -> download it -> sucessful download -> setup player,enable button
  }, []);

  const lifeCycleFunc = async () => {
    await checkAudioExists();
  };

  const setUpTrackPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add(tracks);
      await TrackPlayer.setRepeatMode(RepeatMode.Track);
      console.log('Tracks added');
    } catch (e) {
      console.log(e);
    }
  };

  const checkAudioExists = () => {
    RNFS.exists(localStorageUrl).then(data => {
      if (data == true) {
        setAudioExists(true);
        console.log('audio does  exist', data);
        setUpTrackPlayer();
        setLoading(false);
      } else if (data == false) {
        setLoading(false);
        setAudioExists(false);
        console.log('audio does not exist', data);
        requestToPermissions(
          setdownloadProgress,
          setAudioExists,
          setUpTrackPlayer,
        );
      } else {
        console.log('Outhers');
      }
    });
  };

  const handleChange = (value: boolean) => {
    console.log(value);
    if (value) {
      TrackPlayer.play();
      TrackPlayer.setVolume(0.4);
    } else {
      TrackPlayer.pause();
    }
  };
  const handleChangeVolume = (value: number) => {
    console.log(value);
    TrackPlayer.setVolume(value);
  };

  return (
    <LinearGradient colors={['#2E335A', '#1C1B33']} style={styles.container}>
      <Image
        source={require('../assets/Rain.png')}
        style={styles.image}
        resizeMode={'contain'}
      />
      {loading ? (
        <ActivityIndicator />
      ) : audioExists ? (
        <AudioButton
          handleChange={handleChange}
          handleChangeVolume={handleChangeVolume}
        />
      ) : (
        <ProgressBar progress={downloadProgress} />
      )}
      {/* <TouchableOpacity
        style={{height: 50, width: 50, backgroundColor: 'pink'}}
        onPress={() =>
          console.log(localStorageUrl, 'and', downloadAudioUrl)
        }></TouchableOpacity> */}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    width: width,
    alignItems: 'center',
  },
  image: {
    marginTop: height * 0.1,
    height: height * 0.2,
    width: height * 0.2,
  },
});

export default PlayerScreen;
