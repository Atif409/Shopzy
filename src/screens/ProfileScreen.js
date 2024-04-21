import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from "react-native";
import CustomIcon from '../components/CustomIcon';
import { FontAwesome } from '@expo/vector-icons';
const ProfileScreen = () => {

  return (<ScrollView style={
    styles.mainContainer
  } >
    <View style={styles.container}>
      <Text style={
        styles.title
      }>
       My Profile
      </Text>
      <View style={styles.profileView}>
        <View style={styles.innerProfile}>
          <Image
            source={require('../../assets/profile.jpg')}
            style={styles.profile}
          />
        </View>
      </View>
      <View style={
        styles.nameView
      }>
        <Text style={
          styles.name
        }>Muhammad Atif</Text>
        <View style={
          styles.activeView
        }>
          <Text style={styles.active}>●</Text>
          <Text style={
            styles.activeLine
          }>Active Now</Text>
        </View>
      </View>
      <View style={
        styles.options
      }>
        <Pressable style={styles.btn} onPress={() => {
          console.log("Edit pressed")
        }}
        >
          <View style={styles.btnContent}>
            <CustomIcon name="person" style={styles.icon} />
            <Text style={styles.btnText}>Edit Profile</Text>
            <CustomIcon name="keyboard-arrow-right" style={styles.icon} />
          </View>
        </Pressable>


        <Pressable style={styles.btn} onPress={() => {
          console.log("Shopping Address pressed")
        }}
        >
          <View style={styles.btnContent}>
            <CustomIcon name="location-on" style={styles.icon} />
            <Text style={styles.btnText}>Shopping Address</Text>
            <CustomIcon name="keyboard-arrow-right" style={styles.icon} />
          </View>
        </Pressable>

        <Pressable style={styles.btn} onPress={() => {
          console.log("Wishlist Pressed")
        }}
        >
          <View style={styles.btnContent}>
           <FontAwesome name="heart" size={21} color="gray" style={styles.icon}/>
            <Text style={styles.btnText}>Wishlist</Text>
            <CustomIcon name="keyboard-arrow-right" style={styles.icon} />
          </View>
        </Pressable>

        <Pressable style={styles.btn} onPress={() => {
          console.log("History Pressed")
        }}
        >
          <View style={styles.btnContent}>
            <CustomIcon name="history" style={styles.icon} />
            <Text style={styles.btnText}>Order History</Text>
            <CustomIcon name="keyboard-arrow-right" style={styles.icon} />
          </View>
        </Pressable>

        <Pressable style={styles.btn} onPress={() => {
          console.log("Notifications pressed")
        }}
        >
          <View style={styles.btnContent}>
            <CustomIcon name="notifications" style={styles.icon} />
            <Text style={styles.btnText}>Notifications</Text>
            <CustomIcon name="keyboard-arrow-right" style={styles.icon} />
          </View>
        </Pressable>

        <Pressable style={styles.btn} onPress={() => {
          console.log("Cards pressed")
        }}
        >
          <View style={styles.btnContent}>
            <CustomIcon name="credit-card" style={styles.icon} />
            <Text style={styles.btnText}>Cards</Text>
            <CustomIcon name="keyboard-arrow-right" style={styles.icon} />
          </View>
        </Pressable>
      </View>
    </View>

  </ScrollView>

  )
}
export default ProfileScreen;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#F5F5F5'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold'
  }
  ,
  profile: {
    width: 80,
    height: 80,
    borderRadius: 50,
    overflow: 'hidden',
  },
  profileView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    borderLeftWidth: 1.5,
    borderRightWidth: 1.5,
    marginTop: 30,
    borderColor: 'gray',

  },
  innerProfile: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#87CEEB',

  },
  nameView: {
    flex: 1,
    marginTop: 5

  },
  name: {
    fontWeight: 'bold',
    fontSize: 17
  },
  activeView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'

  },
  active: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'red'
  },
  activeLine: {
    marginLeft: 5,
    marginTop: 2,
    fontWeight: 'bold',
    fontSize: 13,

  },
  options: {
    flex: 1,
    width: 350,
    height: 450,
    marginTop: 20,
    borderTopLeftRadius: 37,
    borderTopRightRadius: 37,
    backgroundColor: '#E5E4E2',
  },
  icon: {
    marginLeft: 8,
  },
  btn: {
    marginTop: 20,
    height:40
  },
  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    justifyContent:'space-between'
  },
  btnText:{
    width:250,
    fontSize:15,
    fontWeight:'bold'
  }
});
