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
    iosClientId: process.env.IOS_CLIENT_ID, // Your Google Cloud Console client ID
    webClientId: process.env.WEB_CLIENT_ID, // Optional if you have a web version
    // For development, you don't need to set these:
    // iosStandaloneAppClientId: 'YOUR_IOS_CLIENT_ID',
    // androidStandaloneAppClientId: 'YOUR_ANDROID_CLIENT_ID',
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
