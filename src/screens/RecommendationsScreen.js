import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RecommendationsScreen = () => {
  const [activeTab, setActiveTab] = useState('Seller Recommendations');

  const sellers = [
    { id: '1', name: 'Muhammad Khalil', image: require('../assets/e.jpg') },
    { id: '2', name: 'Muhammad Atif', image: require('../assets/e.jpg') },
    { id: '3', name: 'Muhammad Ikram', image: require('../assets/e.jpg') },
  ];

  const products = [
    { id: '1', name: 'Product 1', image: require('../assets/e.jpg'), price: '1000' },
    { id: '2', name: 'Product 2', image: require('../assets/j.jpg'), price: '2000' },
    { id: '3', name: 'Product 3', image: require('../assets/b.jpg'), price: '3000' },
    { id: '4', name: 'Product 4', image: require('../assets/b.jpg'), price: '4000' },
    { id: '5', name: 'Product 5', image: require('../assets/o.jpg'), price: '5000' },
  ];

  const renderSellers = () => (
    sellers.map(seller => (
      <View key={seller.id} style={styles.card}>
        <Image source={seller.image} style={styles.sellerImage} />
        <View style={styles.sellerInfo}>
          <Text style={styles.sellerName}>{seller.name}</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button}>
              <Ionicons name="storefront-outline" size={20} color="white" />
              <Text style={styles.buttonText}>Visit Store</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Ionicons name="chatbox-ellipses-outline" size={20} color="white" />
              <Text style={styles.buttonText}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Ionicons name="add-circle-outline" size={20} color="white" />
              <Text style={styles.buttonText}>Follow</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    ))
  );

  const renderProducts = () => (
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
    justifyContent: 'space-between',
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

export default RecommendationsScreen;
