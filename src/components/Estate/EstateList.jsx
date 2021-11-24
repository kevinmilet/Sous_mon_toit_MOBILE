import React, { useState , useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList } from 'react-native';
import EstateCard from './EstateCard';
import axios from 'axios';
import ApiRoutes from "../../utils/const/ApiRoutes";

const EstateList = () => {

    const [estates, setEstates] = useState([]);
    const loadEstates = () => {
        getEstateFromApi(searchedText).then(data => {
            setEstate(data.results);
        });
    };

    const API_URL = 'http://api-sousmontoit.am.manusien-ecolelamanu.fr/public/';
    useEffect(() => {
        
        axios.get(API_URL + ApiRoutes.estates).then(res => {
            setEstates(res.data)
        }).catch(error => {
            console.log(error.message)
        })
    
    }, [API_URL])

    return (

        <View style={styles.main_container}>
            <FlatList
                data={estates}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <EstateCard estate={item} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({

    main_container: {

        marginTop: 40,
        flex: 1
    },

    buttonCustom: {

        marginLeft: 5,
        height: 500
    }
})
export default EstateList