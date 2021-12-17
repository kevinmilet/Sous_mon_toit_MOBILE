import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { getAllEstates } from '../../API/ApiEstates';
import EstateCard from './EstateCard';
import Topbar from '../Topbar/Topbar';
import colors from '../../utils/styles/colors';
        
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
    }, [])

    return (

        <View style={styles.main_container}>
            <Topbar />
            <FlatList
                data={estates}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <EstateCard estate={item} />} />
        </View>
    );
}

const styles = StyleSheet.create({

    main_container: {
        backgroundColor: colors.primary,
        flex: 1
    },

    buttonCustom: {

        marginLeft: 5,
        height: 500
    }
})
export default EstateList