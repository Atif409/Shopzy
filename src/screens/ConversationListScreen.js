import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import io from 'socket.io-client';
import { API_URL } from '@env';

const ConversationListScreen = ({ navigation }) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [socket, setSocket] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (!token) {
          setError('Please log in to chat');
          setLoading(false);
          return;
        }
    
        const response = await axios.get(`${API_URL}/messages/conversations`, {
          headers: { Authorization: `${token}` },
        });
    
        if (response.data.conversations.length === 0) {
          setConversations([]); 
          setError('Conversation list is empty');
          setLoading(false);
          return;
        }
    
        setConversations(response.data.conversations);
    
        const user = await AsyncStorage.getItem('userName');
        setUserId(user ? JSON.parse(user).id : null);
      } catch (err) {
        setError('Failed to load conversations');
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  useEffect(() => {
    const initializeSocket = async () => {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) return;

      const newSocket = io(`${API_URL}/messages/conversations`, {
        query: { token },
      });

      setSocket(newSocket);

      return () => newSocket.close();
    };

    initializeSocket();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on('new message', (message) => {
      setConversations((prevConversations) => {
        const counterpartId = message.sender.id === userId ? message.receiver.id : message.sender.id;
        const counterpartModel = message.sender.id === userId ? message.receiver.model : message.sender.model;
        const key = `${counterpartModel}:${counterpartId}`;

        const updatedConversations = [...prevConversations];
        const existingIndex = updatedConversations.findIndex(convo => convo.id === key);

        if (existingIndex !== -1) {
          updatedConversations[existingIndex].latestMessage = message;
        } else {
          updatedConversations.push({
            id: key,
            user: { id: counterpartId, model: counterpartModel, image: message.sender.id === userId ? message.receiver.image : message.sender.image },
            latestMessage: message,
          });
        }

        return updatedConversations;
      });
    });

    return () => socket.off('new message');
  }, [socket, userId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const renderConversation = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Messages', { conversation: item })}>
      <Image source={{ uri: item.user.image }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.user.name}</Text>
        <Text style={styles.message}>{item.latestMessage.text}</Text>
      </View>
      <Text style={styles.time}>{moment(item.latestMessage.time).format('LT')}</Text>
    </TouchableOpacity>
  );

  if (conversations.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Messages</Text>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No conversations yet.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Messages</Text>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderConversation}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    color: '#888',
  },
  time: {
    color: '#888',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
  },
});

export default ConversationListScreen;
