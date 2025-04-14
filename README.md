> Please note that the following setup is for someone using a Mac machine and for ios development. For any future changes, this note will be updated as well

<details>
  <summary><h1>INITIAL SETUP</h1></summary>
  
## Basic Authentication

For basic authentication using email and password. This is the default auth provider that's turned on in supabase when creating a project.
Follow this guide to setup: <https://supabase.com/docs/guides/auth/quickstarts/react-native>

## How to push local repo to github

Follow this guide: <https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github>

![image](https://github.com/user-attachments/assets/304e35af-d9d3-4012-8c14-13b6eee90aac)

</details>
<details>
  <summary><h1>Social Login</h1></summary>
  
## Google

For basic authentication using google email, use the [RN Google Sign In](https://react-native-google-signin.github.io/) package. Follow the guide for react native expo [here](https://react-native-google-signin.github.io/docs/setting-up/expo).

It says there that this will not work in Expo Go. However, it can be done in development build.

## How to setup development build in expo (locally, not in EAS)

Follow [this](https://docs.expo.dev/guides/local-app-development/#local-builds-with-expo-dev-client) guide for local development builds.

You'll know you're in development build when running `npm run start` shows this:

![image](https://github.com/user-attachments/assets/0d475b56-6395-41bd-9228-b5b3c77393f8)


</details>
