import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

const ProductDetailsScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { product } = route.params;
    const [seller, setSeller] = useState(null);

    useEffect(() => {
        const fetchSeller = async () => {
            try {
                const response = await fetch(`${API_URL}/sellers/${product.seller}`);
                const result = await response.json();
                setSeller(result.seller);
            } catch (error) {
                console.log("error to find seller")
                console.error(error);
            }
        };

        fetchSeller();
    }, [product.seller]);

    const handleBuyNow = async () => {
        const token = await AsyncStorage.getItem('authToken');
        if (!token) {
            Alert.alert("Login Required", "Please login to continue your shopping", [{ text: "OK" }]);
            return;
        }
        navigation.navigate('AddressScreen', { product, seller });
    };

    const handleAddToCart = async () => {
        const token = await AsyncStorage.getItem('authToken');
        if (!token) {
            Alert.alert("Login Required", "Please login to continue your shopping", [{ text: "OK" }]);
            return;
        }
        navigation.navigate('Cart', { product });
    };

    const renderImage = ({ item }) => (
        <Image
            source={{ uri: `${API_URL}${item}` }}
            style={styles.productImage}
        />
    );

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.breadcrumbContainer}>
                    <Text style={styles.breadcrumbText}>{product.category} {'>'} {product.name}</Text>
                </View>
                <Carousel
                    data={product.images}
                    renderItem={renderImage}
                    sliderWidth={Dimensions.get('window').width}
                    itemWidth={Dimensions.get('window').width}
                />
                <Text style={styles.productTitle}>{product.name}</Text>
                <Text style={styles.rating}>5.0 ⭐⭐⭐⭐⭐</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.priceLabel}>Shopzy Price</Text>
                    <Text style={styles.price}>{product.price} PKR</Text>
                </View>
                <Text style={styles.availability}>Availability: <Text style={styles.inStock}>{product.quantity > 0 ? 'In stock' : 'Out of stock'}</Text></Text>
                <Text style={styles.specTitle}>Description</Text>
                <View style={styles.specContainer}>
                    <View style={styles.specItem}>
                        <Text style={styles.specLabel}>Description</Text>
                        <Text style={styles.specValue}>{product.description}</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.actionButtonsContainer}>
                <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
                    <Text style={styles.buttonText}>Buy Now</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bargainButton}>
                    <Text style={styles.buttonText}>Bargain</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
                    <Text style={styles.buttonText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContainer: {
        padding: 20,
        paddingBottom: 100,
    },
    breadcrumbContainer: {
        marginBottom: 10,
    },
    breadcrumbText: {
        fontSize: 14,
        color: '#666',
    },
    productImage: {
        width: '100%',
        height: 250,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    productTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    rating: {
        fontSize: 16,
        marginBottom: 20,
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    priceLabel: {
        fontSize: 16,
        color: '#666',
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    availability: {
        fontSize: 16,
        marginBottom: 20,
    },
    inStock: {
        color: 'green',
        fontWeight: 'bold',
    },
    specTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    specContainer: {
        marginBottom: 20,
    },
    specItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    specLabel: {
        fontSize: 16,
        color: '#666',
    },
    specValue: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    actionButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    buyNowButton: {
        backgroundColor: 'darkorange',
        padding: 4,
        borderRadius: 5,
        flex: 1,
        alignItems: 'center',
        marginRight: 5,
        justifyContent: 'center'
    },
    bargainButton: {
        backgroundColor: 'darkorange',
        padding: 4,
        borderRadius: 5,
        flex: 1,
        alignItems: 'center',
        marginRight: 5,
        justifyContent: 'center'
    },
    addToCartButton: {
        backgroundColor: 'darkorange',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProductDetailsScreen;
