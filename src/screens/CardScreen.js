// CardScreen.js

import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const CardScreen = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');

  const handlePayment = () => {
    // Perform payment processing logic here
    console.log(`Card Number: ${cardNumber}`);
    console.log(`Expiry Date: ${expiryDate}`);
    console.log(`CVV: ${cvv}`);

    setCardNumber('');
    setExpiryDate('');
    setCVV('');
  };

  return (
    <View style={styles.container}>
        <Text style ={styles.title}>Please add your card</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter card number"
          value={cardNumber}
          onChangeText={(text) => setCardNumber(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="MM/YYYY"
          value={expiryDate}
          onChangeText={(text) => setExpiryDate(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter CVV"
          value={cvv}
          onChangeText={(text) => setCVV(text)}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payButtonText}>Add Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    width: '100%',
  },
  title:{
marginBottom:20,
fontSize:18,
fontWeight:'bold',
color: 'grey',
  },
  inputContainer: {
    marginBottom: 15,
    width:'85%'
  },
  input: {
    borderLeftWidth:0,
    borderRightWidth:0,
    borderTopWidth:0,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#FF7F00',
    paddingLeft: 10,
    color: 'grey',
  },
  payButton: {
    backgroundColor: '#FF7F00',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width:250,
    marginTop:20
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CardScreen;
