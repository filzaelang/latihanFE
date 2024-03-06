import { StyleSheet, View } from 'react-native';
import { Text, Button } from "@gluestack-ui/themed"
import { useLogin } from '../hooks/useLogin';
import { useEffect } from 'react';


export default function Login() {
    const { handleLogin } = useLogin()

    return (
        <View style={style.container}>
            <Button style={style.buttonLogin} onPress={handleLogin}>Login Bang</Button>
        </View>
    )
}

const style = StyleSheet.create({
    buttonLogin: {
        padding: 5,
        backgroundColor: "red",
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
