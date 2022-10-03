import {PermissionsAndroid} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

export const requestToPermissions = async () => {
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

export const startDownload = () => {
  console.log('downloading has started');
  RNFetchBlob.config({
    fileCache: true,
    appendExt: 'mp3',
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      title: 'RainSound',
      // path: RNFetchBlob.fs.dirs.DownloadDir + `/RainSoundOne.wav`,
      path: RNFetchBlob.fs.dirs.DocumentDir + `/happySong.mp3`,
      // path: 'android/app/src/main/res/raw' + `/NewRain.wav`,
      description: 'Downloading the file',
    },
  })
    .fetch(
      'GET',
      // `https://cdn.freesound.org/sounds/531/531947-0c990bbb-a319-48e3-bd70-67bfa9f2f555?filename=531947__straget__the-rain-falls-against-the-parasol.wav`,
      `https://cdn.freesound.org/sounds/73/73195-8d092cf3-0a8d-462f-b677-b50f3d6a2269?filename=73195__benbojangles__tent-rain-9am.mp3`,
    )
    .then(res => {
      console.log('res', res);
      console.log('The file is save to ', res.path());
    });
};
