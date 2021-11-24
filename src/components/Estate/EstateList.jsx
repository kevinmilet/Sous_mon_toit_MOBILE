import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList } from 'react-native';
import EstateCard from './EstateCard';

const API_TOKEN = '64800ba865274be62e64c072867ec661';

const getEstateFromApi = (text) => {

};

const EstateList = () => {

    const [estates, setEstate] = useState([]);
    const loadEstates = () => {
        getEstateFromApi(searchedText).then(data => {
            setEstate(data.results);
        });
    };

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