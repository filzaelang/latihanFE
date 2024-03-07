import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, View, Button, Alert } from 'react-native';

const androidClientId = "767222461829-81fconiaulkdsngdnheq61n06ntfh2n4.apps.googleusercontent.com";
const webClientId = "767222461829-a7av14gjerkfv63l2bps6f4emq085qsd.apps.googleusercontent.com";

export default function LoginDua() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        GoogleSignin.configure({
            webClientId
        });

        GoogleSignin.signInSilently().then(user => {
            setUser(user);
        });
    }, []);

    const onGoogleButtonPress = async () => {
        try {
            const userInfo = await GoogleSignin.signIn();

            // fix error
            if (!userInfo.idToken) {
                Alert.alert("Error", "Cannot get authentication token");
                return;
            }

            setUser(userInfo);
        } catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // Alert.alert("Cancelled", "Google sign in was cancelled");
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // Alert.alert("In progress", "Google sign in is in progress");
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                Alert.alert("Play services not available or outdated", "Google sign in requires Google Play Services");
            } else {
                Alert.alert("Error", error.message);
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text>Open up App.tsx to start working on your app!</Text>
            {/* Teks hasil input user */}
            {user ? <Text>Halo, {user.user.name}</Text> : <Button title='Sign in with Google' onPress={onGoogleButtonPress} />}
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


