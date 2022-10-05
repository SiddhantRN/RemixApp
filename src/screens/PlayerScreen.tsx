import React, {useEffect, useState} from 'react';
import {StyleSheet, ActivityIndicator, Image, View} from 'react-native';
import TrackPlayer, {State, RepeatMode} from 'react-native-track-player';
import RNFetchBlob from 'rn-fetch-blob';
var RNFS = require('react-native-fs');
import {PermissionsAndroid} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {height, width} from '../Utils/constants';
import AudioButton from '../components/AudioButton';
import ProgressBar from '../components/progressBar';

type ComponentProps = {};

const tracks = [
  {
    id: 1,
    // url: 'https://res.cloudinary.com/dy71m2dro/video/upload/v1664871529/Remix%20app/RainAudio_klitvo.wav',
    url: `file:///storage/emulated/0/Download/rainAudio.wav`,
    // url: 'https://res.cloudinary.com/dy71m2dro/video/upload/v1664697440/Remix%20app/346641__inspectorj__rain-on-windows-interior-b_kztywl.wav',
    title: 'RainSound',
  },
];

const PlayerScreen = ({}: ComponentProps) => {
  const [audioExists, setAudioExists] = useState(false);
  const [loading, setLoading] = useState(true);
  const [downloadProgress, setdownloadProgress] = useState(0);
  useEffect(() => {
    funcOne();

    //check if file exists
    //true - > setup Player ,enable button.
    //false -> download it
    // sucessful download -> setup player,enable button
    // setUpTrackPlayer();
  }, []);

  const funcOne = async () => {
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
    RNFS.exists(`file:///storage/emulated/0/Download/rainAudio.wav`).then(
      data => {
        if (data == true) {
          // setUpTrackPlayer();
          setAudioExists(true);
          console.log('audio does  exist', data);
          setUpTrackPlayer();
          setLoading(false);
        } else if (data == false) {
          setLoading(false);
          setAudioExists(false);
          console.log('audio does not exist', data);
          requestToPermissions();
        } else {
          console.log('Outhers');
        }
      },
    );
  };

  const requestToPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Music',
          message: 'App needs access to your Files... ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('startDownload...');
        startDownload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const startDownload = () => {
    console.log('downloading has started');
    RNFetchBlob.config({
      fileCache: true,
      appendExt: 'wav',
      path: RNFetchBlob.fs.dirs.DownloadDir + `/rainAudio.wav`,
    })
      .fetch(
        'GET',
        // `https://cdn.freesound.org/sounds/531/531947-0c990bbb-a319-48e3-bd70-67bfa9f2f555?filename=531947__straget__the-rain-falls-against-the-parasol.wav`,
        `https://res.cloudinary.com/dy71m2dro/video/upload/v1664871529/Remix%20app/RainAudio_klitvo.wav`,
      )
      .progress({interval: 750}, (received, total) => {
        // console.log('triggers');
        console.log('progress', (received / total) * 100);
        setdownloadProgress(received / total);
      })
      .then(res => {
        console.log('res', res);
        console.log('The file is save to ', res.path());
        setAudioExists(true);
        setUpTrackPlayer();
      });
  };

  const handleChange = (value: boolean) => {
    console.log(value);
    if (value) {
      // TrackPlayer.reset();
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

      {/* <View style={{position: 'absolute', bottom: 60}}>
        <ProgressBar progress={downloadProgress} />
      </View> */}
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
