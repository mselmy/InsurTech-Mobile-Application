import React, { useEffect, useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/slices/userSlice';
import { router } from 'expo-router';

const LoginScreen = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user } = useSelector((state) => state.user);

    const handleLogin = () => {
        dispatch(loginUser({email, password}));
    };

    useEffect(() => {
        console.log(user);
        if (user) {
            router.push('screens/testScreen');
        }
    }, [user]);

    return (
        <View>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
};

export default LoginScreen;