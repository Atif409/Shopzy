import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Pressable, Alert } from 'react-native';
import CustomIcon from '../components/CustomIcon';
import { useRoute } from '@react-navigation/native';
import { API_URL } from '@env';
const CartScreen = () => {
  const route = useRoute();
  const [cartItems, setCartItems] = useState([]);
  const [itemQuantities, setItemQuantities] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (route.params?.product) {
      addItemToCart(route.params.product);
    }
  }, [route.params?.product]);

  const addItemToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
    setItemQuantities((prevQuantities) => ({
      ...prevQuantities,
      [product._id]: (prevQuantities[product._id] || 0) + 1,
    }));
  };

  const handleIncrease = (itemId) => {
    setItemQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: (prevQuantities[itemId] || 0) + 1,
    }));
  };

  const handleDecrease = (itemId) => {
    setItemQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: Math.max(0, prevQuantities[itemId] - 1),
    }));
  };

  useEffect(() => {
    const newTotalPrice = cartItems.reduce((total, item) => {
      const quantity = itemQuantities[item._id] || 0;
      return total + quantity * item.price;
    }, 0);
    setTotalPrice(newTotalPrice);
  }, [itemQuantities]);

  const renderItem = ({ item }) => (
    <View style={styles.cartContainer}>
      <View style={styles.main}>
        <Image source={{ uri: `${API_URL}${item.images[0]}` }} style={styles.itemImage} />
        <View style={styles.detail}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>{item.price} PKR</Text>
        </View>
        <View style={styles.btns}>
          <Pressable style={styles.button} onPress={() => handleIncrease(item._id)}>
            <Text style={styles.buttonText}>+</Text>
          </Pressable>
          <Text style={styles.quantity}>{itemQuantities[item._id] || 0}</Text>
          <Pressable style={styles.button} onPress={() => handleDecrease(item._id)}>
            <Text style={styles.buttonText}>-</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Cart</Text>
      <View style={styles.scrollView}>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
        />
      </View>
      <Text style={styles.totalPrice}>
        Subtotal: {totalPrice} PKR
      </Text>
      <Pressable style={styles.btn} onPress={() => Alert.alert('Check Out pressed')}>
        <View style={styles.btnContent}>
          <CustomIcon name="exit-to-app" style={styles.icon} size={20} />
          <Text style={styles.btnText}>Check Out</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    marginTop: 20,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  scrollView: {
    backgroundColor: '#E5E4E2',
    width: '100%',
    height: '80%',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    marginTop: 10,
  },
  itemImage: {
    width: 50,
    height: 70,
  },
  cartContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 15,
  },
  main: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    marginTop: 1,
    marginBottom: 2,
    height: 100,
    width: '90%',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 20,
    justifyContent: 'space-around',
  },
  name: {
    fontSize: 17,
  },
  price: {
    fontSize: 17,
    color: '#483d8b',
    fontWeight: 'bold',
  },
  btns: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#ffd4e5',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '900',
  },
  quantity: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 8,
  },
  icon: {
    color: 'gray',
    marginRight: 4,
  },
  btn: {
    marginTop: 8,
    height: 50,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'gray',
  },
  btnContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 25,
    fontWeight: '900',
    color: 'gray',
  },
});

export default CartScreen;
