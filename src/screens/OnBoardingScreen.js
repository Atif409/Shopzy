import React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const OnBoardingScreen = ({ navigation }) => {
    const { width: screenWidth } = Dimensions.get('window');
    const { container } = styles;

    const pages = [
        {
            backgroundColor: '#67a3ad',
            image: <Image source={require('../../assets/background/discover.jpeg')} style={[styles.image, { width: screenWidth }]} resizeMode="contain" />,
            title: 'Discover a Vibrant Community',
            subtitle: 'Connect with fellow sellers on our platform'
        },
        {
            backgroundColor: '#8fd8d7',
            image: <Image source={require('../../assets/background/share.jpeg')} style={[styles.image, { width: screenWidth }]} resizeMode="contain" />,
            title: 'Share and Borrow with Ease',
            subtitle: 'Exchange items with your peers effortlessly',
        },
        {
            backgroundColor: '#4da3bc',
            image: <Image source={require('../../assets/background/nego.jpeg')} style={[styles.image, { width: screenWidth }]} resizeMode="contain" />,
            title: 'Negotiate Like a Pro',
            subtitle: 'Master the art of bargaining with sellers',
        },
        {
            backgroundColor: '#113c67',
            image: <Image source={require('../../assets/background/shop.jpeg')} style={[styles.image, { width: screenWidth }]} resizeMode="contain" />,
            title: 'Shop with Confidence',
            subtitle: 'Buy from trustworthy sellers you can rely on',
        },
    ];

    return (
        <View style={container}>
            <Onboarding
                containerStyles={{ paddingHorizontal: 15 }}
                pages={pages}
                onDone={() => {
                    navigation.navigate('Main');
                }}
                onSkip={() => {
                    navigation.navigate('Main');
                }}
            />
        </View>
    );
};
export default OnBoardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        height: 380,
        width: '100%', 
    },
});
