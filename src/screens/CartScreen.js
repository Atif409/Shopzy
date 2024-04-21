import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Pressable } from 'react-native';
import CustomIcon from '../components/CustomIcon';
import { FontAwesome } from '@expo/vector-icons';
const CartScreen = () => {
  const [itemQuantities, setItemQuantities] = useState({});
  const [totalPrice, setTotalPrice] = useState(0); // Initialize total price state

  const handleIncrease = (itemId) => {
    setItemQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: (prevQuantities[itemId] || 0) + 1,
    }));
  };

  const handleDecrease = (itemId) => {
    setItemQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: Math.max(0, prevQuantities[itemId] - 1), // Ensure quantity is at least 0
    }));
  };
  
  const data = [
    {
      id: '1',
      name: 'Iphone 15 Plus',
      price: 350000,
      image: require('../../assets/deals/iphone.png'),
    },
    {
      id: '2',
      name: 'OnePlus',
      price: 350000,
      image: require('../../assets/deals/oneplus.png'),
    },
    {
      id: '3',
      name: 'Realme',
      price: 350000,
      image: require('../../assets/deals/realme.png'),
    },
    {
      id: '4',
      name: 'Redmi',
      price: 350000,
      image: require('../../assets/deals/redmi.png'),
    },
    {
      id: '5',
      name: 'Samsung',
      price: 340000,
      image: require('../../assets/deals/sam.png'),
    },
  ];

  useEffect(() => {
    // Calculate the total price when itemQuantities changes
    const newTotalPrice = data.reduce((total, item) => {
      const quantity = itemQuantities[item.id] || 0;
      return total + quantity * item.price;
    }, 0);

    // Update the total price state
    setTotalPrice(newTotalPrice);
  }, [itemQuantities]);

  const renderItem = ({ item }) => (
    <View style={styles.cartContainer}>
      <View style={styles.main}>
        <Image source={item.image} style={styles.itemImage} />

        <View style={styles.detail}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>{item.price} PKR</Text>
        </View>

        <View style={styles.btns}>
          <Pressable style={styles.button} onPress={() => handleIncrease(item.id)}>
            <Text style={styles.buttonText}>+</Text>
          </Pressable>

          <Text style={styles.quantity}>{itemQuantities[item.id] || 0}</Text>

          <Pressable style={styles.button} onPress={() => handleDecrease(item.id)}>
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
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
      <Text style={styles.totalPrice}>
        Subtotal: {totalPrice} PKR
      </Text>
      <Pressable style={styles.btn} onPress={() => {
          console.log("Check Out pressed")
        }}
        >
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
    borderTopRightRadius:40,
    borderTopLeftRadius:40,
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
    marginBottom:2,
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
    marginRight:4

  },
  btn: {
    marginTop: 8,
    height:50,
    borderWidth:1,
    borderRadius:20,
  borderColor:'gray'
  },
  btnContent: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    justifyContent:'center'
  },
  btnText:{
    fontSize:25,
    fontWeight:'900',
    color: 'gray',
  }
});
export default CartScreen;
