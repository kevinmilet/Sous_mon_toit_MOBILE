import { API_URL } from '@env';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { getAllEstates } from '../../API/ApiEstates';
import EstateCard from './EstateCard';
        
const EstateList = () => {

    const [estates, setEstates] = useState([]);

    useEffect(() => {

        getAllEstates().then(
            response => {
                setEstates(response.data)
            }).catch(error => {
                console.log(error.message)
            }
        )
    
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