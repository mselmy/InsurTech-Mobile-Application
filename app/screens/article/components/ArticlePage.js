import React from 'react';
import { View, Image, Text } from 'react-native';

const ArticlePage = ({ article }) => {
    return (
        <View>
            <Image source={{ uri: article.image }} style={{ width: '100%', height: 200 }} />
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 10 }}>{article.title}</Text>
            <Text>{article.content}</Text>
        </View>
    );
};

export default ArticlePage;