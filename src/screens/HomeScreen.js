import React from 'react'
import { StyleSheet,SafeAreaView,Text,View, Platform } from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
const HomeScreen = () => {
    const {container} = styles
  return (
    <>
    <SafeAreaView style={container}>
      <Text style={styles.loadingText}>Under Development...</Text>
    </SafeAreaView>
  </>
  )
}

export default HomeScreen
const styles = StyleSheet.create({
    container:{
        paddingTop: Platform.OS === 'android' ? 40 :0,
        flex:1,
        backgroundColor: "white"
    },
    loadingText: {
      textAlign: 'center',
      marginTop: 20,
      fontSize: 18,
      fontWeight: 'bold',
      color: 'gray',
    },
  });