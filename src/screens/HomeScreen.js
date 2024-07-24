import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API_URL } from '@env';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [productsInCategory, setProductsInCategory] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Mobiles');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      console.log('Fetching products in selected category:', selectedCategory);

      // Fetch products in selected category
      const categoryResponse = await axios.get(`${API_URL}/products/category/${selectedCategory}`);
      setProductsInCategory(categoryResponse.data);
      console.log('Products in category:', categoryResponse.data);

      // Fetch new arrivals
      const newArrivalsResponse = await axios.get(`${API_URL}/products/new-arrivals`);
      setNewArrivals(newArrivalsResponse.data);
      console.log('New arrivals:', newArrivalsResponse.data);
      console.log('New arrivals:', newArrivalsResponse.data);

      console.log('New arrivals:', newArrivalsResponse.data);

      // Fetch all products
      const allProductsResponse = await axios.get(`${API_URL}/products/all`);
      setAllProducts(allProductsResponse.data);
      console.log('All products:', allProductsResponse.data);

      if (newArrivalsResponse.data.length === 0) {
        console.log('No new arrivals');
      }

      if (categoryResponse.data.length === 0) {
        console.log('No products in selected category:', selectedCategory);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const renderProduct = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { product: item })}>
      <View style={styles.itemContainer} key={item._id}>
        <Image source={{ uri: `${API_URL}${item.images[0]}` }} style={styles.itemImage} />
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.itemPrice}>PKR {item.price}</Text>
        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, index) => (
            <Ionicons key={index} name="star-outline" size={16} color="gold" />
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="darkorange" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>

      <View style={styles.header}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search here..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Ionicons name="search-outline" size={24} color="black" style={styles.searchIcon} onPress={fetchProducts} />
      </View>
      <View style={styles.categories}>
  <TouchableOpacity 
    style={[styles.category, selectedCategory === 'mobiles' ? styles.selectedCategory : {}]} 
    onPress={() => setSelectedCategory('mobiles')}
  >
    <Image source={require('../../assets/mobile.jpg')} style={styles.categoryImage} />
    <Text style={selectedCategory === 'mobiles' ? styles.selectedCategoryText : {}}>Mobiles</Text>
  </TouchableOpacity>
  <TouchableOpacity 
    style={[styles.category, selectedCategory === 'laptops' ? styles.selectedCategory : {}]} 
    onPress={() => setSelectedCategory('laptops')}
  >
    <Image source={require('../../assets/e.jpg')} style={styles.categoryImage} />
    <Text style={selectedCategory === 'laptops' ? styles.selectedCategoryText : {}}>Laptops</Text>
  </TouchableOpacity>
  <TouchableOpacity 
    style={[styles.category, selectedCategory === 'tablets' ? styles.selectedCategory : {}]} 
    onPress={() => setSelectedCategory('tablets')}
  >
    <Image source={require('../../assets/e.jpg')} style={styles.categoryImage} />
    <Text style={selectedCategory === 'tablets' ? styles.selectedCategoryText : {}}>Tablets</Text>
  </TouchableOpacity>
  <TouchableOpacity 
    style={[styles.category, selectedCategory === 'accessories' ? styles.selectedCategory : {}]} 
    onPress={() => setSelectedCategory('accessories')}
  >
    <Image source={require('../../assets/e.jpg')} style={styles.categoryImage} />
    <Text style={selectedCategory === 'accessories' ? styles.selectedCategoryText : {}}>Accessories</Text>
  </TouchableOpacity>
</View>

      <View>
        <Text style={styles.sectionTitle}>Products In Selected Category</Text>
        <FlatList
          data={productsInCategory}
          renderItem={renderProduct}
          keyExtractor={(item) => item._id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View>
        <Text style={styles.sectionTitle}>New Arrivals</Text>
        <FlatList
          data={newArrivals}
          renderItem={renderProduct}
          keyExtractor={(item) => item._id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View>
        <Text style={styles.sectionTitle}>Products In All Categories</Text>
        <FlatList
          data={allProducts}
          renderItem={renderProduct}
          keyExtractor={(item) => item._id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  location: {
    fontSize: 16,
    color: '#333',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchBar: {
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    padding: 10,
    flex: 1,
    marginLeft: 16,
    borderWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    marginLeft: 16,
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  category: {
    alignItems: 'center',
  },
  categoryImage: {
    width: 60,
    height: 60,
    marginBottom: 8,
    borderRadius: 50,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  itemContainer: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  itemImage: {
    width: 100,
    height: 125, 
    borderRadius: 10,
  },
  itemText: {
    marginTop: 8,
  },
  itemPrice: {
    marginTop: 8,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },

  // selectedCategory: {
  //   borderColor: 'darkorange',
  //   borderWidth: 2,
  // },
  
  selectedCategoryText: {
    color: 'darkorange',
  },
  
});

export default HomeScreen;
