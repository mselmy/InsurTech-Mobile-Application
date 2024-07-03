import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../constants/theme';
import MainHeader from '../components/shared/MainHeader';
import ScreenHeader from '../components/shared/ScreenHeader';
import TopPlacesCarousel from '../components/Home/TopPlacesCarousel';
import { PLACES, INSURANCE } from '../data';
import SectionHeader from '../components/shared/SectionHeader';
import TripsList from '../components/Home/TripsList';

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <ScreenHeader mainTitle="Find Your" secondTitle="Perfect Insurance" />
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* <TopPlacesCarousel list={INSURANCE} /> */}
                <SectionHeader/>
                <TripsList list={INSURANCE} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light,
    },
});

export default HomeScreen;
