import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

const DisplayProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sellerId, setSellerId] = useState('');

  useEffect(() => {
    const fetchSellerId = async () => {
      try {
        const id = await AsyncStorage.getItem('sellerId');
        if (id) {
          setSellerId(id);
        }
      } catch (error) {
        console.log('Error fetching seller Id:', error);
      }
    };

    fetchSellerId();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!sellerId) return;
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/products/seller/${sellerId}`);
        setProducts(response.data);
      } catch (error) {
        console.log('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [sellerId]);

  const renderItem = ({ item }) => {
    const imageUrl = item.images && item.images.length > 0 ? `${API_URL}${item.images[0]}` : '';

    return (
      <View style={styles.item}>
        {imageUrl ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: imageUrl }} style={styles.productImage} />
          </View>
        ) : (
          <View style={styles.imageContainer}>
            <Text style={styles.noImageText}>No Image Available</Text>
          </View>
        )}
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.price}>PKR {item.price}</Text>
        <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="darkorange" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Products</Text>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={styles.list}
        style={{ flex: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 20,
    textAlign: 'center',
    color: 'darkorange',
  },
  list: {
    justifyContent: 'center',
  },
  item: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 4 / 5,
    backgroundColor: '#e1e4e8',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
    textAlign: 'center',
  },
  price: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  quantity: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'grey',
  },
});

export default DisplayProducts;
