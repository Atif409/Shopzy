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
    logo: {
        width: 150,
        height: 150
    },
    tagline: {
        fontSize: 18, fontWeight: 'bold', marginTop: 8, color: '#041E42'
    },
    mainLoginBox: {
        marginTop: 30,
    },
    loginBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        backgroundColor: "#D0D0D0",
        paddingVertical: 5,
        borderRadius: 5,
        marginTop: 14
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
        marginTop: 3,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between'
    },
    btnLogin: {
        width: 200,
        backgroundColor: '#FF7F00',
        borderRadius: 6,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 13
    },
    btnText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight:'900'
    },
    noAccout: {
        textAlign: 'center',
        color: 'gray',
        fontSize: 16,
        color: 'grey',
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        marginTop: 17,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: 'gray',
        marginHorizontal: 10,
    },
    buttonText: {
        fontSize: 14,
        color: 'gray',
    },
    socialButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 52,
        borderWidth: 0.5,
        borderColor: 'gray',
        marginRight: 4,
        borderRadius: 10,
        fontWeight: 500
    },
    socialIcon: {
        height: 36,
        width: 36,
        marginRight: 8,
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
cat:{
    height: 5,
    color: 'grey',
    marginVertical: 1,
    width: 280
}

});

