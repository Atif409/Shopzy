import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState(0); // 0 for EasyPaisa, 1 for JazzCash, 2 for Card
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');

  const paymentMethods = [
    { label: 'EasyPaisa', value: 0 },
    { label: 'JazzCash', value: 1 },
    { label: 'Card', value: 2 },
  ];

  const handlePayment = () => {
    // Perform payment processing logic here
    console.log(`Payment Method: ${paymentMethods[paymentMethod].label}`);
    console.log(`Account Number: ${accountNumber}`);
    console.log(`Card Number: ${cardNumber}`);
    console.log(`Expiry Date: ${expiryDate}`);
    console.log(`CVV: ${cvv}`);
    console.log(`Amount: ${amount}`);
    // Additional logic for processing the payment

    // Clear the text inputs after payment
    setAccountNumber('');
    setAmount('');
    setCardNumber('');
    setExpiryDate('');
    setCVV('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Details</Text>

      <RadioForm
        radio_props={paymentMethods}
        initial={0}
        formHorizontal={true} // Set to true to display in one line
        labelHorizontal={true}
        buttonColor={'#3498db'}
        selectedButtonColor={'#2980b9'}
        onPress={(value) => setPaymentMethod(value)}
        style={styles.radioForm}
        labelStyle={{ fontWeight: 'bold', marginRight: 10 }} // Make labels bold and add margin to the right
      />

      {paymentMethod !== 2 ? (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={`Enter ${paymentMethods[paymentMethod].label} account number`}
            value={accountNumber}
            onChangeText={(text) => setAccountNumber(text)}
          />
        </View>
      ) : (
        <>
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
        </>
      )}

      <View style={styles.inputContainer}>
        
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          value={amount}
          onChangeText={(text) => setAmount(text)}
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payButtonText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ecf0f1',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#3498db',
  },
  radioForm: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#2c3e50',
    fontWeight: 'bold', 
  },
  input: {
    borderLeftWidth:0,
    borderRightWidth:0,
    borderTopWidth:0,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#3498db',
    paddingLeft: 10,
    color: '#2c3e50',
  },
  payButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PaymentScreen;


