import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import { API_URL } from '@env';
import { Ionicons } from '@expo/vector-icons';
import CustomIcon from '../components/CustomIcon';

const DiscoverScreen = () => {
  const [activeTab, setActiveTab] = useState('Seller Recommendations');
  const [sellers, setSellers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSellersAndProducts = async () => {
      try {
        setLoading(true);
        const sellersResponse = await axios.get(`${API_URL}/seller/all`);
        const productsResponse = await axios.get(`${API_URL}/products/all`); 
    
        // Add a placeholder image to each seller
        const sellersWithImages = sellersResponse.data.map(seller => ({
          ...seller,
          image: { uri: 'https://picsum.photos/100' },
        }));
    
        setSellers(sellersWithImages);
        setProducts(productsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        Alert.alert('Error', 'Failed to fetch data. Please check your network connection and try again.');
      } finally {
        setLoading(false);
      }
    };
    

    fetchSellersAndProducts();
  }, []);

  const renderSellers = () => (
    sellers.map(seller => (
      <View key={seller.id} style={styles.card}>
        <Image source={seller.image} style={styles.sellerImage} />
        <View style={styles.sellerInfo}>
          <Text style={styles.sellerName}>{seller.name}</Text>
          <Text style={styles.sellerCategory}>{seller.category}</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button}>
            <CustomIcon name="store" color="white" size={20}/>
              <Text style={styles.buttonText}>Visit Store</Text>
              
            </TouchableOpacity>

            {/* <TouchableOpacity style={styles.button}>
            <CustomIcon name="message" color="white" size={20}/>
              <Text style={styles.buttonText}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
            <CustomIcon name="add" color="white" size={20}/>
              <Text style={styles.buttonText}>Follow</Text>
            </TouchableOpacity> */}

          </View>
        </View>
      </View>
    ))
  );

  const renderProducts = () => {
    if (products.length === 0) {
      return <Text style={styles.noProductsText}>No products found</Text>;
    }

    return (
      <View style={styles.productGrid}>
        {products.map((product, index) => (
          <View key={product.id} style={[styles.productCard, { marginRight: (index + 1) % 3 === 0 ? 0 : '3.33%' }]}>
            <Image source={product.image} style={styles.productImage} />
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>Pkr {product.price}</Text>
          </View>
        ))}
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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Recommendations</Text>
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Seller Recommendations' && styles.activeTab]}
          onPress={() => setActiveTab('Seller Recommendations')}
        >
          <Text style={styles.tabText}>Seller Recommendations</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Product Recommendations' && styles.activeTab]}
          onPress={() => setActiveTab('Product Recommendations')}
        >
          <Text style={styles.tabText}>Product Recommendations</Text>
        </TouchableOpacity>
      </View>
      {activeTab === 'Seller Recommendations' ? renderSellers() : renderProducts()}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'darkorange',
    textAlign: 'left',
    marginVertical: 10,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  tab: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  activeTab: {
    backgroundColor: '#ccc',
  },
  tabText: {
    fontSize: 12.3,
    color: '#000',
    fontWeight: "bold"
  },
  card: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    alignItems: 'center',
  },
  sellerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  sellerInfo: {
    marginLeft: 10,
    flex: 1,
  },
  sellerName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    top:-25
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    marginRight: 5,
    backgroundColor: 'darkorange',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'darkorange',
    alignItems:'center',

  },
  buttonText: {
    fontSize: 12,
    color: 'white',
    marginLeft: 5,
    fontWeight: "bold"
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  productCard: {
    width: '30%',
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  productPrice: {
    fontSize: 12,
    color: 'black',
    marginTop: 2,
    fontWeight:'bold'
  },
});

export default DiscoverScreen ;
