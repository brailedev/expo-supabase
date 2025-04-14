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

Before anything else, make sure to setup development build since this will not work in Expo Go. Then Google credentials after that.

## How to setup development build in expo (locally, not in EAS)

Follow [this](https://docs.expo.dev/guides/local-app-development/#local-builds-with-expo-dev-client) guide for local development builds.

You'll know you're in development build when running `npm run start` shows this:

![image](https://github.com/user-attachments/assets/0d475b56-6395-41bd-9228-b5b3c77393f8)

## Setting up Google credentials

To be able to authenticate using Google, you need to setup APIs and Services in [Google Console](https://console.cloud.google.com/).
Create an account, then Create Project.

Once a project is created, in here it shows project name is `expo-supabase`, click on the API and Services

![image](https://github.com/user-attachments/assets/3b7ef6a6-06ad-4fb5-b6c4-d45c16a16c74)

Go to Credentials and create 2 Oauth clients: one for Application Type as Web Application and one as IOS

![image](https://github.com/user-attachments/assets/fc864ba4-13d6-4771-95b2-b00796c6755a)

### Web Application

For the web application, name it however you want. Leave the authorized origins as blank. In the Redirect url, add the redirect url for the auth service you are using. In this project, 
i'm using expo.


![image](https://github.com/user-attachments/assets/c0499db0-4dc9-4b73-a608-5f4e09d2afd8)


</details>
