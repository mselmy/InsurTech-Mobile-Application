import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
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
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const { user, loading, error } = useSelector((state) => state.user);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleLogin = () => {
        let valid = true;
        if (!email) {
            setEmailError('Email is required');
            valid = false;
        } else if (!validateEmail(email)) {
            setEmailError('Please enter a valid email');
            valid = false;
        } else {
            setEmailError('');
        }

        if (!password) {
            setPasswordError('Password is required');
            valid = false;
        } else {
            setPasswordError('');
        }

        if (valid) {
            dispatch(loginUser({ email, password }));
        }
    };

    const handleRegistration = () => {
        router.push('/screens/auth/registerScreen');
    };

    useEffect(() => {
        if (user) {
            router.replace('/screens/CustomNavigator');
        }
    }, [user]);

    useEffect(() => {
        if (error) {
            alert(error);
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
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
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
                <Link onPress={handleRegistration} style={styles.registerContainer}>
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
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
        alignSelf: 'flex-start',
        marginLeft: '10%',
    },
});

export default LoginScreen;
