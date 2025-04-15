> Please note that the following setup is for someone using a Mac machine and for ios development. For any future changes, this note will be updated as well

<details>
  <summary><h1>Initial Setup and Basic Auth</h1></summary>
  
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

For authentication using google email, use the [RN Google Sign In](https://react-native-google-signin.github.io/) package. Follow the guide for react native expo [here](https://react-native-google-signin.github.io/docs/setting-up/expo).

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
i'm using supabase. You will be provided client Id once done. You will be using this one later.

![image](https://github.com/user-attachments/assets/c0499db0-4dc9-4b73-a608-5f4e09d2afd8)

### IOS Application

For ios, you're only required to add a Bundle ID (the rest can be added when the app will be deployed in the app store). Name the Bundle ID in a reverse url like format, `com.<username>.<appname>`.
You will also be provided with a client Id and ios url scheme. same with the web application, take note of these for use later.

![image](https://github.com/user-attachments/assets/6f3838ae-506d-413e-b59d-ee917f189eec)

## Project Setup for Google Auth

In time of writing, the implementation here uses the [Original Google Signin](https://react-native-google-signin.github.io/docs/original) from RN Google Signin.

In your project's app.json file, add this:

```
{
  "expo": {
    "ios": {
      "bundleIdentifier": <same as the Bundle Id setup in Google Console>
    },
    "plugins": [
      [
        "@react-native-google-signin/google-signin",
        {
          "iosUrlScheme": <ios url scheme generated from Google Console>
        }
      ]
    ]
  }
}
```

Install: 
```
npm i @react-native-google-signin/google-signin@latest
```

Inside the file where the Google Auth will run, do something like this:
In this project, i've placed it in GoogleAuth.js using supabase

```
import React, { useState } from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { supabase } from "../lib/supabase";

WebBrowser.maybeCompleteAuthSession();

export default function GoogleAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Replace with your Google client ID
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      <ios client id from google console>, // Your Google Cloud Console client ID
    webClientId:
      <web client id from google console>, // Optional if you have a web version
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      handleSignIn(response.authentication.idToken);
    }
  }, [response]);

  async function handleSignIn(idToken) {
    try {
      setLoading(true);
      console.log({ idToken });
      // Exchange Google access token for Supabase session
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: idToken,
      });

      if (error) {
        throw error;
      }

      setUser(data.user);
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
      alert("Error signing in with Google: " + error.message);
    } finally {
      console.log({ user });
      setLoading(false);
    }
  }

  async function handleSignOut() {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error.message);
      alert("Error signing out: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Google Authentication</Text>
      {user ? (
        <View>
          <Text style={styles.text}>Welcome, {user.email}</Text>
          <Button
            title={loading ? "Signing out..." : "Sign out"}
            onPress={handleSignOut}
            disabled={loading}
          />
        </View>
      ) : (
        <Button
          title={loading ? "Signing in..." : "Sign in with Google"}
          onPress={() => promptAsync()}
          disabled={!request || loading}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
});

```

## Rebuild the App

Rebuild the app by running: 
```
npx expo prebuild --clean
```

Then run this to start 
```
npx expo run:ios
```

</details>
