// web 767222461829-cdehrtgf1732phhh4dqfj86jlmpg128v.apps.googleusercontent.com
// ios 767222461829-j965otr7og82d87bqedsmhh0dvokubr2.apps.googleusercontent.com
// android 767222461829-81fconiaulkdsngdnheq61n06ntfh2n4.apps.googleusercontent.com
// (SHA-1) 52FC94951626CE00CA89A6E63C5B86F3D5440F86
// web 19006 = 767222461829-np91dkgudojndmlftmjfpgbgclcqod31.apps.googleusercontent.com

import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from '@react-native-async-storage/async-storage';



WebBrowser.maybeCompleteAuthSession();

export default function Login() {
    const [userInfo, setUserInfo] = useState<any>(null);
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: "767222461829-81fconiaulkdsngdnheq61n06ntfh2n4.apps.googleusercontent.com",
        iosClientId: "767222461829-j965otr7og82d87bqedsmhh0dvokubr2.apps.googleusercontent.com",
        webClientId: "767222461829-a7av14gjerkfv63l2bps6f4emq085qsd.apps.googleusercontent.com"
    })

    useEffect(() => {
        handleLSignInWithGoogle()
    }, [response])

    async function handleLSignInWithGoogle() {
        const user = await AsyncStorage.getItem("@user");
        if (!user) {
            if (response?.type === "success") {
                await getUserInfo(response.authentication?.accessToken)
            }
        } else {
            setUserInfo(JSON.parse(user));
        }
    }

    async function getUserInfo(token: any) {
        if (!token) return;
        console.log(token)
        try {
            const response = await fetch(
                "https://www.googleapis.com/userinfo/v2/me",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (!response.ok) {
                throw new Error(`Failed to fetch user info: ${response.status}`);
            }

            const user = await response.json();
            await AsyncStorage.setItem("@user", JSON.stringify(user))
            setUserInfo(user)
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    }

    return (
        <View style={styles.container}>
            <Text>Open up App.tsx to start working on your app!</Text>
            <Text>{JSON.stringify(userInfo, null, 2)}</Text>
            <Button title='Sign in with Google' onPress={() => promptAsync()} />
            <Button title='Delete local storage' onPress={() => AsyncStorage.removeItem("@user")} />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


