import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SendRequestSeller = () => {
  const [searchText, setSearchText] = useState('');
  const [sellers, setSellers] = useState([]);
  const [connections, setConnections] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('');
  const [currentSellerId, setCurrentSellerId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (!token) {
          Alert.alert('Error', 'No authentication token found');
          return;
        }

        // Log the token to ensure it's being retrieved correctly
        console.log('Retrieved Token:', token);

        // Fetch current seller details to get their category
        const sellerResponse = await axios.get(`${API_URL}/seller/details`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        const sellerCategory = sellerResponse.data.seller.category;
        const sellerId = sellerResponse.data.seller._id;
        setCurrentCategory(sellerCategory);
        setCurrentSellerId(sellerId);

        // Fetch sellers with the same category
        const sellersResponse = await axios.get(`${API_URL}/seller/all`, {
          headers: {
            Authorization: `${token}`,
          },
          params: { category: sellerCategory },
        });

        // Filter out the current seller from the list
        const filteredSellers = sellersResponse.data.filter(seller => seller._id !== sellerId);
        setSellers(filteredSellers);

        // Fetch existing connections
        const connectionsResponse = await axios.get(`${API_URL}/seller/connections`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        setConnections(connectionsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response) {
          console.error('Error Response:', error.response.data);
          console.error('Error Status:', error.response.status);
          console.error('Error Headers:', error.response.headers);
          Alert.alert('Error', error.response.data.message || 'Failed to fetch data');
        } else {
          Alert.alert('Error', 'Failed to fetch data');
        }
      }
    };

    fetchData();
  }, []);

  const handleSearchIconClick = () => {
    setSearchVisible(!searchVisible);
  };

  const handleConnect = async (receiverId) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        Alert.alert('Error', 'No authentication token found');
        return;
      }

      const response = await axios.post(
        `${API_URL}/seller/connect`,
        { receiverId },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      Alert.alert('Success', response.data.message);

      // Update connections list with pending request
      setConnections([...connections, { receiver: { _id: receiverId }, status: 'pending' }]);
    } catch (error) {
      console.error('Error sending connection request:', error);
      Alert.alert('Error', 'Failed to send connection request');
    }
  };

  const renderItem = ({ item }) => {
    const isConnected = connections.some(
      connection => 
        (connection.sender && connection.sender._id === item._id || connection.receiver && connection.receiver._id === item._id) && 
        connection.status === 'accepted'
    );
    const isPending = connections.some(
      connection => 
        connection.receiver && connection.receiver._id === item._id && connection.status === 'pending'
    );
    const isRequestReceived = connections.some(
      connection => 
        connection.sender && connection.sender._id === item._id && connection.status === 'pending'
    );
  
    if (isConnected || isRequestReceived) return null;
  
    return (
      <View style={styles.friendItem}>
        <Image source={require('../../assets/e.jpeg')} style={styles.avatar} />
        <Text style={styles.name}>{item.name}</Text>
        <TouchableOpacity
          style={styles.buttonAccept}
          onPress={() => handleConnect(item._id)}
          disabled={isPending}
        >
          <Text style={styles.buttonText}>{isPending ? 'Request Sent' : 'Connect'}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  

  const filteredData = sellers.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Connect with Suggested Sellers</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search..."
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity style={styles.searchIcon} onPress={handleSearchIconClick}>
            <Icon name="search" size={20} color="orange" />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 1,
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header: {
    padding: 15,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'darkorange',
    marginBottom: 10,
  },
  searchContainer: {
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    top: 12,
    right: 10,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 40,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonAccept: {
    backgroundColor: 'darkorange',
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  buttonDelete: {
    backgroundColor: 'darkorange',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
});

export default SendRequestSeller;
