import React from 'react';
import { SafeAreaView, StyleSheet, Text, View,ActivityIndicator} from 'react-native';
// import { Button, StyleSheet, TextInput, View, FlatList, Text, ActivityIndicator } from 'react-native';
// import loader from '../../../assets/icons/loader.svg';

const Loader = () => {
    return (
        <View style={styles.loading_container}>
             <ActivityIndicator size='large' color='red'/>
        </View>
    );
};
const styles =  StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginTop: 50
    },
    textinput: {
        marginLeft: 5, 
        marginRight: 5, 
        height: 50, 
        borderColor: '#000000', 
        borderWidth: 1, 
        paddingLeft: 5
    },
    loading_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})


export default Loader;
