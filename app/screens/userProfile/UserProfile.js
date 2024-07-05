import React from 'react';
import { View, Text, Button } from 'react-native';

const UserProfile = () => {
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
                        // Perform logout logic here
                        // Redirect to login screen
                        navigation.navigate('Login');
                    },
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <View>
            <Text>User Profile</Text>
            {/* Add your user profile content here */}
            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
};

export default UserProfile;