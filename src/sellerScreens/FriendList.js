import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FriendList = () => {
  const [selectedTab, setSelectedTab] = useState('requests');
  const [searchText, setSearchText] = useState('');
  const [connectionRequests, setConnectionRequests] = useState([]);
  const [connectedSellers, setConnectedSellers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPendingRequests = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        Alert.alert('Error', 'No authentication token found');
        return;
      }

      const response = await axios.get(`${API_URL}/seller/pending-requests`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      console.log('Pending requests:', response.data);

      // Filter out duplicate requests
      const uniqueRequests = Array.from(new Set(response.data.map(req => req._id)))
        .map(id => response.data.find(req => req._id === id));

      setConnectionRequests(uniqueRequests);

    } catch (error) {
      console.error('Error fetching pending requests:', error);
      Alert.alert('Error', 'Failed to fetch pending requests');
    } finally {
      setLoading(false);
    }
  };

  const fetchConnectedSellers = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        Alert.alert('Error', 'No authentication token found');
        return;
      }

      const response = await axios.get(`${API_URL}/seller/connections`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      console.log('Connected sellers:', response.data);

      // Directly use the response data array for connected sellers
      const connections = response.data.filter(conn => conn.status === 'accepted');

      setConnectedSellers(connections);

    } catch (error) {
      console.error('Error fetching connections:', error);
      Alert.alert('Error', 'Failed to fetch connections');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedTab === 'requests') {
      fetchPendingRequests();
    } else {
      fetchConnectedSellers();
    }
  }, [selectedTab]);

  const handleAcceptRequest = async (connectionId) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        Alert.alert('Error', 'No authentication token found');
        return;
      }

      const response = await axios.post(
        `${API_URL}/seller/accept-connection`,
        { connectionId },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      Alert.alert('Success', response.data.message);

      setConnectionRequests(prevRequests => prevRequests.filter(req => req._id !== connectionId));
      const acceptedConnection = connectionRequests.find(req => req._id === connectionId);
      setConnectedSellers([...connectedSellers, { ...acceptedConnection, status: 'accepted' }]);

    } catch (error) {
      console.error('Error accepting connection request:', error);
      Alert.alert('Error', 'Failed to accept connection request');
    }
  };

  const handleRejectRequest = async (connectionId) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        Alert.alert('Error', 'No authentication token found');
        return;
      }

      const response = await axios.post(
        `${API_URL}/seller/reject-connection`,
        { connectionId },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      Alert.alert('Success', response.data.message);

      setConnectionRequests(prevRequests => prevRequests.filter(req => req._id !== connectionId));

    } catch (error) {
      console.error('Error rejecting connection request:', error);
      Alert.alert('Error', 'Failed to reject connection request');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.friendItem}>
      <Image source={{ uri: 'https://via.placeholder.com/40' }} style={styles.avatar} />
      <Text style={styles.name}>{item.sender.name}</Text>
      {selectedTab === 'requests' ? (
        <>
          <TouchableOpacity style={styles.buttonAccept} onPress={() => handleAcceptRequest(item._id)}>
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonDelete} onPress={() => handleRejectRequest(item._id)}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.iconContainer}>
          {/* <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="message" size={24} color="white" />
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="store" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const filteredData = selectedTab === 'requests' ? connectionRequests : connectedSellers;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Friends</Text>
      </View>
      <View style={styles.tabs}>
        <TouchableOpacity
          style={selectedTab === 'requests' ? styles.tabActive : styles.tabInactive}
          onPress={() => setSelectedTab('requests')}
        >
          <Text style={styles.tabText}>Connection Requests</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={selectedTab === 'sellers' ? styles.tabActive : styles.tabInactive}
          onPress={() => setSelectedTab('sellers')}
        >
          <Text style={styles.tabText}>Connected Sellers</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="darkorange" style={styles.activityIndicator} />
      ) : (
        <FlatList
          data={filteredData.filter(item => item.sender.name.toLowerCase().includes(searchText.toLowerCase()))}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 30,
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'darkorange',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  searchIcon: {
    padding: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  tabActive: {
    backgroundColor: '#d3d3d3',
    borderRadius: 20,
    padding: 5,
  },
  tabInactive: {
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    padding: 5,
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
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
  iconContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    backgroundColor: 'darkorange',
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  buttonText: {
    color: '#fff',
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FriendList;
