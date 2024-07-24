import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddProduct = () => {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sellerCategory, setSellerCategory] = useState('');
    const [sellerId, setSellerId] = useState('');

    useEffect(() => {
        const fetchSellerData = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken');
                if (token) {
                    const sellerResponse = await axios.get(`${API_URL}/seller/details`, {
                        headers: {
                            Authorization: `${token}`,
                        },
                    });
                    const sellerCategory = sellerResponse.data.seller.category;
                    const sellerId = sellerResponse.data.seller._id;

                    setSellerCategory(sellerCategory);
                    setSellerId(sellerId);
                } else {
                    console.error('Token not found');
                    Alert.alert('Error', 'Authentication token not found. Please log in again.');
                }
            } catch (error) {
                console.error('Error fetching seller data:', error);
                Alert.alert('Error', 'Failed to fetch seller data. Please check your network connection and try again.');
            }
        };

        fetchSellerData();
    }, []);

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 5],
                quality: 1,
            });

            if (!result.cancelled) {
                setSelectedImages([...selectedImages, result.uri]);
            }
        } catch (error) {
            console.error('Error picking image:', error);
        }
    };

    const takePhoto = async () => {
        try {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 5],
                quality: 1,
            });

            if (!result.cancelled) {
                setSelectedImages([...selectedImages, result.uri]);
            }
        } catch (error) {
            console.error('Error taking photo:', error);
        }
    };

    const handleAddProduct = async () => {
        try {
            if (!productName || !productDescription || !price || !quantity || selectedImages.length === 0) {
                Alert.alert('Error', 'Please fill in all fields and select at least one image.');
                return;
            }

            setIsLoading(true);

            const formData = new FormData();
            formData.append('name', productName);
            formData.append('description', productDescription);
            formData.append('category', sellerCategory);
            formData.append('price', price);
            formData.append('quantity', quantity);
            formData.append('sellerId', sellerId);

            selectedImages.forEach((image, index) => {
                formData.append('images', {
                    uri: image,
                    type: 'image/jpeg',
                    name: `image_${index}.jpg`
                });
            });

            const response = await fetch(`${API_URL}/products/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            const data = await response.json();
            setIsLoading(false);

            Alert.alert('Success', 'Product added successfully', [
                {
                    text: 'OK',
                    onPress: () => {
                        setProductName('');
                        setProductDescription('');
                        setPrice('');
                        setQuantity('');
                        setSelectedImages([]);
                    },
                },
            ]);
        } catch (error) {
            setIsLoading(false);
            console.error('Error adding product:', error);
            Alert.alert('Error', error.message || 'An error occurred while adding the product. Please try again later.');
        }
    };

    return (
        <KeyboardAvoidingView style={styles.mainContainer}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.heading}>Add Product</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setProductName}
                        value={productName}
                        placeholder="Product Name"
                        placeholderTextColor="#999"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setProductDescription}
                        value={productDescription}
                        placeholder="Product Description"
                        placeholderTextColor="#999"
                        multiline
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={sellerCategory}
                        editable={false}
                        placeholder="Product Category"
                        placeholderTextColor="#999"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setPrice}
                        value={price}
                        keyboardType="numeric"
                        placeholder="Product Price"
                        placeholderTextColor="#999"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setQuantity}
                        value={quantity}
                        keyboardType="numeric"
                        placeholder="Product Quantity"
                        placeholderTextColor="#999"
                    />
                </View>
                <View style={styles.imageContainer}>
                    <View style={styles.imageOptions}>
                        <TouchableOpacity style={styles.button} onPress={pickImage}>
                            <View style={styles.buttonContent}>
                                <MaterialIcons name="photo-library" size={20} color="black" />
                                <Text style={styles.buttonText}>Upload Photo</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={takePhoto}>
                            <View style={styles.buttonContent}>
                                <MaterialIcons name="camera-alt" size={20} color="black" />
                                <Text style={styles.buttonText}>Take Photo</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.imageList}>
                        {selectedImages.map((image, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() =>
                                    Alert.alert(
                                        'Remove Image',
                                        'Are you sure you want to remove this image?',
                                        [
                                            {
                                                text: 'Cancel',
                                                style: 'cancel',
                                            },
                                            {
                                                text: 'OK',
                                                onPress: () =>
                                                    setSelectedImages(selectedImages.filter((_, i) => i !== index)),
                                            },
                                        ]
                                    )
                                }>
                                <Image source={{ uri: image }} style={styles.image} />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity
                style={styles.addProductButton}
                onPress={handleAddProduct}
                disabled={isLoading}>
                {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.addProductButtonText}>Add Product</Text>}
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 20,
    },
    heading: {
        fontSize: 23,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'darkorange',
        textAlign: 'center'
    },
    inputContainer: {
        marginBottom: 10,
    },
    input: {
        height: 50,
        borderColor: 'black',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    imageContainer: {
        marginBottom: 20,
    },
    imageOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    button: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 7,
        width: 150,
        margin:5
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        marginLeft: 3,
    },
    imageList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 10,
        marginBottom: 10,
    },
    addProductButton: {
        backgroundColor: 'darkorange',
        paddingVertical: 15,
        borderRadius: 10,
        width: 250,
        marginBottom: 50,
    },
    addProductButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default AddProduct;
