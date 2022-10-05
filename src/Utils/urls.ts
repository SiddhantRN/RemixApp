import RNFetchBlob from 'rn-fetch-blob';

export const downloadAudioUrl = `https://res.cloudinary.com/dy71m2dro/video/upload/v1664871529/Remix%20app/RainAudio_klitvo.wav`;
export const localStorageUrl =
  `file://` + RNFetchBlob.fs.dirs.DownloadDir + `/rainAudio.wav`;
