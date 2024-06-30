import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/slices/userSlice';
import { router } from 'expo-router';

const logo = require('../../../assets/logo.png');

const LoginScreen = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user } = useSelector((state) => state.user);

    const handleLogin = () => {
        dispatch(loginUser({email, password}));
    };

    useEffect(() => {
        if (user) {
            router.push('screens/testScreen');
        }
    }, [user]);

    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.image} />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Login" color={"#2acaac"} style={styles.button} onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '80%',
        height: 70,
        borderRadius: 15,
        borderWidth: 3,
        borderColor: '#2acaac',
        marginBottom: 10,
        paddingHorizontal: 10,
        fontSize: 20,
    },
    button: {
        width: '80%',
        height: 70,
        borderRadius: 15,
        backgroundColor: '#2acaac',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
        objectFit: 'contain'
    },
});

export default LoginScreen;