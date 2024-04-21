// MessagesScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MessagesScreen = ({ messages }) => {
  return (
    <View style={styles.container}>
      {messages.map((message, index) => (
        <View key={index} style={[styles.messageContainer, message.sender === 'Seller' && styles.senderMessage]}>
          <Text style={styles.sender}>{message.sender}</Text>
          <Text style={styles.message}>{message.text}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageContainer: {
    marginBottom: 10,
    maxWidth: '80%', // Limit the width of message containers
  },
  senderMessage: {
    alignSelf: 'flex-start', // Align sender messages to the left
    backgroundColor: '#DCF8C6', // Background color for sender messages
  },
  sender: {
    fontWeight: 'bold',
  },
  message: {
    marginLeft: 10, // Add margin for better readability
  },
});

export default MessagesScreen;
