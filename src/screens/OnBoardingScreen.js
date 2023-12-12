import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { Image } from 'react-native';

const OnBoardingScreen = ({ navigation }) => {
    const { container, img } = styles;
    const pages = [
        {
            backgroundColor: 'white',
            image: <Image source={require('../../assets/connect.png')} style={img} />,
            title: 'Discover a Vibrant Community',
            subtitle: 'Connect with fellow sellers on our platform'
        }
        ,
        {
            backgroundColor: '#FEBE10',
            image: <Image source={require('../../assets/connect.png')} style={img} />,
            title: 'Share and Borrow with Ease',
            subtitle: 'Exchange items with your peers effortlessly',
        },
        {
            backgroundColor: 'pink',
            image: <Image source={require('../../assets/connect.png')} style={img} />,
            title: 'Negotiate Like a Pro',
            subtitle: 'Master the art of bargaining with sellers',
        },
        {
            backgroundColor: '#fff',
            image: <Image source={require('../../assets/connect.png')} style={img} />,
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
                    navigation.navigate('Login');
                }}
                onSkip={
                    () => {
                        navigation.navigate('Login')
                    }
                }
            />
        </View>
    );
};
export default OnBoardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
    ,
    img: {
        height: 200,
        width: 500
    }
});
