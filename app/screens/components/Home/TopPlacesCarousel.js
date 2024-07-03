import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {colors, sizes} from '../../constants/theme';
import {useNavigation} from '@react-navigation/native';
import {SharedElement} from 'react-navigation-shared-element';
import Carousel from '../shared/Carousel';
import Card from '../shared/Card/Card';
import CardMedia from '../shared/Card/CardMedia';
import CardFavoriteIcon from '../shared/Card/CardFavoriteIcon';

const CARD_HEIGHT = 200;

const TopPlacesCarousel = ({list}) => {
  const navigation = useNavigation();
  return (
    <Carousel
      items={list}
      renderItem={({item, style}) => {
        return (
          <Card
            style={[styles.card, style]}
            shadowType="dark"
            onPress={() => {
              // navigation.navigate('TripDetails', {trip: item});
            }}>
            <SharedElement
              id={`insurance.${item.id}.image`}
              style={StyleSheet.absoluteFillObject}>
              <CardMedia source={item.image} borderBottomRadius />
            </SharedElement>
            <View style={styles.titleBox}>
              <Text style={styles.title}></Text>
              <Text style={styles.title}>{item.title}</Text>
            </View>
          </Card>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    height: CARD_HEIGHT,
  },
  titleBox: {
    position: 'absolute',
    top: CARD_HEIGHT - 80,
    left: 16,
  },
  title: {
    fontSize: sizes.h2,
    fontWeight: 'bold',
    color: colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2,
  },
  location: {
    fontSize: sizes.h3,
    color: colors.white,
  },
});

export default TopPlacesCarousel;
