import {authorize} from 'react-native-app-auth';

const config = {
  issuer:
    'https://freesound.org/apiv2/oauth2/authorize/?client_id=&response_type=code',
  clientId: 'wOOaN3fcka6dLKlOmeon',
  redirectUrl: '<YOUR_REDIRECT_URL>',
  scopes: ['<YOUR_SCOPES_ARRAY>'],
};

const result = await authorize(config);

export const freeSoundLogin = (client_id, response_type) => {
  console.log('rann');
  return fetch(
    `https://freesound.org/apiv2/oauth2/authorize/?client_id=wOOaN3fcka6dLKlOmeon&response_type=code`,
  )
    .then(res => res.json())
    .then(res => {
      return res;
    });
};
