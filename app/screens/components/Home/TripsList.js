import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {colors, sizes, spacing} from '../../constants/theme';
import FavoriteButton from '../shared/FavoriteButton';
import {useNavigation} from '@react-navigation/native';
import {SharedElement} from 'react-navigation-shared-element';
import Card from '../shared/Card/Card';
import CardMedia from '../shared/Card/CardMedia';
import CardContent from '../shared/Card/CardContent';
import { useDispatch, useSelector } from 'react-redux';
import { router } from 'expo-router';
import { setCategoryId } from '../../../redux/slices/applySlice';

const CARD_WIDTH = sizes.width / 2 - (spacing.l + spacing.l / 2);
const CARD_HEIGHT = 220;

const TripsList = ({list}) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      {list.map((item, index) => {
        return (
          <Card
            style={[styles.card]}
            shadowType="dark"
            onPress={() => {
              // navigation.navigate('TripDetails', {trip: item});
              dispatch(setCategoryId(item.id));
              router.push('/screens/questions/QuestionListScreen');
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
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cardContainer: {
    marginLeft: spacing.l,
    marginBottom: spacing.l,
  },
  media: {
    flex: 1,
  },
  content: {
    paddingRight: spacing.m,
  },
  card: {
    height: CARD_HEIGHT,
    width: "90%",
    margin: "auto",
    marginBottom: spacing.l,
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
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  location: {
    fontSize: sizes.h3,
    color: colors.white,
  },
});

export default TripsList;
