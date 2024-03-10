import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import * as SecureStore from "expo-secure-store";

//screens
import Login from './App/Screens/LoginScreen/Login';

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};
console.log(tokenCache)

export default function App() {
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey='pk_test_ZGVzdGluZWQtZ29ibGluLTkyLmNsZXJrLmFjY291bnRzLmRldiQ'>
      <SafeAreaView style={styles.container}>
        {/* Sign In Component */}
        <SignedIn>
          <Text style={styles.textSignIn}>You are Signed in</Text>
        </SignedIn>
        {/* Sign Out Component */}
        <SignedOut>
          <Login />
        </SignedOut>
        <StatusBar style="auto" />
      </SafeAreaView>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#66D1FF',
    alignItems: "center"
  },
  textSignIn: {
    marginTop: 40
  }
});
