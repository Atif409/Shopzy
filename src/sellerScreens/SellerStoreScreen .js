import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Dummy data for products (replace with actual data)
const products = [
  { id: '1', name: 'I phone 14', price: 'PKR 25,000', image: require('../../assets/e.jpeg') },
  { id: '2', name: 'I phone 14', price: 'PKR 25,000', image: require('../../assets/h.jpg') },
  { id: '3', name: 'I phone 14', price: 'PKR 25,000', image: require('../../assets/e1.jpeg') },
  { id: '4', name: 'I phone 14', price: 'PKR 25,000', image: require('../../assets/e.jpeg') },
];

const SellerStoreScreen = () => {
  // Render individual product items
  const renderProductItem = (product) => (
    <View key={product.id} style={styles.productItem}>
      <Image source={product.image} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>{product.price}</Text>
      <View style={styles.productActions}>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.removeButton}>
          <Text style={styles.actionText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.storeTitle}>My Store</Text>
      <View style={styles.header}>
        <Image source={require('../../assets/e.jpeg')} style={styles.profileImage} />
        <Text style={styles.sellerName}>Name of Seller</Text>
        <View style={styles.locationContainer}>
          <Ionicons name="location-sharp" size={16} color="darkorange" />
          <Text style={styles.locationText}>Rawalpindi, Pakistan</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Available Items</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.productList}>
        {products.map(renderProductItem)}
      </ScrollView>

      <Text style={styles.sectionTitle}>Borrowed Items</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.productList}>
        {products.slice(0, 2).map(renderProductItem)}
      </ScrollView>

      <Text style={styles.sectionTitle}>Sold Items</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.productList}>
        {products.slice(0, 3).map(renderProductItem)}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 20,
    flexGrow: 1,
    padding: 10,
    backgroundColor: '#fff',
    paddingBottom: 30,
  },
  storeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 20,
    color: 'darkorange',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  locationText: {
    color: 'black',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  sellerName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'left',
  },
  productList: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
  },
  productItem: {
    width: 100,
    marginRight: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 50,
    resizeMode: 'contain',
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 10,
    color: '#666',
    marginBottom: 10,
  },
  productActions: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: 'darkorange',
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
  },
  removeButton: {
    backgroundColor: 'darkorange',
    padding: 5,
    borderRadius: 5,
  },
  actionText: {
    color: '#fff',
    fontSize: 10,
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SellerStoreScreen;
