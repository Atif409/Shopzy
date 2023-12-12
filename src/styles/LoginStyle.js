import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "White",
        alignItems: "center"
    },
    subContainer: {
        alignItems: 'center'
    },
    logo:{
        width:150,
        height:150
    },
    tagline: {
        fontSize: 18, fontWeight: 'bold', marginTop: 12, color: '#041E42'
    },
    mainLoginBox: {
        marginTop: 70,
    },
    loginBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        backgroundColor: "#D0D0D0",
        paddingVertical: 5,
        borderRadius: 5,
        marginTop: 20
    },
    inputs: {
        color: 'grey',
        marginVertical: 5,
        width: 280
    },
    icon: {
        marginLeft: 8
    },
    touchable: {
        marginTop: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between'
    },
    btnLogin: {
        width: 200,
        backgroundColor: '#FEBE10',
        borderRadius: 6,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 13
    },
    btnText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    noAccout:{
        textAlign:'center',
        color:'gray',
        fontSize:16,
        color:'grey',
    }
});