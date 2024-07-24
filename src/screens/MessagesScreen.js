import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import moment from 'moment';

const dummyMessages = {
  1: [
    { text: 'Hello!', sender: 'User 1', timestamp: new Date().toISOString() },
    { text: 'Hi there!', sender: 'Customer', timestamp: new Date().toISOString() },
  ],
  2: [
    { text: 'Good morning!', sender: 'User 2', timestamp: new Date().toISOString() },
    { text: 'Morning!', sender: 'Customer', timestamp: new Date().toISOString() },
  ],
  3: [
    { text: 'How are you?', sender: 'User 3', timestamp: new Date().toISOString() },
    { text: 'I am good, thanks!', sender: 'Customer', timestamp: new Date().toISOString() },
  ],
  4: [
    { text: 'Hey!', sender: 'User 4', timestamp: new Date().toISOString() },
    { text: 'Hello!', sender: 'Customer', timestamp: new Date().toISOString() },
  ],
  5: [
    { text: 'Are you available?', sender: 'User 5', timestamp: new Date().toISOString() },
    { text: 'Yes, I am here.', sender: 'Customer', timestamp: new Date().toISOString() },
  ],
  6: [
    { text: 'Hi!', sender: 'User 6', timestamp: new Date().toISOString() },
    { text: 'Hey there!', sender: 'Customer', timestamp: new Date().toISOString() },
  ],
};

const MessagesScreen = ({ route }) => {
  const { conversation } = route.params;
  const [newMessage, setNewMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (conversation) {
      setMessages(dummyMessages[conversation.id] || []);
    }
  }, [conversation]);

  const handleSend = () => {
    if (newMessage.trim() || selectedImage) {
      const message = {
        text: newMessage,
        image: selectedImage,
        sender: 'Customer',
        timestamp: new Date().toISOString(),
      };
      setMessages((prevMessages) => [...prevMessages, message]);
      setNewMessage('');
      setSelectedImage(null);
    }
  };

  const handleCameraPress = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage({ uri: result.uri });
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.messageContainer, item.sender === 'Customer' ? styles.senderMessage : styles.receiverMessage]}>
      <Text style={styles.sender}>{item.sender}</Text>
      {item.text ? <Text style={styles.message}>{item.text}</Text> : null}
      {item.image ? <Image source={{ uri: item.image.uri }} style={styles.image} /> : null}
      <Text style={styles.timestamp}>{moment(item.timestamp).format('LT')}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{conversation.user.name}</Text>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderMessage}
        contentContainerStyle={styles.messagesList}
      />
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={handleCameraPress}>
          <Ionicons name="camera" size={28} color="black" />
        </TouchableOpacity>
        <TextInput
          style={[styles.input, newMessage.length > 50 && { height: 80 }]}
          placeholder="Type your message..."
          value={newMessage}
          onChangeText={setNewMessage}
          multiline
        />
        <TouchableOpacity onPress={handleSend}>
          <Ionicons name="send" size={28} color="darkorange" />
        </TouchableOpacity>
      </View>
      {selectedImage && (
        <View style={styles.previewContainer}>
          <Image source={{ uri: selectedImage.uri }} style={styles.previewImage} />
          <TouchableOpacity
            style={styles.removeImageButton}
            onPress={() => setSelectedImage(null)}
          >
            <Ionicons name="close-circle" size={28} color="red" />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    height: 50,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop:10
  },
  messagesList: {
    paddingHorizontal: 10,
  },
  messageContainer: {
    marginBottom: 5,
    borderRadius: 8,
    padding: 10,
    marginTop: 15,
    maxWidth: '75%',
  },
  senderMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  receiverMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#EAEAEA',
  },
  sender: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  message: {
    marginTop: 5,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 5,
  },
  timestamp: {
    marginTop: 5,
    fontSize: 12,
    color: 'gray',
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  previewContainer: {
    position: 'absolute',
    bottom: 100,
    left: 10,
    right: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  removeImageButton: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
});

export default MessagesScreen;
