import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ToolsScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.toolsText}>Tools</Text>
      </View>
      <View>
        <Text style={styles.basicFunctionText}>Basic Functions</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.iconContainer}>
          <Pressable style={styles.button} onPress={() => { navigation.navigate("AddProduct") }}>
            <MaterialIcons name="add" size={30} color="darkorange" />
          </Pressable>
          <Text style={styles.iconText}>Add</Text>
          <Text style={styles.iconText}>Product</Text>
        </View>
        <View style={styles.iconContainer}>
          <Pressable style={styles.button} onPress={() => { navigation.navigate("DisplayProducts") }}>
            <MaterialIcons name="shopping-cart" size={30} color="darkorange" />
          </Pressable>
          <Text style={styles.iconText}>Products</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 20,
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 1,
  },
  toolsText: {
    fontSize: 30,
    left: 15,
    top: 10,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'darkorange',
  },
  basicFunctionText: {
    fontSize: 25,
    top: 20,
    left: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 20,
    marginHorizontal: 10,
  },
  iconContainer: {
    alignItems: 'center',
    marginHorizontal: 18, 
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#FFE4B5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    marginTop: 5,
    color: 'black',
    fontWeight: '900',
    textAlign: 'center',
  },
  emptySpace: {
    width: 60,
    height: 60,
  },
  promotionContainer: {
    left: 15,
    top: 30,
  },
  promotionText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default ToolsScreen;
