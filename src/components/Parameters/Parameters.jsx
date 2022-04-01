import React, {useContext} from 'react';
import {View, Alert, StyleSheet, Text, TouchableOpacity} from "react-native";
import colors from "../../utils/styles/colors";
import LogContext from "../../API/Context/LogContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {logout} from "../../API/ApiStaff";
import Topbar from "../Topbar/Topbar";

const Parameters = () => {
    const {setTokenIsValid} = useContext(LogContext);

    const signOut = () => {
        logout().then(
            response => {
                console.log(response.status)
                AsyncStorage.removeItem("@auth_token");
                AsyncStorage.removeItem("@auth_userId");
            }).catch(error => {
            console.log(error.message)
            }).finally( () =>
                confirmAlert()
            )
    }

    const signOutAlert = () => {
        Alert.alert(
            'Déconnexion',
            'Voulez-vous vraiment vous déconnecter?',
            [
                {
                    text: "Non",
                    onPress: () => console.log("Signout cancel"),
                    style: "cancel"
                },
                {
                    text: "Oui",
                    onPress: () => signOut(),
                }
            ]
        );
    }

    const confirmAlert = () => {
        Alert.alert(
            '',
            'Vous avez été déconnecté',
            [
                {
                    text: "Ok",
                    onPress: () => setTokenIsValid(false)
                }
            ]
        );
    }

    return (
        <>
            <View>
                <Topbar />
            </View>
            <View style={styles.main_container}>
                <TouchableOpacity style={styles.button} onPress={() => signOutAlert()}>
                    <Text style={styles.btnText}>Se déconnecter</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: colors.backgroundSecondary,
        marginHorizontal: 10,
        marginVertical: 20,
    },
    button: {
        padding: 10,
        borderRadius: 25,
        backgroundColor: colors.secondaryBtn,
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 10,
        height: 55,
        width: 245,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    btnText: {
        color: colors.backgroundPrimary,
        textAlign: 'center',
        fontSize: 18,
    }
})

export default Parameters;
