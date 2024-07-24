import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper';

const AddressScreen = () => {
  const [newAddress, setNewAddress] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod'); 
  const [addresses, setAddresses] = useState([
    '123 Main St, Springfield',
    '456 Elm St, Shelbyville',
  ]);

  const handlePayment = () => {
    if (!selectedAddress && !newAddress) {
      Alert.alert('Error', 'Please select or enter an address.');
      return;
    }

    const addressToUse = newAddress || selectedAddress;
    const paymentMethodText = paymentMethod === 'cod' ? 'Cash on Delivery' : 'Pay with Card';

    Alert.alert('Success', `Address: ${addressToUse}\nPayment Method: ${paymentMethodText}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Checkout</Text>

      <Text style={styles.label1}>Select Address</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedAddress}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedAddress(itemValue)}
        >
          <Picker.Item label="Select an address" value="" />
          {addresses.map((address, index) => (
            <Picker.Item key={index} label={address} value={address} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Or Add New Address</Text>
      <TextInput
        style={styles.input}
        value={newAddress}
        onChangeText={setNewAddress}
        placeholder="Enter new address"
      />

      <Text style={styles.label}>Payment Method</Text>
      <View style={styles.radioContainer}>
        <RadioButton
          value="cod"
          status={paymentMethod === 'cod' ? 'checked' : 'unchecked'}
          onPress={() => setPaymentMethod('cod')}
        />
        <Text style={styles.radioLabel}>Cash on Delivery</Text>
      </View>
      <View style={styles.radioContainer}>
        <RadioButton
          value="card"
          status={paymentMethod === 'card' ? 'checked' : 'unchecked'}
          onPress={() => setPaymentMethod('card')}
        />
        <Text style={styles.radioLabel}>Pay with Card</Text>
      </View>

      <Pressable style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>Proceed to Payment</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'darkorange',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  label1: {
    
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  pickerContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,

  },
  picker: {
    height: 40,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioLabel: {
    fontSize: 16,
  },
  button: {
    backgroundColor: 'darkorange',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddressScreen;
