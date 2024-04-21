import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MessagesScreen from '../components/MessageScreen';

const MessagesAndNotificationsScreen = () => {
  const [selectedTab, setSelectedTab] = useState('messages');

  const renderTab = (tabName) => {
    const isSelected = selectedTab === tabName;
    return (
      <TouchableOpacity
        style={[styles.tab, isSelected && styles.selectedTab]}
        onPress={() => setSelectedTab(tabName)}>
        <Text style={[styles.tabText, isSelected && styles.selectedTabText]}>
          {tabName.charAt(0).toUpperCase() + tabName.slice(1)}
        </Text>
      </TouchableOpacity>
    );
  };

  // Dummy messages data
  const dummyMessages = [
    { sender: 'Seller', text: 'Hello, how can I assist you with the iPhone 14 Pro?' },
    { sender: 'Customer', text: 'Hi, I\'m interested in purchasing the iPhone 14 Pro. Can you provide more details?' },
    { sender: 'Seller', text: 'Sure! The iPhone 14 Pro comes with a triple-camera system, A15 Bionic chip, and 5G support. It is available in three storage options: 128GB, 256GB, and 512GB.' },
    { sender: 'Customer', text: 'Great! Do you have the 256GB variant in stock?' },
    { sender: 'Seller', text: 'Yes, we have the 256GB variant available in Space Gray, Silver, and Gold colors.' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {renderTab('messages')}
        {renderTab('notifications')}
      </View>
      <View style={styles.contentContainer}>
        {/* Render content based on selected tab */}
        {selectedTab === 'messages' ? (
          <MessagesScreen messages={dummyMessages} />
        ) : (
          <Text>Notifications content goes here</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  selectedTab: {
    borderBottomColor: 'blue', 
  },
  tabText: {
    fontSize: 18,
    color: 'gray', 
  },
  selectedTabText: {
    color: 'black', 
  },
  contentContainer: {
    flex: 1,
  },
});

export default MessagesAndNotificationsScreen;
