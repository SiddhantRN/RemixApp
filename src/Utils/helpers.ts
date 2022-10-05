import {Alert, PermissionsAndroid} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {downloadAudioUrl} from './urls';

export const requestToPermissions = async (
  setdownloadProgress: (progress: number) => void,
  setAudioExists: (value: boolean) => void,
  setUpTrackPlayer: () => void,
) => {
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
      startDownload(setdownloadProgress, setAudioExists, setUpTrackPlayer);
    }
    if (granted === PermissionsAndroid.RESULTS.DENIED) {
      Alert.alert(
        'Alert Title',
        'You need to the app media permissions to download and play the audio , close and reopen the app to give permissions again',
      );
    }
  } catch (err) {
    console.log(err);
  }
};

export const startDownload = (
  setdownloadProgress: (progress: number) => void,
  setAudioExists: (value: boolean) => void,
  setUpTrackPlayer: () => void,
) => {
  console.log('downloading has started');
  RNFetchBlob.config({
    fileCache: true,
    appendExt: 'wav',
    path: RNFetchBlob.fs.dirs.DownloadDir + `/rainAudio.wav`,
  })
    .fetch('GET', downloadAudioUrl)
    .progress({interval: 750}, (received, total) => {
      // console.log('progress', (received / total) * 100);
      setdownloadProgress(received / total);
    })
    .then(res => {
      console.log('res', res);
      console.log('The file is save to ', res.path());
      setAudioExists(true);
      setUpTrackPlayer();
    });
};
