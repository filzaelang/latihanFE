import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useEffect } from 'react';

export function useLogin() {
    const navigation = useNavigation<NavigationProp<Record<string, object>>>();

    async function handleLogin() {

        navigation.navigate({
            name: "Home", // Use 'name' instead of 'key'
            params: {}, // Add any parameters if needed
        });
    }

    return {
        handleLogin,
    }
}

