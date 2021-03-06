import dotenv from 'dotenv';
import { google } from 'googleapis';

dotenv.config();
const { G_CLIENT_ID, G_CLIENT_SECRET, PUBLIC_URL } = process.env;

export const auth = new google.auth.OAuth2(
  G_CLIENT_ID,
  G_CLIENT_SECRET,
  `${PUBLIC_URL}/login`
);

// documentation
// https://github.com/googleapis/google-api-nodejs-client#oauth2-client
// google apis
// https://console.cloud.google.com/apis

export const Google = {
  authUrl: auth.generateAuthUrl({
    access_type: 'online',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile'
    ]
  }),
  logIn: async (code: string) => {
    const { tokens } = await auth.getToken(code);

    auth.setCredentials(tokens);

    const { data } = await google.people({ version: 'v1', auth }).people.get({
      resourceName: 'people/me',
      personFields: 'emailAddresses,names,photos'
    });

    return { user: data };
  }
};
