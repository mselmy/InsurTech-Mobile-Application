import { router, useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Button, Card, Text, Title, Paragraph } from 'react-native-paper';
import { logoutUser } from '../../redux/slices/userSlice';

const UserProfile = () => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        if (!user) {
            // If user is null, redirect to the login screen
            router.replace('screens/auth/loginScreen');
        }
    }, [user]);

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Logout',
                    onPress: () => {
                        // Clear user data from redux store
                        dispatch(logoutUser());
                    },
                },
            ],
            { cancelable: false }
        );
    };

    if (!user) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Title
                    title={user.name}
                    subtitle={user.email}
                    left={(props) => <Avatar.Icon {...props} icon="account" />}
                />
                <Card.Content>
                    <Title>User Profile</Title>
                    <Paragraph>ID: {user.id}</Paragraph>
                </Card.Content>
                <Card.Actions>
                    <Button mode="contained" onPress={handleLogout} style={styles.logoutButton}>
                        Logout
                    </Button>
                </Card.Actions>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    card: {
        margin: 10,
        padding: 10,
    },
    logoutButton: {
        backgroundColor: '#f44336', // Red color for logout button
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
});

export default UserProfile;
