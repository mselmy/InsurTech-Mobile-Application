import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/slices/userSlice';
import { router } from 'expo-router';
import { Button, ButtonText, ButtonSpinner, ScrollView, Link, LinkText } from '@gluestack-ui/themed';
import LottieView from 'lottie-react-native';

const logo = require('../../../assets/logo.png');

const LoginScreen = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user, loading, error } = useSelector((state) => state.user);

    const handleLogin = () => {
        dispatch(loginUser({ email, password }));
    };

    const HandleRegistration = () => {
        router.push('/screens/auth/registerScreen');
    };

    useEffect(() => {
        if (user) {
            router.push('/screens/CustomNavigator');
        }
    }, [user]);

    useEffect(() => {
        if (error) {
            alert(error);
            router.push('/screens/CustomNavigator');
        }
    }, [error]);

    return (
        <ScrollView>
            <View style={styles.container}>

                <LottieView
                    source={require('../../../assets/animation/Login.json')}
                    autoPlay
                    loop
                    style={styles.animation}
                />
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
                <Button isDisabled={loading} bg="$darkBlue600" p="$3" style={styles.button} onPress={handleLogin}>
                    {loading ? (
                        <>
                            <ButtonSpinner mr="$1" />
                            <ButtonText fontWeight="$medium" fontSize="$2xl">
                                Please wait...
                            </ButtonText>
                        </>
                    ) : (
                        <ButtonText fontWeight="$medium" fontSize="$3xl">
                            Login
                        </ButtonText>
                    )}
                </Button>
                <Link onPress={HandleRegistration} style={styles.registerContainer}>
                    <LinkText style={styles.register}>Register</LinkText>
                </Link>
            </View>
        </ScrollView>
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
    animation: {
        width: 400,
        height: 400,
    },
    registerContainer: {
        marginTop: 20,
    },
    register: {
        fontSize: 20,
        color: '#2acaac'
    },
});

export default LoginScreen;
